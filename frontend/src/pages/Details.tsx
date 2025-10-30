import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location?: string;
  slots?: { date: string; time: string; available: boolean }[];
}

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await API.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (error) {
        console.error('Error fetching experience details', error);
      }
    };
    fetchExperience();
  }, [id]);

  if (!experience)
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-2xl bg-gradient-to-b from-orange-100 via-white to-turquoise-100">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-turquoise-100 text-gray-800 py-12 px-6 md:px-16 flex flex-col items-center">
      <motion.div
        className="max-w-5xl w-full bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-turquoise/30"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={experience.image}
          alt={experience.title}
          className="w-full h-96 object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-orange">
            {experience.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">{experience.description}</p>

          <div className="flex justify-between items-center mt-6">
            {experience.location && (
              <div>
                <h2 className="text-xl font-semibold text-orange">Location:</h2>
                <p className="text-gray-700">{experience.location}</p>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-orange">Price:</h2>
              <p className="text-2xl font-bold text-turquoise">₹{experience.price}</p>
            </div>
          </div>

          {/* 🌟 Slot Selection */}
          {experience.slots && experience.slots.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-orange mb-3">Select a Slot:</h2>
              <select
                className="w-full border border-turquoise/40 rounded-lg p-3 focus:ring-2 focus:ring-turquoise outline-none"
                onChange={(e) => {
                  const [date, time] = e.target.value.split('|');
                  setSelectedSlot({ date, time });
                }}
              >
                <option value="">-- Choose a Slot --</option>
                {experience.slots
                  .filter((s) => s.available)
                  .map((slot, index) => (
                    <option key={index} value={`${slot.date}|${slot.time}`}>
                      {slot.date} - {slot.time}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* 🌴 Book Now Button */}
          <motion.button
            onClick={() => {
              if (!selectedSlot) {
                alert('Please select a slot before booking.');
                return;
              }
              navigate(`/checkout/${experience._id}`, {
                state: { slot: selectedSlot },
              });
            }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 25px rgba(0, 200, 180, 0.5)',
              background:
                'linear-gradient(to right, rgba(0, 180, 180, 1), rgba(255, 140, 0, 1))',
            }}
            whileTap={{ scale: 0.96 }}
            className="w-full mt-10 bg-gradient-to-r from-turquoise to-orange text-white py-3 rounded-lg font-semibold text-lg tracking-wide shadow-lg transition-all duration-300"
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
