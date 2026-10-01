import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let responseBody: any = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
    },
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    responseBody.error = {
      code: err.code,
      message: err.message,
    };
  } else if (err instanceof ZodError) {
    statusCode = 400;
    responseBody.error = {
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: err.issues,
    };
  } else {
    // Log unexpected errors
    console.error('Unhandled Error:', err);
  }

  // Never leak internal details in production
  if (process.env.NODE_ENV !== 'production' && !(err instanceof AppError) && !(err instanceof ZodError)) {
    responseBody.error.details = err.stack;
  }

  res.status(statusCode).json(responseBody);
};

