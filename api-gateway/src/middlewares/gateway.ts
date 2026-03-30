import { Request, Response, NextFunction } from 'express';

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  console.log(`[${timestamp}] ${method} ${path}`);
  next();
};

/**
 * Error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);
  const statusCode = err.message.includes('ECONNREFUSED') ? 503 : 500;

  res.status(statusCode).json({
    success: false,
    message: 'Gateway Error',
    error: err.message,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Not found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
  });
};

/**
 * Request validation middleware
 */
export const validateServiceHealth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Add service health check logic here if needed
  next();
};
