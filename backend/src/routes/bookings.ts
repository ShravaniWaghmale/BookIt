import express from 'express';
import Booking from '../models/Booking';
import Experience from '../models/Experience';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const { name, email, experienceId, slot, promoCode, finalPrice } = req.body;

  if (!name || !email || !experienceId || !slot)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    const slotIndex = experience.slots.findIndex(
      (s: any) => s.date === slot.date && s.time === slot.time
    );

    if (slotIndex === -1 || !experience.slots[slotIndex].available)
      return res.status(400).json({ message: 'Slot unavailable' });

    experience.slots[slotIndex].available = false;
    await experience.save();

    const booking = new Booking({ name, email, experienceId, slot, promoCode, finalPrice });
    await booking.save();

    res.json({ success: true, bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err });
  }
});

// 🧩 Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err });
  }
});

// 🧩 Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking', error: err });
  }
});

export default router;
