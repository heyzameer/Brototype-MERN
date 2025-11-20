import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/lib/models/Post';

// GET - Fetch all posts
export async function GET(request) {
  try {
    await connectDB();
    
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch posts',
    }, { status: 500 });
  }
}

// POST - Create a new post
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.slug || !body.content || !body.author) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, slug, content, author',
      }, { status: 400 });
    }

    // Create new post
    const post = await Post.create({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || body.content.substring(0, 150) + '...',
      content: body.content,
      author: body.author,
      image: body.image || '/images/blog-default.jpg',
    });

    return NextResponse.json({
      success: true,
      data: post,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'A post with this slug already exists',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create post',
    }, { status: 500 });
  }
}