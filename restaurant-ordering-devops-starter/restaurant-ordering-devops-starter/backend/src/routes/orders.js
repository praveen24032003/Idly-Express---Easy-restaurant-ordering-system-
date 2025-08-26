import { Router } from 'express';
import { Order, OrderItem, MenuItem } from '../models/index.js';
import { auth } from '../middlewares/auth.js';
import { emitOrderUpdate } from '../server.js';
const router = Router();
router.post('/', async (req,res)=>{
  const { items=[], notes='' } = req.body;
  if(!items.length) return res.status(400).json({ error:'Cart is empty' });
  const dbItems = await MenuItem.findAll({ where: { id: items.map(i=>i.menu_item_id) } });
  const map = Object.fromEntries(dbItems.map(i=>[i.id,i]));
  let subtotal = 0;
  for(const it of items){
    const m = map[it.menu_item_id];
    if(!m || !m.is_available) return res.status(400).json({ error:'Item unavailable' });
    subtotal += Number(m.price) * it.qty;
  }
  const tax = +(subtotal * 0.05).toFixed(2); const discount = 0; const total = +(subtotal + tax - discount).toFixed(2);
  const order = await Order.create({ subtotal, tax, discount, total, notes });
  for(const it of items){
    const m = map[it.menu_item_id];
    await OrderItem.create({ order_id: order.id, menu_item_id: m.id, qty: it.qty, unit_price: m.price, line_total: (Number(m.price)*it.qty).toFixed(2) });
  }
  emitOrderUpdate(order.id, { orderId: order.id, status: order.status, total });
  res.json({ orderId: order.id, total });
});
router.get('/:id', async (req,res)=>{
  const ord = await Order.findByPk(req.params.id, { include: [OrderItem] });
  res.json(ord);
});
router.patch('/:id/status', auth(['ADMIN','KITCHEN']), async (req,res)=>{
  const { status } = req.body;
  const ord = await Order.findByPk(req.params.id);
  if(!ord) return res.status(404).json({ error:'Not found' });
  ord.status = status; await ord.save();
  emitOrderUpdate(ord.id, { orderId: ord.id, status });
  res.json({ ok:true });
});
export default router;
