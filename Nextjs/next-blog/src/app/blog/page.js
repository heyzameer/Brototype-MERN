// app/blog/page.js
import Link from 'next/link';
import Image from 'next/image';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import BlogCard from '@/components/BlogCard';

// This page uses SSG - generated at build time
export const revalidate = 3600; // Revalidate every hour (ISR)

async function getPosts() {
  try {
    await connectDB();
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert MongoDB objects to plain objects
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Posts
        </h1>
        <p className="text-lg text-gray-600">
          Statically generated at build time (SSG) • {posts.length} posts
        </p>
      </div>

      {/* Blog Grid */}
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No blog posts found</p>
          <p className="text-gray-500">
            Add posts to MongoDB or use the API to create new posts
          </p>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          🚀 Static Site Generation (SSG)
        </h3>
        <p className="text-blue-800">
          This page is statically generated at build time for optimal performance. 
          Posts are fetched from MongoDB during the build process and cached.
        </p>
      </div>
    </div>
  );
}