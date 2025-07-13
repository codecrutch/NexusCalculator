import { useState } from 'react';
import { register as registerApi } from '../api/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerApi(name, email, password);
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError('Registration failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="block w-full mb-2 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Register</button>
    </form>
  );
} 