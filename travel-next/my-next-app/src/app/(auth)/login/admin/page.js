'use client';
import GoogleSignInButton from "../../../../components/auth/GoogleSignInButton"
import React, { useState } from 'react';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Backend API call for login
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api";
      const response = await fetch(`${baseUrl}/auth/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.data && data.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        window.location.href = '/dashboard/admin';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-12">
        <div className="text-center mb-8">
          {/* You can add an icon or illustration here */}
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your Admin account</p>
        </div>
        {/* 1. RENDER THE GOOGLE BUTTON */}
        <div className="py-2 flex justify-center">
          <GoogleSignInButton />
        </div>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              placeholder="••••••••"
              required
            />
            <div className="text-right mt-2">
              <a href="/forgot-password/admin" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>


      </div>
    </div>
  );
}
