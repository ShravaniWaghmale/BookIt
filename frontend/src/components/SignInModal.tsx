import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface Props {
  onClose: () => void;
}

export default function SignInModal({ onClose }: Props) {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    signIn({ name, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-turquoise mb-4 text-center">Sign In to BookIt</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-turquoise outline-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-turquoise outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-turquoise to-orange text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-turquoise hover:text-orange font-medium text-sm mx-auto block"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
