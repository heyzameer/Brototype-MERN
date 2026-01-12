// components/auth/UserLoginForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import Link from 'next/link';
import { loginUser } from '@/lib/api'; // Your API service to interact with Node.js backend

export default function UserLoginForm({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { token, user } = await loginUser(email, password, role); // Send role to backend for verification
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user data
      router.push(`/${role}/dashboard`); // Redirect to role-specific dashboard (e.g., /user/dashboard)
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p className="text-center text-sm mt-4">
        Don't have an account?{' '}
        <Link href={`/register/${role}`} className="font-medium text-indigo-600 hover:text-indigo-500">
          Register here
        </Link>
      </p>
      <p className="text-center text-sm mt-2">
        <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
          Forgot Password?
        </Link>
      </p>
    </form>
  );
}