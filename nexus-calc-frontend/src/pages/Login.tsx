import { useState } from 'react';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const data = await loginApi(email, password);
      login(data.access_token, data.user);
    } catch {
      setError('Invalid credentials');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* SVG Wavy Background for Login (greens, golds, sands, more contrast, more shapes) */}
      <div className="fixed inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="login-bg-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffbe6" /> {/* light sand */}
              <stop offset="30%" stopColor="#ffe066" /> {/* bright gold */}
              <stop offset="60%" stopColor="#43e97b" /> {/* vivid green */}
              <stop offset="100%" stopColor="#0a3d62" /> {/* deep blue-green */}
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#login-bg-gradient)" />
          <path d="M0,600 Q360,700 720,600 T1440,600 L1440,900 L0,900 Z" fill="#ffe066" fillOpacity="0.7" />
          <path d="M0,700 Q400,800 900,700 T1440,700 L1440,900 L0,900 Z" fill="#43e97b" fillOpacity="0.5" />
          <path d="M0,800 Q500,900 1440,800 L1440,900 L0,900 Z" fill="#0a3d62" fillOpacity="0.4" />
          <path d="M0,850 Q200,870 1440,850 L1440,900 L0,900 Z" fill="#fffbe6" fillOpacity="0.6" />
          <path d="M0,750 Q600,850 1440,750 L1440,900 L0,900 Z" fill="#f7b32b" fillOpacity="0.3" />
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
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
      </form>
    </div>
  );
} 