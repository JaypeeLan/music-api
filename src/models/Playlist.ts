import mongoose, { Schema } from "mongoose";
import { Playlist } from "../constants";

const playlistSchema = new Schema<Playlist>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PlaylistModel = mongoose.model<Playlist>(
  "Playlist",
  playlistSchema
);
