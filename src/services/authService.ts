import { User } from "../constants";
import { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error";
import nodemailer from "nodemailer";
import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "24h";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const generateToken = (userId: string): string => {
  try {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  } catch (error) {
    throw createError("Error generating token", 500);
  }
};

const validateUserInput = (userData: Partial<User>) => {
  const { email, password, username, dateOfBirth, gender } = userData;
  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  if (!dateOfBirth) errors.dob = "Date of Birth is required";
  if (!gender) errors.gender = "Gender is required";
  if (!username) errors.username = "Username is required";
  if (password && password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (Object.keys(errors).length > 0) {
    throw createError("Validation failed", 400, errors);
  }
};

export const register = async (
  userData: Partial<User>
): Promise<{
  message: string;
  user: { username: string; email: string };
  token: string;
}> => {
  try {
    validateUserInput(userData);
    const { email, password, username } = userData;

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw createError(
        "User already exists",
        409,
        existingUser.email === email
          ? { email: "Email already in use" }
          : { username: "Username taken" }
      );
    }

    const hashedPassword = await bcrypt.hash(password!, 10);

    // Initialize user with empty tokens array
    const user = await UserModel.create({
      ...userData,
      password: hashedPassword,
      tokens: [],
    });

    const token = generateToken(user.id);

    // Update user with the new token
    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { tokens: token } },
      { new: true }
    );

    return {
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw createError(
        error.message,
        "statusCode" in error ? (error as any).statusCode : 500
      );
    }
    throw createError("Error during registration", 500);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<{
  message: string;
  user: { username: string; email: string };
  token: string;
}> => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createError("Invalid credentials", 401);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError("Invalid credentials", 401);
    }

    const token = generateToken(user.id);

    // Initialize tokens array if it doesn't exist
    if (!Array.isArray(user.tokens)) {
      user.tokens = [];
    }

    // Update user with the new token
    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { tokens: token } },
      { new: true }
    );

    return {
      message: "Login successful",
      user: { username: user.username, email: user.email },
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw createError(
        error.message,
        "statusCode" in error ? (error as any).statusCode : 500
      );
    }
    throw createError("Error during login", 500);
  }
};

export const logout = async (userId: string, token: string): Promise<void> => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw createError("User not found", 404);
    }

    // Initialize tokens array if it doesn't exist
    if (!Array.isArray(user.tokens)) {
      user.tokens = [];
    }

    // Update user by removing the token
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { tokens: token } },
      { new: true }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw createError(
        error.message,
        "statusCode" in error ? (error as any).statusCode : 500
      );
    }
    throw createError("Error during logout", 500);
  }
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createError("User with this email does not exist", 404);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);

    await UserModel.findByIdAndUpdate(user.id, {
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: Date.now() + 3600000,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>`,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw createError(
        error.message,
        "statusCode" in error ? (error as any).statusCode : 500
      );
    }
    throw createError("Error requesting password reset", 500);
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    const user = await UserModel.findOne({
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user || !user.resetPasswordToken) {
      throw createError("Invalid or expired password reset token", 400);
    }

    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      throw createError("Invalid or expired password reset token", 400);
    }

    if (newPassword.length < 8) {
      throw createError("Password too short", 400, {
        password: "Password must be at least 8 characters long",
      });
    }

    await UserModel.findByIdAndUpdate(user.id, {
      password: await bcrypt.hash(newPassword, 10),
      $unset: {
        resetPasswordToken: 1,
        resetPasswordExpires: 1,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw createError(
        error.message,
        "statusCode" in error ? (error as any).statusCode : 500
      );
    }
    throw createError("Error resetting password", 500);
  }
};
