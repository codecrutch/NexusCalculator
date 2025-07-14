import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthControllerLogin } from '../generated/auth/auth';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const loginMutation = useAuthControllerLogin();

  // Handle Google OAuth token in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      axios.get('http://localhost:3000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        localStorage.setItem('token', token); // Save Google token
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
  }, [location.search, login]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (response) => {
          // Save JWT token to localStorage
          const token = response.data?.access_token || response.data?.token;
          if (token) {
            localStorage.setItem('token', token);
          }
          // handle login success (e.g., store token, redirect)
          navigate('/');
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Login failed.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit" disabled={loginMutation.isLoading}>Login</button>
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
    </div>
  );
} 