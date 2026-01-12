'use client'
// app/(dashboard)/user/page.js
// import { getUserDashboardData } from '@/lib/api'; // Server-side API call
// import { cookies } from 'next/headers';

export default async function UserDashboardPage() {
  // TODO: Fetch user data from backend here (e.g., getUserDashboardData)
  // Example:
  // const userData = await getUserDashboardData(token);

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-xl px-12 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome, Host!</h1>
        <p className="text-lg text-gray-600 mb-2">This is your personalized Host dashboard.</p>
        {/* TODO: Render user-specific data here */}
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}