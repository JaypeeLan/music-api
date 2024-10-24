import { Song } from "../constants";
import { SongModel } from "../models/Song";
import { createError } from "../utils/error";

export const createSong = async (songData: Partial<Song>): Promise<Song> => {
  const song = new SongModel(songData);
  await song.save();
  return song;
};

export const getSongs = async (query: string = ""): Promise<Song[]> => {
  if (!query) {
    return SongModel.find().limit(50);
  }

  return SongModel.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { artist: { $regex: query, $options: "i" } },
      { album: { $regex: query, $options: "i" } },
    ],
  }).limit(50);
};

export const getSongById = async (id: string): Promise<Song> => {
  const song = await SongModel.findById(id);
  if (!song) {
    throw createError("Song not found", 404);
  }
  return song;
};
