import mongoose, { Schema } from "mongoose";
import { Song } from "../constants";

const songSchema = new Schema<Song>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  duration: { type: Number, required: true },
  url: { type: String, required: true },
  coverArt: { type: String, required: true },
});

export const SongModel = mongoose.model<Song>("Song", songSchema);
