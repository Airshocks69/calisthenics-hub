import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error({
    status: statusCode,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  res.status(statusCode).json({
    error: {
      message,
      code: err.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { details: err.details }),
    },
  });
};

// Custom error class
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string = 'APP_ERROR',
    public details?: any
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
