// app/profile/[username]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// Fetch user data
async function getUser(username) {
  try {
    await connectDB();
    const user = await User.findOne({ 
      username: username.toLowerCase() 
    }).lean();
    
    if (!user) return null;
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Generate metadata
// export async function generateMetadata({ params }) {
//   const user = await getUser(params.username);
  
//   if (!user) {
//     return {
//       title: 'User Not Found',
//     };
//   }

//   return {
//     title: `${user.name} (@${user.username})`,
//     description: user.bio || `Profile of ${user.name}`,
//   };
// }

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const user = await getUser(resolvedParams.username);
//   console.log("userimage:", user.avatar);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar - Using next/image with optimization */}
            <div className="relative -mt-16 mb-4">
              <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                <Image
                  src={ `https://api.dicebear.com/7.x/initials/png?seed=${user.username}`}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                //   unoptimized
                />
               
              </div>
            </div>

            {/* User Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 mb-4">@{user.username}</p>
              
              {user.bio && (
                <p className="text-gray-700 mb-4">{user.bio}</p>
              )}

              {/* Contact Info */}
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <a 
                    href={`mailto:${user.email}`}
                    className="hover:text-blue-600"
                  >
                    {user.email}
                  </a>
                </div>
                
                {user.website && (
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <a 
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {user.website}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">
            🖼️ Image Optimization
          </h3>
          <p className="text-orange-800">
            This page uses Next.js Image component with blur placeholder, 
            responsive sizing, and automatic optimization for faster loading.
          </p>
        </div>

        {/* Example Profiles */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Try Other Profiles
          </h3>
          <p className="text-gray-600 mb-4">
            Create users in MongoDB and visit their profiles:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link 
              href="/profile/johndoe"
              className="bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              @johndoe
            </Link>
            <Link 
              href="/profile/janedoe"
              className="bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              @janedoe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}