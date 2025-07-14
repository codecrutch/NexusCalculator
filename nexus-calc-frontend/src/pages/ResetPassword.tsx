import React, { useState } from 'react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    // TODO: Call backend API to send reset email
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Reset Password</h2>
        <p className="mb-4 text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
        {submitted ? (
          <div className="text-green-700 text-center font-semibold">If an account exists for that email, a reset link has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {error && <div className="text-red-600 text-center">{error}</div>}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
} 