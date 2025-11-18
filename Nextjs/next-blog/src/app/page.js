// app/page.js
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Next.js Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A full-stack blog application with SSG, SSR, MongoDB & API Routes
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Blog Posts
          </Link>
          <Link 
            href="/news"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Latest News
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Static Blog (SSG)"
          description="Blog posts are statically generated at build time for optimal performance"
          icon="📝"
          link="/blog"
        />
        <FeatureCard
          title="Server-Side News (SSR)"
          description="News page fetches fresh data on every request using server-side rendering"
          icon="📰"
          link="/news"
        />
        <FeatureCard
          title="Dynamic Profiles"
          description="User profiles loaded dynamically with optimized images from MongoDB"
          icon="👤"
          link="/profile/johndoe"
        />
        <FeatureCard
          title="API Routes"
          description="RESTful API endpoints for creating and fetching blog posts"
          icon="🔌"
          link="/api/posts"
        />
        <FeatureCard
          title="Live API Data"
          description="Real-time data from external APIs with client-side rendering"
          icon="🌐"
          link="/live-api"
        />
        <FeatureCard
          title="Image Optimization"
          description="Next.js Image component with blur placeholders and responsive loading"
          icon="🖼️"
          link="/blog"
        />
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <TechBadge>Next.js 14</TechBadge>
          <TechBadge>App Router</TechBadge>
          <TechBadge>MongoDB</TechBadge>
          <TechBadge>Mongoose</TechBadge>
          <TechBadge>Tailwind CSS</TechBadge>
          <TechBadge>API Routes</TechBadge>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, link }) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

function TechBadge({ children }) {
  return (
    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
      {children}
    </span>
  );
}