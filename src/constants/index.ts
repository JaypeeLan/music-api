import { ObjectId } from "mongoose";

export interface User {
  id: string;
  userId: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tokens: string[];
  resetPasswordToken?: string;
  resetPasswordExpires?: Date | number;
  dateOfBirth: string;
  gender: "male" | "female" | "none";
}

export interface Playlist {
  id: string;
  name: string;
  userId: ObjectId;
  songs: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  coverArt: string;
}

export interface ApiError extends Error {
  statusCode: number;
  validation?: Record<string, string>;
}
