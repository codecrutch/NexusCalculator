import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT to every request if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 