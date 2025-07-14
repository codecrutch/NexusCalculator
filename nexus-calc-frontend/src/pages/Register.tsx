import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthControllerRegister } from '../generated/auth/auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registerMutation = useAuthControllerRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    registerMutation.mutate(
      { data: { email, password, name } },
      {
        onSuccess: () => {
          // handle registration success (e.g., redirect to login or auto-login)
          navigate('/login');
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Registration failed.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-center">{error}</div>}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit" disabled={registerMutation.isLoading}>Register</button>
        </form>
      </div>
    </div>
  );
} 