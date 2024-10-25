import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { createError } from "../utils/error";
import config from "../config";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw createError("Authentication required", 401);
    }

    const decoded = jwt.verify(token, config.jwt || "") as { userId: string };

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      throw createError("Authentication required", 401);
    }

    // Set req.user with userId and token for the current request
    req.user = { userId: user.id, token };
    next();
  } catch (error) {
    next(createError("Authentication required", 401));
  }
};
