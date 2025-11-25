import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/env.js';

/**
 * Connects to the MongoDB database using the URI from environment variables.
 */
export async function connectDB(): Promise<void> {
  try {
    // Set up Mongoose options
    await mongoose.connect(MONGODB_URI);
    
    // Optional: Log successful connection details
    // console.log(`MongoDB connected to: ${mongoose.connection.host}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`DB connection failed: ${err.message}`);
    // Re-throw or exit process to ensure server doesn't start without DB
    throw new Error('Database connection failed. Check MONGODB_URI.');
  }
}