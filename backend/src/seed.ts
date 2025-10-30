import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await Experience.deleteMany();

  await Experience.insertMany([
    {
      title: 'Scuba Diving in Goa',
      description: 'Experience the underwater world in the Arabian Sea.',
      image: 'https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg',
      price: 2500,
      slots: [
        { date: '2025-11-01', time: '10:00 AM', available: true },
        { date: '2025-11-02', time: '2:00 PM', available: true }
      ]
    },
    {
      title: 'Mountain Trek in Manali',
      description: 'A thrilling adventure through Himalayan trails.',
      image: 'https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg',
      price: 4000,
      slots: [
        { date: '2025-11-03', time: '6:00 AM', available: true },
        { date: '2025-11-04', time: '6:00 AM', available: true }
      ]
    }
  ]);

  console.log('✅ Seed data added');
  process.exit();
};

seed();
