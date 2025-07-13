import { useState } from 'react';
import { register as registerApi } from '../api/auth';
import { Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerApi(name, email, password);
      setSuccess('Registration successful! You can now log in.');
    } catch {
      setError('Registration failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* SVG Wavy Background (distinct green waves for register, with more top waves) */}
      <div className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden">
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
            <linearGradient id="register-bg-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="30%" stopColor="#ffe066" />
              <stop offset="60%" stopColor="#43e97b" />
              <stop offset="100%" stopColor="#0a3d62" />
            </linearGradient>
          </defs>
          <rect width="1440" height="810" fill="url(#register-bg-gradient)" />
          {/* More top waves */}
          <path d="M0,40 Q300,0 700,60 T1440,40 L1440,0 L0,0 Z" fill="#43e97b" fillOpacity="0.18" />
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
          <path d="M0,700 Q300,600 700,750 T1440,700 L1440,810 L0,810 Z" fill="#43e97b" fillOpacity="0.5" />
          <path d="M0,780 Q400,810 900,780 T1440,790 L1440,810 L0,810 Z" fill="#ffe066" fillOpacity="0.4" />
          <path d="M0,810 Q200,790 1440,810 L1440,810 L0,810 Z" fill="#0a3d62" fillOpacity="0.2" />
          <path d="M0,730 Q600,850 1440,730 L1440,810 L0,810 Z" fill="#fffbe6" fillOpacity="0.3" />
          <path d="M0,800 Q800,810 1440,800 L1440,810 L0,810 Z" fill="#f7b32b" fillOpacity="0.2" />
        </svg>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4"
      >
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Register</h2>
        <div className="mb-2 text-gray-600">
          Create an account or{' '}
          <Link to="/login" className="text-purple-700 hover:underline">Login</Link>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Email address</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="Username"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
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
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit">Register</button>
        <div className="mt-4 text-center text-xs text-gray-400">
          By signing up to create an account, you are accepting our <span className="underline">terms of service</span> and <span className="underline">privacy policy</span>
        </div>
      </form>
    </div>
  );
} 