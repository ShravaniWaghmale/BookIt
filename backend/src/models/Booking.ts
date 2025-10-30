import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  experienceId: String,
  slot: {
    date: String,
    time: String
  },
  promoCode: String,
  finalPrice: Number,
  status: { type: String, default: 'confirmed' }
});

export default mongoose.model('Booking', bookingSchema);
