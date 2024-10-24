import { createError } from "./error";

export const throwValidationError = (validation: Record<string, string>) => {
  throw createError("Validation failed", 400, validation);
};

export const throwAuthenticationError = (message = "Authentication failed") => {
  throw createError(message, 401);
};

export const throwNotFoundError = (resource = "Resource") => {
  throw createError(`${resource} not found`, 404);
};

export const throwPermissionError = (message = "Permission denied") => {
  throw createError(message, 403);
};

export const throwServerError = (message = "Internal server error") => {
  throw createError(message, 500);
};
