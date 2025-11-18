// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Blog - Full-Stack Application',
  description: 'A complete Next.js 14 blog with MongoDB, SSG, SSR, and API routes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Next.js Blog. Built with Next.js 14 & MongoDB.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}