import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/api';

interface Experience {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/experiences')
      .then((res) => setExperiences(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-700 animate-pulse">
        Loading amazing experiences...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky via-sand to-turquoise">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-8 
                    text-teal-700 drop-shadow-lg"
        >
          Explore Unique Travel Experiences
        </motion.h1>


        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
                         transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-turquoise">
                  {exp.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                <p className="mt-3 text-lg font-bold text-orange">
                  ₹{exp.price}
                </p>
                <Link
                  to={`/details/${exp._id}`}
                  className="block mt-4 bg-turquoise text-white py-2 rounded-lg 
                             font-medium text-center hover:bg-orange transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
