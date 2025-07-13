import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between px-8 py-3 bg-[#20123a] shadow-md z-10 relative">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wide md:hidden">NHC</span>
          <span className="text-xl font-bold text-white tracking-wide hidden md:inline">Nexus Hunting Calculator</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white text-base font-medium hover:text-purple-300 transition">Home</Link>
          <Link to="/login" className="text-white text-base font-medium hover:text-purple-300 transition">Login</Link>
          <Link to="/register" className="ml-2 px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full shadow transition">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-4">Home Page</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
