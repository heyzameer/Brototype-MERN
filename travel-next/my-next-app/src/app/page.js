import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-pastel-blue-50 font-sans dark:bg-pastel-blue-100">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-20 px-6 bg-gradient-to-br from-pastel-blue-100 via-pastel-pink-100 to-pastel-green-100 dark:from-pastel-blue-200 dark:via-pastel-pink-200 dark:to-pastel-green-200 shadow-xl">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="text-5xl font-extrabold text-pastel-blue-700 dark:text-pastel-blue-400 mb-6 text-center drop-shadow-lg">Welcome to Travel App</h1>
        <p className="text-xl text-pastel-blue-700 dark:text-pastel-blue-400 mb-12 text-center max-w-2xl">Your platform for booking, hosting, and managing travel experiences. Choose your role to get started:</p>
        <div className="mt-4 grid gap-12 grid-cols-1 md:grid-cols-3 w-full max-w-5xl">
          <a href="/login/user" className="rounded-2xl border border-pastel-blue-200 dark:border-pastel-blue-300 p-10 bg-pastel-blue-100 dark:bg-pastel-blue-200 shadow-md hover:scale-105 transition-transform block">
            <h2 className="text-3xl font-bold text-pastel-blue-700 dark:text-pastel-blue-400 mb-4 text-center">User</h2>
            <p className="text-pastel-blue-700 dark:text-pastel-blue-400 text-lg text-center">Browse and book unique travel experiences around the world.</p>
          </a>
          <a href="/login/host" className="rounded-2xl border border-pastel-green-200 dark:border-pastel-green-300 p-10 bg-pastel-green-100 dark:bg-pastel-green-200 shadow-md hover:scale-105 transition-transform block">
            <h2 className="text-3xl font-bold text-pastel-green-700 dark:text-pastel-green-400 mb-4 text-center">Host</h2>
            <p className="text-pastel-green-700 dark:text-pastel-green-400 text-lg text-center">List your property or experience and connect with travelers.</p>
          </a>
          <a href="/login/admin" className="rounded-2xl border border-pastel-pink-200 dark:border-pastel-pink-300 p-10 bg-pastel-pink-100 dark:bg-pastel-pink-200 shadow-md hover:scale-105 transition-transform block">
            <h2 className="text-3xl font-bold text-pastel-pink-700 dark:text-pastel-pink-400 mb-4 text-center">Admin</h2>
            <p className="text-pastel-pink-700 dark:text-pastel-pink-400 text-lg text-center">Manage users, hosts, and oversee platform operations.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
