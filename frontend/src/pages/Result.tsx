import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, success } = location.state || {};

  const isSuccess = success !== false; // default true if not provided

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sand text-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        {isSuccess ? (
          <>
            <h1 className="text-3xl font-bold text-turquoise mb-4">🎉 Booking Confirmed!</h1>
            <p className="text-gray-700 mb-2">Thank you for choosing <span className="font-semibold text-orange">BookIt</span>.</p>
            {bookingId ? (
              <p className="text-lg font-semibold text-gray-800">
                Your Booking ID: <span className="text-turquoise">{bookingId}</span>
              </p>
            ) : (
              <p className="text-gray-600 italic">Booking ID will be sent to your email.</p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-500 mb-4">❌ Booking Failed</h1>
            <p className="text-gray-700 mb-4">Something went wrong. Please try again later.</p>
          </>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-orange text-white px-6 py-2 rounded font-medium hover:bg-turquoise transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
