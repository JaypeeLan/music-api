import { Request, Response, NextFunction } from "express";
import * as songService from "../services/songService";

export const createSongHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await songService.createSong(req.body);
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

export const getSongsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query.q as string;
    const songs = await songService.getSongs(query);
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getSongByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const song = await songService.getSongById(req.params.id);
    res.json(song);
  } catch (error) {
    next(error);
  }
};
