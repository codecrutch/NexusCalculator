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
  const [marketing, setMarketing] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-purple-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4"
      >
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Sign up</h2>
        <div className="mb-2 text-gray-600">
          Create an account or{' '}
          <Link to="/login" className="text-purple-700 hover:underline">Sign in</Link>
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
        <div className="flex items-center gap-2 mt-2">
          <input
            id="marketing"
            type="checkbox"
            checked={marketing}
            onChange={e => setMarketing(e.target.checked)}
            className="accent-purple-600"
          />
          <label htmlFor="marketing" className="text-sm text-gray-600">
            I do not want to receive emails with advertising, news, suggestions or marketing promotions
          </label>
        </div>
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit">Sign up</button>
        <div className="mt-4 text-center text-xs text-gray-400">
          By signing up to create an account, you are accepting our <span className="underline">terms of service</span> and <span className="underline">privacy policy</span>
        </div>
      </form>
    </div>
  );
} 