import { ApiError } from "../constants";

export const createError = (
  message: string,
  statusCode: number,
  validation?: Record<string, string>
): ApiError => ({
  name: "AppError",
  message,
  statusCode,
  validation,
});

export const ErrorTypes = {
  VALIDATION: "VALIDATION_ERROR",
  AUTHENTICATION: "AUTHENTICATION_ERROR",
  NOT_FOUND: "NOT_FOUND_ERROR",
  PERMISSION: "PERMISSION_ERROR",
  SERVER: "SERVER_ERROR",
} as const;
