import { Request, Response, NextFunction } from 'express';
import { NODE_ENV } from '../config/env.js';

interface CustomError extends Error {
  statusCode?: number;
  data?: any;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  if (NODE_ENV === 'development') {
    console.error("🔥 Error:", err);
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    statusCode,
    data: err.data || null,
    // stack: NODE_ENV === "development" ? err.stack : undefined
  });
};
