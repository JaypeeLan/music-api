import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import { asyncHandler } from "../middleware/errorHandler";
import {
  throwValidationError,
  throwAuthenticationError,
} from "../utils/errorUtils";

interface AuthenticatedRequest extends Request {
  user?: any;
}

interface RegisterBody {
  email: string;
  password: string;
  username: string;
  dateOfBirth: string;
  gender: "male" | "female" | "none";
}

interface LoginBody {
  email: string;
  username: string;
  password: string;
}

// Validation helpers
const validateRegisterInput = (body: RegisterBody) => {
  const errors: Record<string, string> = {};

  if (!body.email) errors.email = "Email is required";
  if (!body.password) errors.password = "Password is required";
  if (!body.username) errors.name = "username is required";
  if (!body.dateOfBirth) errors.dob = "Date of Birth is required";
  if (!body.gender) errors.gender = "Gender is required";

  if (Object.keys(errors).length > 0) {
    throwValidationError(errors);
  }
};

const validateLoginInput = (body: LoginBody) => {
  const errors: Record<string, string> = {};

  if (!body.email) errors.email = "Email is required";
  if (!body.password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    throwValidationError(errors);
  }
};

// Controllers
export const register = asyncHandler(async (req: Request, res: Response) => {
  validateRegisterInput(req.body);
  const { user, token } = await authService.register(req.body);
  res.status(201).json({ user, token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  validateLoginInput(req.body);
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  res.json({ user, token });
});

export const logout = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throwAuthenticationError("No authentication token provided");
    }

    if (!req?.user) {
      throwAuthenticationError("User not authenticated");
    }

    if (req.user && token) await authService.logout(req.user.userId);
    res.json({ message: "Logged out successfully" });
  }
);

export const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      throwValidationError({ email: "Email is required" });
    }

    await authService.requestPasswordReset(email);
    res.json({ message: "Password reset link sent" });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throwValidationError({
        token: !token ? "Reset token is required" : "",
        newPassword: !newPassword ? "New password is required" : "",
      });
    }

    await authService.resetPassword(token, newPassword);
    res.json({ message: "Password reset successful" });
  }
);
