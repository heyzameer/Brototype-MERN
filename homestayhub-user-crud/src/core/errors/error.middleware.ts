import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from '../config/env.js';

// Define a general error structure
interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

/**
 * Global error handling middleware.
 */
export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction // required even if unused, for Express to recognize it as error middleware
) => {
  const statusCode = err.statusCode || 500;
  
  // Log the error stack in development mode
  if (NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    message: err.message || 'An unknown error occurred.',
    // Only send stack trace in development
    stack: NODE_ENV === 'development' ? err.stack : undefined, 
  });
};