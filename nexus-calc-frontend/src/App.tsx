import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import { formatUsername } from './utils/formatUsername';
import React, { useState, useRef, useEffect } from 'react';
import DisplayUsers from './pages/DisplayUsers';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between px-8 py-3 bg-[#133a24] shadow-md z-10 relative">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-wide md:hidden">NHC</span>
          <span className="text-xl font-bold text-white tracking-wide hidden md:inline">Nexus Hunting Calculator</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white text-base font-medium hover:text-green-300 transition">Home</Link>
          {!user && (
            <>
              <Link to="/login" className="text-white text-base font-medium hover:text-green-300 transition">Login</Link>
              <Link
                to="/register"
                className="ml-2 px-5 py-2 bg-gradient-to-br from-green-800 via-green-700 to-green-600 border border-green-400/30 text-white font-semibold rounded-full shadow-lg shadow-green-900/20 backdrop-blur-sm transition hover:from-green-700 hover:to-green-800 hover:shadow-green-900/40"
              >
                Register
              </Link>
            </>
          )}
          {user && (
            <div className="relative" ref={menuRef}>
              <span
                className="ml-4 text-green-200 font-mono text-base cursor-pointer hover:text-green-100 transition"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {formatUsername(user)}
              </span>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  {user.permissions?.includes('view:users') && (
                    <Link
                      to="/users"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-900 transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      User List
                    </Link>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-900 transition"
                    onClick={() => { logout(); setMenuOpen(false); }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div className="p-4">Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<DisplayUsers />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
