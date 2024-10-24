import { Request, Response, NextFunction } from "express";
import { ApiError } from "../constants";
import config from "../config";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  let statusCode = 500;
  let message = "Internal Server Error";
  let validation: Record<string, string> | undefined;

  // If it's our custom ApiError
  if ("statusCode" in err) {
    statusCode = err.statusCode;
    message = err.message;
    validation = err.validation;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // Handle specific error types
  switch (err.name) {
    case "ValidationError": // Mongoose validation error
      statusCode = 400;
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token";
      break;
    case "TokenExpiredError":
      statusCode = 401;
      message = "Token expired";
      break;
  }

  // Development vs Production error response
  if (config.env === "development") {
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        stack: err.stack,
        validation,
        type: err.name,
      },
    });
  } else {
    // Production: don't leak error details
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        validation,
        type: err.name,
      },
    });
  }
};

// Async handler wrapper to avoid try-catch blocks in routes
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Not Found Error Handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
