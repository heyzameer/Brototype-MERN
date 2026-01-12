'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id?: string;
  name?: string;
  email: string;
  role: 'user' | 'host' | 'admin';
}

export default function UserDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch('http://localhost:4000/api/auth/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push('/login');
          return;
        }

        const data = await res.json();
        const user = data.user;

        if (!user) {
          router.push('/login');
          return;
        }

        setUser(user);
      } catch (error) {
        console.error(error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [router]);

  // ⛔ Never redirect inside render — return null instead until effect handles it
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) return null; // prevent render-trigger redirects

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-xl px-12 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome, {user.email.split('@')[0]}!
        </h1>

        <p className="text-lg text-gray-600 mb-2">
          This is your personalized user dashboard.
        </p>

        <p className="text-md text-gray-500">Email: {user.email}</p>
        <p className="text-md text-gray-500">Role: {user.role}</p>

        <button
          onClick={() => router.push('/')}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
