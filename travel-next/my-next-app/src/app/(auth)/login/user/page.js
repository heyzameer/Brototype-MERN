'use client';
import GoogleSignInButton from "../../../../components/auth/GoogleSignInButton"
import React, { useState } from 'react';

// Email validation regex (basic but effective for a client-side check)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generalError, setGeneralError] = useState(''); // For network/login errors
  const [emailError, setEmailError] = useState('');     // For email validation errors
  const [passwordError, setPasswordError] = useState(''); // For password validation errors
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // 1. Email Validation
    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // 2. Password Validation
    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Run client-side validation
    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

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
        window.location.href = '/dashboard/user';
      } else {
        setGeneralError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setGeneralError('Network error. Could not connect to the server.');
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
          <p className="text-gray-600 mt-2">Login to your travel account</p>
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
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {generalError}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              // Clear inline error on change
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg ${emailError ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="your@email.com"
              aria-invalid={emailError ? "true" : "false"}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              // Clear inline error on change
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg ${passwordError ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="••••••••"
              aria-invalid={passwordError ? "true" : "false"}
            />
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
            <div className="text-right mt-2">
              <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => window.location.href = '/register/user'}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
        {/* <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Test Accounts:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p>User: user@test.com / user123</p>
            <p>Host: host@test.com / host123</p>
            <p>Admin: admin@test.com / admin123</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}