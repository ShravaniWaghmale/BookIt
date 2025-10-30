import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { slot } = location.state || {};

  const [experience, setExperience] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch selected experience
  useEffect(() => {
    if (id) {
      API.get(`/experiences/${id}`)
        .then(res => setExperience(res.data))
        .catch(() => setError('Failed to fetch experience'));
    }
  }, [id]);

  const handlePromo = async () => {
    if (!promoCode) return;
    try {
      const res = await API.post('/promo/validate', { code: promoCode });
      setDiscount(res.data.discount || 0);
    } catch {
      setError('Invalid promo code');
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !slot) {
      setError('Please fill all required fields and select a slot.');
      setLoading(false);
      return;
    }

    const finalPrice = experience.price - discount;

    try {
      const res = await API.post('/bookings', {
        name,
        email,
        experienceId: id,
        slot,
        promoCode,
        finalPrice,
      });

      if (res.data.success) {
        navigate(`/result/success`, { state: { bookingId: res.data.bookingId } });
      } else {
        navigate(`/result/failure`);
      }
    } catch (err: any) {
      console.error(err);
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!experience) return <p className="text-center mt-10">Loading checkout details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-turquoise text-center">Checkout</h1>

      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-700">{experience.title}</h2>
        <p className="text-gray-600">{experience.description}</p>
        <p className="mt-2 text-lg font-medium text-orange">Slot: {slot?.date} at {slot?.time}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-turquoise outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-turquoise outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Promo Code</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-turquoise outline-none"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePromo}
              className="bg-turquoise text-white px-4 py-2 rounded hover:bg-orange transition"
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 mt-1">Discount applied: ₹{discount}</p>
          )}
        </div>

        <div className="bg-sand p-4 rounded mt-4">
          <h3 className="text-lg font-semibold mb-1">Price Summary</h3>
          <p>Base Price: ₹{experience.price}</p>
          <p>Discount: ₹{discount}</p>
          <p className="font-bold text-turquoise text-xl mt-2">
            Final Price: ₹{experience.price - discount}
          </p>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange text-white py-2 rounded mt-4 font-semibold hover:bg-turquoise transition"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
