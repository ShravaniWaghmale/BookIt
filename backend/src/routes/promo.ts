import express from 'express';
import { validatePromo } from '../utils/promoCodes';

const router = express.Router();

router.post('/validate', (req, res) => {
  const { code } = req.body;
  const result = validatePromo(code);
  if (!result) return res.status(400).json({ valid: false });
  res.json(result);
});

export default router;
