import NewsCard from '@/components/NewsCard';

// Force dynamic rendering (SSR)
// export const dynamic = 'force-dynamic';
export const revalidate = 5;

async function getNews() {
  try {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
    //   cache: 'no-store',
    // });
    console.log('Fetching news from API...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await response.json();
    const timestamp = new Date().toLocaleString();
    return {
      news: data.map(item => ({
        id: item.id,
        title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
        description: item.body.substring(0, 150) + '...',
        source: 'JSONPlaceholder',
        publishedAt: new Date().toISOString(),
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      })),
      timestamp,
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { news: [], timestamp: new Date().toLocaleString() };
  }
}

export default async function NewsPage() {
  const { news, timestamp } = await getNews();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Latest News
        </h1>
        <p className="text-lg text-gray-600">
          Server-side rendered on every request (SSR)
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last fetched: {timestamp}
        </p>
      </div>

      {/* News Grid */}
      {news.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Failed to load news</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">
          🔄 Server-Side Rendering (SSR)
        </h3>
        <p className="text-purple-800">
          This page is rendered on the server for every request. The timestamp above 
          shows when the data was last fetched. Refresh the page to see updated data.
        </p>
      </div>
    </div>
  );
}