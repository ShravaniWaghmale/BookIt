import express from 'express';
import Experience from '../models/Experience';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Not found' });
    res.json(exp);
  } catch {
    res.status(500).json({ message: 'Error fetching experience' });
  }
});

export default router;
