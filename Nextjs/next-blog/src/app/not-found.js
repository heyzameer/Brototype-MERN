// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link 
            href="/blog"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Browse Blog
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-left">
            <li>
              <Link href="/blog" className="text-blue-600 hover:underline">
                📝 Blog Posts
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-blue-600 hover:underline">
                📰 Latest News
              </Link>
            </li>
            <li>
              <Link href="/live-api" className="text-blue-600 hover:underline">
                🌐 Live API Data
              </Link>
            </li>
            <li>
              <Link href="/profile/johndoe" className="text-blue-600 hover:underline">
                👤 Example Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}