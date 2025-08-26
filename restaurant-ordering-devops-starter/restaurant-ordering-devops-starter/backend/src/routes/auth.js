import { Router } from 'express';
import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import { User } from '../models/index.js';
const router = Router();
router.post('/register', async (req,res)=>{
  const { name, email, phone, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, password_hash: hash });
  res.json({ id:user.id, email:user.email });
});
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if(!user) return res.status(400).json({ error:'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if(!ok) return res.status(400).json({ error:'Invalid credentials' });
  const token = jwt.sign({ sub:user.id, role:user.role, name:user.name }, process.env.JWT_SECRET, { expiresIn:'15m' });
  res.json({ token, role:user.role, name:user.name });
});
export default router;
