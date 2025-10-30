import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: String,
  time: String,
  available: Boolean
});

const experienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  slots: [slotSchema]
});

export default mongoose.model('Experience', experienceSchema);
