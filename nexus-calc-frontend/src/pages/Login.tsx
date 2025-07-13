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
    } catch (err: any) {
      setError('Invalid credentials');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>
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
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
    </form>
  );
} 