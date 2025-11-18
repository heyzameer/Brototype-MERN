// components/NewsCard.js
export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Source Badge */}
      <div className="mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
          {article.source}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
        {article.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {article.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <time className="text-sm text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
        
        {/* <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read more →
        </a> */}
      </div>
    </div>
  );
}