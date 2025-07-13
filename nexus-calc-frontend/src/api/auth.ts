import { api } from './client';

export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // { access_token, user }
}

export async function register(name: string, email: string, password: string) {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data; // user object
} 