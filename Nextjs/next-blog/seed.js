// scripts/seed.js
// Run this script to seed your MongoDB database with sample data
// Usage: node scripts/seed.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = "mongodb+srv://user:zGrxrSAsruBZ3zxt@cluster0.iriaonw.mongodb.net/next-blog?retryWrites=true&w=majority";

// Define schemas directly in seed script
const PostSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  image: String,
  published: Boolean,
  createdAt: Date,
});

const UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  bio: String,
  avatar: String,
  website: String,
  createdAt: Date,
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Sample data
const samplePosts = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    excerpt: "Learn the fundamentals of Next.js 14 and the App Router. This comprehensive guide covers everything you need to know.",
    content: "Next.js 14 brings amazing new features including improved performance, better developer experience, and the stable App Router. In this post, we'll explore the key concepts and how to get started.\n\nThe App Router provides a new way to build applications with React Server Components. It offers improved routing, layouts, and data fetching patterns.\n\nKey features include:\n- File-based routing\n- Server and Client Components\n- Streaming and Suspense\n- Built-in SEO support\n\nLet's dive into building modern web applications with Next.js!",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    published: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    title: "Understanding Server Components in React",
    slug: "understanding-server-components",
    excerpt: "Server Components revolutionize how we build React applications. Discover the benefits and use cases.",
    content: "React Server Components represent a paradigm shift in how we think about building React applications. They allow you to render components on the server, reducing the JavaScript bundle size sent to the client.\n\nBenefits include:\n- Zero client-side JavaScript for server components\n- Direct access to backend resources\n- Improved initial page load\n- Better SEO performance\n\nServer Components work seamlessly with Client Components, allowing you to build highly interactive applications with optimal performance.",
    author: "Jane Smith",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    published: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    title: "MongoDB and Next.js: A Perfect Match",
    slug: "mongodb-nextjs-perfect-match",
    excerpt: "Explore how MongoDB integrates seamlessly with Next.js for building full-stack applications.",
    content: "MongoDB is a popular NoSQL database that pairs perfectly with Next.js. Its flexible document model makes it ideal for modern web applications.\n\nWhy MongoDB with Next.js?\n- Flexible schema design\n- Easy to scale\n- Great developer experience\n- Perfect for rapid prototyping\n\nUsing Mongoose, we can define schemas and models that make working with MongoDB intuitive and type-safe. The combination of Next.js API routes and MongoDB creates a powerful full-stack solution.",
    author: "Mike Johnson",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    published: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    title: "Image Optimization in Next.js",
    slug: "image-optimization-nextjs",
    excerpt: "Master the Next.js Image component for blazing fast image loading and optimal user experience.",
    content: "The Next.js Image component is a powerful tool for automatic image optimization. It provides features like lazy loading, responsive images, and modern format support.\n\nKey features:\n- Automatic lazy loading\n- Responsive images with srcset\n- WebP and AVIF format support\n- Blur placeholder while loading\n- No CLS (Cumulative Layout Shift)\n\nUsing the Image component is simple and provides significant performance benefits out of the box.",
    author: "Sarah Williams",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    published: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    title: "Building RESTful APIs with Next.js",
    slug: "building-restful-apis-nextjs",
    excerpt: "Learn how to create powerful API endpoints using Next.js API routes and best practices.",
    content: "Next.js API routes make it easy to build API endpoints without needing a separate backend server. They're serverless functions that can handle any HTTP method.\n\nBest practices:\n- Use proper HTTP methods (GET, POST, PUT, DELETE)\n- Implement error handling\n- Validate input data\n- Use middleware for authentication\n- Return consistent response formats\n\nAPI routes are perfect for creating backend logic, handling form submissions, and integrating with databases.",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    published: true,
    createdAt: new Date('2024-02-15'),
  },
  {
    title: "Tailwind CSS: Styling Made Easy",
    slug: "tailwind-css-styling-made-easy",
    excerpt: "Discover how Tailwind CSS speeds up development with utility-first styling approach.",
    content: "Tailwind CSS is a utility-first CSS framework that makes styling fast and efficient. Instead of writing custom CSS, you compose designs using utility classes.\n\nAdvantages:\n- Rapid development\n- Consistent design system\n- Small production bundle\n- Responsive design utilities\n- Dark mode support\n\nTailwind integrates perfectly with Next.js and helps maintain consistent styling across your application.",
    author: "Jane Smith",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
    published: true,
    createdAt: new Date('2024-02-20'),
  },
];

const sampleUsers = [
  {
    username: "johndoe",
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer passionate about Next.js and modern web technologies. Building amazing applications with React and MongoDB.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    website: "https://johndoe.example.com",
    createdAt: new Date('2023-01-01'),
  },
  {
    username: "janesmith",
    name: "Jane Smith",
    email: "jane@example.com",
    bio: "React enthusiast and UI/UX designer. Love creating beautiful and performant web applications.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    website: "https://janesmith.example.com",
    createdAt: new Date('2023-02-01'),
  },
  {
    username: "mikejohnson",
    name: "Mike Johnson",
    email: "mike@example.com",
    bio: "Backend developer specializing in MongoDB and API design. Always learning new technologies.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    website: "https://mikejohnson.example.com",
    createdAt: new Date('2023-03-01'),
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample posts
    const posts = await Post.insertMany(samplePosts);
    console.log(`✅ Created ${posts.length} blog posts`);

    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${users.length} users`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nYou can now:');
    console.log('- Visit /blog to see posts');
    console.log('- Visit /profile/johndoe to see a user profile');
    console.log('- Use the API at /api/posts');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();