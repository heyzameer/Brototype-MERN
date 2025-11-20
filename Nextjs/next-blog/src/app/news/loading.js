export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-6"></div>
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Loading News...</h2>
      <p className="text-gray-500">Please wait while we fetch the latest news for you.</p>
    </div>
  );
}
