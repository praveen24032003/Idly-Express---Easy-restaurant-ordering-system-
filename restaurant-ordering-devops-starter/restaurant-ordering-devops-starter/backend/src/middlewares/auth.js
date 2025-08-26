import jwt from 'jsonwebtoken';
export const auth = (roles=[]) => (req,res,next)=>{
  try{
    const hdr = req.headers.authorization || '';
    const token = hdr.startsWith('Bearer ')? hdr.slice(7): null;
    if(!token) return res.status(401).json({error:'Unauthorized'});
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(roles.length && !roles.includes(payload.role)) return res.status(403).json({error:'Forbidden'});
    req.user = payload; next();
  }catch(e){ return res.status(401).json({error:'Unauthorized'}); }
};
