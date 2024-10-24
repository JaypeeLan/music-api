import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createPlaylistHandler,
  getPlaylistHandler,
  addSongToPlaylistHandler,
} from "../controllers/playlistController";

const router = Router();

router.post("/", auth, createPlaylistHandler);
router.get("/:id", auth, getPlaylistHandler);
router.post("/:playlistId/songs/:songId", auth, addSongToPlaylistHandler);

export default router;
