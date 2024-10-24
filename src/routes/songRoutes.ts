import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  createSongHandler,
  getSongsHandler,
  getSongByIdHandler,
} from "../controllers/songControllers";

const router = Router();

router.post("/", auth, createSongHandler);
router.get("/", getSongsHandler);
router.get("/:id", getSongByIdHandler);

export default router;
