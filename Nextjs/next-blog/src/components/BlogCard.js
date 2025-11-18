// components/BlogCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={post.image || '/images/blog-default.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">{post.author}</span>
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}