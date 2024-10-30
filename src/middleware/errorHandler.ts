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

  // Handle specific error types
  if ("statusCode" in err) {
    statusCode = err.statusCode;
    message = err.message;
    validation = err.validation;
  } else if (err instanceof Error) {
    message = err.message;
  }

  // MongoDB duplicate key error (code 11000)
  if ((err as any).code === 11000) {
    statusCode = 400;
    const duplicatedField = Object.keys((err as any).keyValue)[0];
    message = `${duplicatedField} already exists`;
    validation = { [duplicatedField]: message };
  }

  // Handle other specific error names
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

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.name = "NotFoundError";
  res.status(404);
  next(error);
};
