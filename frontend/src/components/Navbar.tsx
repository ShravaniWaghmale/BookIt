import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignInModal from './SignInModal';

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Restore user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSignIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowModal(false);
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowDropdown(false);
  };

  return (
    <nav className="bg-turquoise text-white px-8 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-2 hover:text-orange transition-all"
      >
        🌴 <span>BookIt</span>
      </Link>

      <ul className="flex gap-8 text-lg">
        <li>
          <Link to="/" className="hover:text-orange transition">Home</Link>
        </li>
        <li>
          <Link to="/" className="hover:text-orange transition">Experiences</Link>
        </li>
        <li>
          <Link to="/bookings" className="hover:text-orange transition">Bookings</Link>
        </li>
      </ul>

      {/* ✅ Right Side: Avatar or Sign In */}
      {user ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-white text-turquoise w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center border-2 border-white hover:bg-orange hover:text-white transition"
          >
            {user.name.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white text-turquoise rounded-md shadow-lg py-2 w-40">
              <p className="px-4 py-2 border-b border-gray-200 font-medium">
                {user.name}
              </p>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-turquoise hover:text-white transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-turquoise px-4 py-2 rounded-md font-medium hover:bg-orange hover:text-white border-2 border-white transition"
        >
          Sign In
        </button>
      )}

      {showModal && <SignInModal onClose={() => setShowModal(false)} onSignIn={handleSignIn} />}
    </nav>
  );
}
