// app/error.js
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 max-w-2xl">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We encountered an unexpected error. Don't worry, our team has been notified.
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-red-900 mb-2">Error Details:</h3>
            <p className="text-red-800 text-sm font-mono">
              {error.message || 'Unknown error'}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Go Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What you can do:</h3>
          <ul className="space-y-2 text-left text-gray-700">
            <li>✓ Click "Try Again" to retry the operation</li>
            <li>✓ Go back to the home page and start over</li>
            <li>✓ Check your internet connection</li>
            <li>✓ Clear your browser cache and cookies</li>
            <li>✓ Contact support if the problem persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
}