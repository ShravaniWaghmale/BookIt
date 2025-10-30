import { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';

interface Booking {
  _id: string;
  name: string;
  email: string;
  experienceId: string;
  slot: { date: string; time: string };
  finalPrice: number;
  status: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings')
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading your bookings...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-white to-turquoise/20 py-12 px-6 md:px-16">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-turquoise to-orange">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet. Go explore experiences!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-xl p-6 border border-turquoise/20 hover:shadow-turquoise/30 transition"
            >
              <h2 className="text-xl font-semibold text-turquoise mb-2">
                Booking ID: {booking._id.slice(-6)}
              </h2>
              <p className="text-gray-700"><strong>Name:</strong> {booking.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {booking.email}</p>
              <p className="text-gray-700">
                <strong>Date:</strong> {booking.slot.date} at {booking.slot.time}
              </p>
              <p className="text-gray-700"><strong>Price:</strong> ₹{booking.finalPrice}</p>
              <p
                className={`mt-2 font-semibold ${
                  booking.status === 'cancelled' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => cancelBooking(booking._id)}
                className="w-full mt-4 bg-gradient-to-r from-orange to-turquoise text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                Cancel Booking
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
