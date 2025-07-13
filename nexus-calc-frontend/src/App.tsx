import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between px-8 py-3 bg-[#133a24] shadow-md z-10 relative">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wide md:hidden">NHC</span>
          <span className="text-xl font-bold text-white tracking-wide hidden md:inline">Nexus Hunting Calculator</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white text-base font-medium hover:text-green-300 transition">Home</Link>
          <Link to="/login" className="text-white text-base font-medium hover:text-green-300 transition">Login</Link>
          <Link
            to="/register"
            className="ml-2 px-5 py-2 bg-gradient-to-br from-green-800 via-green-700 to-green-600 border border-green-400/30 text-white font-semibold rounded-full shadow-lg shadow-green-900/20 backdrop-blur-sm transition hover:from-green-700 hover:to-green-800 hover:shadow-green-900/40"
          >
            Register
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-4">Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
