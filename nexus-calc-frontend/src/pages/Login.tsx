import { useState } from 'react';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Sign In</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors" type="submit">Login</button>
        <div className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
} 