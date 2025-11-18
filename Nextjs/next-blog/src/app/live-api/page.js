// app/live-api/page.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LiveApiPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Live API Data
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Client-side data fetching from JSONPlaceholder API
        </p>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Fetching data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {/* Users Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      {/* Info Banner */}
      {!loading && !error && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-teal-900 mb-2">
            ⚡ Client-Side Rendering
          </h3>
          <p className="text-teal-800">
            This page uses client-side data fetching with React hooks. 
            Data is fetched after the page loads in the browser. Click "Refresh Data" 
            to fetch new data without a page reload.
          </p>
        </div>
      )}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.name}
          </h3>
          <p className="text-gray-600 text-sm">@{user.username}</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <span className="text-gray-400">📧</span>
          <span className="break-all">{user.email}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-400">🏢</span>
          <span>{user.company.name}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-400">📍</span>
          <span>{user.address.city}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-400">🌐</span>
          <a 
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {user.website}
          </a>
        </div>
      </div>
    </div>
  );
}