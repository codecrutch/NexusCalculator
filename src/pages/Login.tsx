import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAuthLoginMutation } from '../api/generated';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { mutate, isLoading } = useAuthLoginMutation({
    onSuccess: (data) => {
      if (data?.access_token && data?.user) {
        login(data.access_token, data.user);
      } else {
        setError('Invalid response from server');
      }
    },
    onError: () => setError('Invalid credentials'),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    mutate({ data: { email, password } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
} 