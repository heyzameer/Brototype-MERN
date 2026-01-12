'use client';
import React, { useState } from 'react';
import { Plane, User, Mail, Lock } from 'lucide-react';
import GoogleSignInButton from '../../../../components/auth/GoogleSignInButton';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function RegisterHostPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Still keeping role, though unused in form UI
  });
  const [fieldErrors, setFieldErrors] = useState({}); // Stores inline field errors
  const [generalError, setGeneralError] = useState(''); // Stores network/API errors
  const [loading, setLoading] = useState(false);

  // Helper function to update form data and clear the error for that specific field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for the field being changed
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    // Clear general error if any field is changed
    setGeneralError(''); 
  };

  /**
   * Performs client-side validation on all required fields.
   * Returns true if valid, false otherwise and updates error states.
   */
  const validateInputs = () => {
    let errors = {};
    let isValid = true;

    // 1. Name Validation
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
      isValid = false;
    }

    // 2. Email Validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // 3. Password Validation
    if (!formData.password) {
      errors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
      isValid = false;
    }

    // 4. Confirm Password Validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmation is required.';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    // Run client-side validation
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      // Backend API call for registration
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api";
      const response = await fetch(`${baseUrl}/auth/host/register`, { // ⬅️ Host Register API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = '/login/host'; // ⬅️ Redirect to Host Login
      } else {
        setGeneralError(data.error || 'Registration failed');
      }
    } catch (err) {
      setGeneralError('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Helper component to display field errors
  const FieldError = ({ message }) => 
    message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;

  // Helper class for conditional border styling
  const getBorderClass = (fieldName) => 
    fieldErrors[fieldName] ? 'border-red-500' : 'border-gray-300';


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <div className="py-2 flex justify-center">
                    <GoogleSignInButton />
                  </div>
                  <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our business community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {generalError}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${getBorderClass('name')}`}
                placeholder="John Doe"
                aria-invalid={fieldErrors.name ? "true" : "false"}
              />
            </div>
            <FieldError message={fieldErrors.name} />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${getBorderClass('email')}`}
                placeholder="your@email.com"
                aria-invalid={fieldErrors.email ? "true" : "false"}
              />
            </div>
            <FieldError message={fieldErrors.email} />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${getBorderClass('password')}`}
                placeholder="••••••••"
                aria-invalid={fieldErrors.password ? "true" : "false"}
              />
            </div>
            <FieldError message={fieldErrors.password} />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${getBorderClass('confirmPassword')}`}
                placeholder="••••••••"
                aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
              />
            </div>
            <FieldError message={fieldErrors.confirmPassword} />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => window.location.href = '/login/host'}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}