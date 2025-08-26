import { Router } from 'express';
import { Category, MenuItem } from '../models/index.js';
import { auth } from '../middlewares/auth.js';
const router = Router();
router.get('/categories', async (req,res)=>{
  const cats = await Category.findAll({ order: [['display_order','ASC']] });
  res.json(cats);
});
router.get('/items', async (req,res)=>{
  const items = await MenuItem.findAll({ include: Category });
  res.json(items);
});
router.post('/admin/category', auth(['ADMIN']), async (req,res)=>{
  const cat = await Category.create(req.body); res.json(cat);
});
router.post('/admin/item', auth(['ADMIN']), async (req,res)=>{
  const item = await MenuItem.create(req.body); res.json(item);
});
export default router;
