import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import Navbar from './components/Navbar';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/result/:status" element={<Result />} />
        <Route path="/bookings" element={<MyBookings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
