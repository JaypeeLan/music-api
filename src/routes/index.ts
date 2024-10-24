import { Router } from "express";
import authRoutes from "./authRoutes";
import songRoutes from "./songRoutes";
import playlistRoutes from "./playlistRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);

export default router;
