import { Router } from 'express';
import Razorpay from 'razorpay'; import crypto from 'crypto';
import { Payment, Order } from '../models/index.js';
const router = Router();
const razor = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
router.post('/razorpay/create-order', async (req,res)=>{
  const { orderId } = req.body; const order = await Order.findByPk(orderId);
  if(!order) return res.status(404).json({ error:'Order not found' });
  const amountPaise = Math.round(Number(order.total) * 100);
  const rzpOrder = await razor.orders.create({ amount: amountPaise, currency: 'INR', receipt: `ord_${order.id}` });
  await Payment.create({ order_id: order.id, provider_order_id: rzpOrder.id, amount: amountPaise, status:'CREATED' });
  res.json({ orderId: order.id, rzpOrder });
});
router.post('/razorpay/webhook', async (req,res)=>{
  const signature = req.headers['x-razorpay-signature']; const body = JSON.stringify(req.body || {});
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET).update(body).digest('hex');
  if(signature != expected) return res.status(400).json({ error:'Invalid signature' });
  try {
    const event = req.body.event; const payload = req.body.payload || {};
    if(event === 'payment.captured'){
      const paymentId = payload.payment.entity.id; const providerOrderId = payload.payment.entity.order_id;
      const p = await Payment.findOne({ where: { provider_order_id: providerOrderId } });
      if(p){ p.provider_payment_id = paymentId; p.status = 'CAPTURED'; await p.save(); }
    }
    res.json({ ok:true });
  } catch(e){ console.error(e); res.status(500).json({ error:'Webhook processing error' }); }
});
export default router;
