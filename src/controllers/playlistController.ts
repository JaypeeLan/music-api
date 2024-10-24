import { Request, Response, NextFunction } from "express";
import * as playlistService from "../services/playlistService";
import { User } from "../constants";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const createPlaylistHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, isPublic } = req.body;
    const playlist = await playlistService.createPlaylist(
      req.user!.userId,
      name,
      isPublic
    );
    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
};

export const getPlaylistHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const playlist = await playlistService.getPlaylist(
      req.params.id,
      req.user!.userId
    );
    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylistHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { playlistId, songId } = req.params;
    const playlist = await playlistService.addSongToPlaylist(
      playlistId,
      songId,
      req.user!.userId
    );
    res.json(playlist);
  } catch (error) {
    next(error);
  }
};
