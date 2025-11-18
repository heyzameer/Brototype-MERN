// lib/models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
  },
  image: {
    type: String,
    default: '/images/blog-default.jpg',
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model recompilation during development
export default mongoose.models.Post || mongoose.model('Post', PostSchema);