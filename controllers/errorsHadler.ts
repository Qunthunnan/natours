import { AppError } from '../utils/AppError';
import { ModifiedRequest } from '../types/types';
import { Response, NextFunction } from 'express';

export function errorHandler(
  error: AppError,
  request: ModifiedRequest,
  response: Response,
  next: NextFunction,
) {
  const requestStatusCode = error.statusCode || 500;
  const requestStatus = error.status || 'error';

  response.status(requestStatusCode).json({
    status: requestStatus,
    message: error.message,
  });
}

export function unknownRouteError(
  request: ModifiedRequest,
  response: Response,
  next: NextFunction,
) {
  const unknownError = new AppError(
    `This route ${request.path} not found`,
    404,
  );
  next(unknownError);
}
