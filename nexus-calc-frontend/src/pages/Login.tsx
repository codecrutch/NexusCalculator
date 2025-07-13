import { useState } from 'react';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  // Handle Google OAuth token in URL
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      axios.get('http://localhost:3000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const user = { ...res.data, permissions: res.data.permissions ?? [] };
        login(token, user);
        window.location.href = '/';
      }).catch(() => {
        // Remove token from URL if login fails
        params.delete('token');
        window.history.replaceState({}, '', `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`);
        setError('Google login failed. Please try again.');
      });
    }
  }, [location.search]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const data = await loginApi(email, password);
      login(data.access_token, { ...data.user, permissions: data.user.permissions ?? [] });
    } catch {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      {/* SVG Wavy Background for Login (more top and bottom waves, rich green scheme) */}
      <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="login-bg-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="30%" stopColor="#ffe066" />
              <stop offset="60%" stopColor="#43e97b" />
              <stop offset="100%" stopColor="#0a3d62" />
            </linearGradient>
          </defs>
          <rect width="1440" height="810" fill="url(#login-bg-gradient)" />
          {/* More top waves */}
          <path d="M0,40 Q350,0 700,60 T1440,40 L1440,0 L0,0 Z" fill="#43e97b" fillOpacity="0.18" />
          <path d="M0,60 Q500,10 1440,60 L1440,0 L0,0 Z" fill="#ffe066" fillOpacity="0.12" />
          <path d="M0,100 Q200,40 1440,100 L1440,0 L0,0 Z" fill="#0a3d62" fillOpacity="0.10" />
          <path d="M0,120 Q600,40 1440,120 L1440,0 L0,0 Z" fill="#0a3d62" fillOpacity="0.18" />
          <path d="M0,140 Q800,60 1440,140 L1440,0 L0,0 Z" fill="#ffe066" fillOpacity="0.13" />
          <path d="M0,160 Q400,100 1440,160 L1440,0 L0,0 Z" fill="#fffbe6" fillOpacity="0.10" />
          <path d="M0,180 Q1000,80 1440,180 L1440,0 L0,0 Z" fill="#43e97b" fillOpacity="0.09" />
          {/* Existing top waves */}
          <path d="M0,80 Q400,0 900,100 T1440,80 L1440,0 L0,0 Z" fill="#43e97b" fillOpacity="0.25" />
          <path d="M0,120 Q600,40 1440,120 L1440,0 L0,0 Z" fill="#0a3d62" fillOpacity="0.18" />
          <path d="M0,160 Q800,60 1440,160 L1440,0 L0,0 Z" fill="#ffe066" fillOpacity="0.13" />
          {/* Bottom/center waves */}
          <path d="M0,600 Q400,850 800,600 T1440,600 L1440,810 L0,810 Z" fill="#ffe066" fillOpacity="0.7" />
          <path d="M0,700 Q360,900 720,700 T1440,700 L1440,810 L0,810 Z" fill="#43e97b" fillOpacity="0.5" />
          <path d="M0,800 Q500,950 1440,800 L1440,810 L0,810 Z" fill="#0a3d62" fillOpacity="0.3" />
          <path d="M0,850 Q200,1000 1440,850 L1440,810 L0,810 Z" fill="#fffbe6" fillOpacity="0.4" />
          <path d="M0,875 Q600,1050 1440,875 L1440,810 L0,810 Z" fill="#f7b32b" fillOpacity="0.3" />
          <path d="M0,890 Q800,1100 1440,890 L1440,810 L0,810 Z" fill="#43e97b" fillOpacity="0.2" />
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Login</h2>
        <div className="mb-2 text-gray-600">
          Welcome back! Need an account?{' '}
          <Link to="/register" className="text-green-700 hover:underline">Register</Link>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Email address</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
            tabIndex={-1}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.02c2.12 3.77 6.07 6.48 10.066 6.48 2.042 0 3.97-.57 5.602-1.553M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.02-3.777A10.477 10.477 0 0122.066 12.02c-2.12 3.77-6.07 6.48-10.066 6.48a10.477 10.477 0 01-5.602-1.553" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.02-3.777A10.477 10.477 0 0122.066 12.02c-2.12 3.77-6.07 6.48-10.066 6.48-2.042 0-3.97-.57-5.602-1.553M3.98 8.223A10.477 10.477 0 001.934 12.02c2.12 3.77 6.07 6.48 10.066 6.48 2.042 0 3.97-.57 5.602-1.553" />
              </svg>
            )}
          </button>
        </div>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit">Login</button>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-full text-lg transition-colors mt-2 flex items-center justify-center gap-2 shadow hover:bg-gray-50"
          onClick={() => window.location.href = 'http://localhost:3000/auth/google'}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.147-3.2-.419-4.704H24.48v9.02h13.02c-.527 2.84-2.12 5.24-4.52 6.86v5.68h7.32c4.28-3.94 6.73-9.74 6.73-16.856z" fill="#4285F4"/><path d="M24.48 48c6.12 0 11.26-2.04 15.01-5.54l-7.32-5.68c-2.04 1.36-4.66 2.16-7.69 2.16-5.91 0-10.92-3.98-12.72-9.32H4.27v5.86C7.99 43.98 15.62 48 24.48 48z" fill="#34A853"/><path d="M11.76 29.62c-.48-1.36-.76-2.8-.76-4.28 0-1.48.28-2.92.76-4.28v-5.86H4.27A23.97 23.97 0 0 0 0 24.48c0 3.98.96 7.74 2.67 11.06l7.99-5.86z" fill="#FBBC05"/><path d="M24.48 9.52c3.34 0 6.32 1.15 8.68 3.4l6.48-6.48C35.74 2.04 30.6 0 24.48 0 15.62 0 7.99 4.02 4.27 10.14l7.99 5.86c1.8-5.34 6.81-9.32 12.72-9.32z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
          Login with Google
        </button>
      </form>
    </div>
  );
} 