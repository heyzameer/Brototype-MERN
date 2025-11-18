// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Next.js Blog
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/news">News</NavLink>
            <NavLink href="/live-api">Live API</NavLink>
            <NavLink href="/profile/johndoe">Profile</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
            <MobileNavLink href="/news">News</MobileNavLink>
            <MobileNavLink href="/live-api">Live API</MobileNavLink>
            <MobileNavLink href="/profile/johndoe">Profile</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href}
      className="text-gray-700 hover:text-blue-600 font-medium transition"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link 
      href={href}
      className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition"
    >
      {children}
    </Link>
  );
}