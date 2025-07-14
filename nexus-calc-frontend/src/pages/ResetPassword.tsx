import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePasswordResetControllerRequestPasswordReset, usePasswordResetControllerValidateResetToken, usePasswordResetControllerResetPassword } from '../generated/password-reset/password-reset';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  // Request reset link state
  const [email, setEmail] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');

  // New password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Request reset link mutation
  const requestResetMutation = usePasswordResetControllerRequestPasswordReset();

  // Validate token query
  const {
    data: validateData,
    isLoading: isValidating,
    isError: isValidateError,
    error: validateError,
  } = usePasswordResetControllerValidateResetToken(
    { token: token || '' },
    { enabled: !!token }
  );

  // Reset password mutation
  const resetPasswordMutation = usePasswordResetControllerResetPassword();

  // Handle request reset link
  function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRequestError('');
    requestResetMutation.mutate(
      { data: { email } },
      {
        onSuccess: () => setRequestSubmitted(true),
        onError: (err: any) => {
          setRequestError(err?.response?.data?.message || 'Something went wrong.');
        },
      }
    );
  }

  // Handle reset password
  function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResetError('');
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }
    resetPasswordMutation.mutate(
      { data: { token: token!, newPassword } },
      {
        onSuccess: () => {
          setResetSuccess(true);
          setTimeout(() => navigate('/login'), 2000);
        },
        onError: (err: any) => {
          setResetError(err?.response?.data?.message || 'Something went wrong.');
        },
      }
    );
  }

  // If no token, show request form
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 py-8">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">Reset Password</h2>
          <p className="mb-4 text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
          {requestSubmitted ? (
            <div className="text-green-700 text-center font-semibold">If an account exists for that email, a reset link has been sent.</div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
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
              {requestError && <div className="text-red-600 text-center">{requestError}</div>}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit" disabled={requestResetMutation.isLoading}>Send Reset Link</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // If token, validate and show reset form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Set New Password</h2>
        {isValidating ? (
          <div className="text-gray-600 text-center">Validating reset link...</div>
        ) : isValidateError ? (
          <div className="text-red-600 text-center">
            {validateError?.response?.data?.message || 'Invalid or expired reset link.'}
            <br />
            <a href="/reset-password" className="text-green-700 underline">Request a new reset link</a>
          </div>
        ) : resetSuccess ? (
          <div className="text-green-700 text-center font-semibold">Password reset! Redirecting to login...</div>
        ) : (
          <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700">New password</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Confirm new password</label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {resetError && <div className="text-red-600 text-center">{resetError}</div>}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2" type="submit" disabled={resetPasswordMutation.isLoading}>Set New Password</button>
          </form>
        )}
      </div>
    </div>
  );
} 