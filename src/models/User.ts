import mongoose, { Schema } from "mongoose";
import { User } from "../constants";

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  tokens: { type: [String], default: [] },
});

export const UserModel = mongoose.model<User>("User", userSchema);
