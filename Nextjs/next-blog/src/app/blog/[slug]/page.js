// app/blog/[slug]/page.js
// 'use server';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const revalidate = 3600;

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await Post.find({ published: true }).select('slug').lean();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch post data
async function getPost(slug) {
    console.log("Fetching post with slug:", slug);
  try {
    await connectDB();
    const post = await Post.findOne({ slug, published: true }).lean();
    
    if (!post) return null;
    
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
//   console.log("hellloooooooooooooooooooo")
//   console.log("paraaamss", resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <Link 
        href="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600 gap-4">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          ⚡ Statically Generated
        </h3>
        <p className="text-green-800">
          This page was generated at build time using generateStaticParams. 
          All blog posts are pre-rendered for maximum performance.
        </p>
      </div>
    </article>
  );
}