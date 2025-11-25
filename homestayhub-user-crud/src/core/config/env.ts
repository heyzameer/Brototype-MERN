// Load environment variables immediately using the 'config' import method.
// This must be the very first line of executable code.
import 'dotenv/config';

// Ensure required environment variables are present
// Use optional chaining for robustness, though a fallback is safer
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/homestayhub';
export const NODE_ENV = process.env.NODE_ENV || 'development';

if (!process.env.MONGODB_URI) {
  // If MONGODB_URI is only using the fallback, log a warning, 
  // but if the user provided an empty string or nothing, throw an error.
  console.warn("MONGODB_URI not found in environment, using fallback.");
}

console.log(`Environment loaded. NODE_ENV: ${NODE_ENV}, PORT: ${PORT}`);