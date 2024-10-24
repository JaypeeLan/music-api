import { Playlist } from "../constants";
import { PlaylistModel } from "../models/Playlist";
import { createError } from "../utils/error";

export const createPlaylist = async (
  userId: string,
  name: string,
  isPublic: boolean = false
): Promise<Playlist> => {
  const playlist = new PlaylistModel({
    userId,
    name,
    isPublic,
    songs: [],
  });
  await playlist.save();
  return playlist;
};

export const getPlaylist = async (
  id: string,
  userId: string
): Promise<Playlist> => {
  const playlist = await PlaylistModel.findById(id);
  if (!playlist) {
    throw createError("Playlist not found", 404);
  }

  if (!playlist.isPublic && playlist.userId.toString() !== userId) {
    throw createError("Access denied", 403);
  }

  return playlist;
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string,
  userId: string
): Promise<Playlist> => {
  const playlist = await PlaylistModel.findById(playlistId);
  if (!playlist) {
    throw createError("Playlist not found", 404);
  }

  if (playlist.userId.toString() !== userId) {
    throw createError("Access denied", 403);
  }

  // Use the string ObjectId for song reference
  if (!playlist.songs.includes(songId as any)) {
    playlist.songs.push(songId as any); // Casting to handle ObjectId correctly
    await playlist.save();
  }

  return playlist;
};
