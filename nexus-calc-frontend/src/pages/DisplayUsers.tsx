import React, { useState, useMemo } from 'react';
import { useUserControllerFindAll } from '../api/users/users';
import { useAuth } from '../context/AuthContext';
import { formatUsername } from '../utils/formatUsername';
import { Navigate } from 'react-router-dom';

// User type with permissions
interface User {
  id: number;
  email: string;
  name: string;
  discriminator: string;
  permissions: string[];
}

export default function DisplayUsers() {
  const { user } = useAuth();
  const { data, isLoading, error } = useUserControllerFindAll();
  const [search, setSearch] = useState('');

  // Extract users from AxiosResponse
  const users: User[] = Array.isArray(data?.data) ? data.data as User[] : [];

  // Filter users by search
  const filtered: User[] = useMemo(() => {
    if (!search) return users;
    const s = search.toLowerCase();
    return users.filter((u) =>
      u.name?.toLowerCase().includes(s) ||
      u.email?.toLowerCase().includes(s) ||
      u.discriminator?.toLowerCase().includes(s)
    );
  }, [users, search]);

  // Only allow users with the 'view:users' permission
  if (!user || !user.permissions?.includes('view:users')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          className="border px-3 py-2 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Search by name, email, or discriminator..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div className="text-red-600">Failed to load users.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Discriminator</th>
                <th className="px-4 py-2 text-left">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">No users found.</td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-b-0 hover:bg-green-50">
                    <td className="px-4 py-2 font-medium">{formatUsername(u)}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.discriminator}</td>
                    <td className="px-4 py-2">
                      {u.permissions && u.permissions.length > 0
                        ? u.permissions.join(', ')
                        : <span className="text-gray-400">None</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 