import { Request, Response, NextFunction } from "express";

export const errorLogger = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    validation: err.validation,
    code: err.code,
    statusCode: err.statusCode,
    name: err.name,
  });
  next(err);
};
