import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './models/index.js';
import { syncDb } from './models/index.js';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());

app.get('/api/health', (req,res)=> res.json({ ok: true, ts: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CORS_ORIGIN } });

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('joinOrderRoom', (orderId) => socket.join(`order:${orderId}`));
  socket.on('joinKitchen', () => socket.join('kitchen'));
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

export const emitOrderUpdate = (orderId, payload) => {
  io.to(`order:${orderId}`).emit('orderStatus', payload);
  io.to('kitchen').emit('kitchenOrderUpdate', payload);
};

const PORT = process.env.PORT || 8080;
syncDb().then(() => {
  server.listen(PORT, () => console.log(`API listening on ${PORT}`));
});
