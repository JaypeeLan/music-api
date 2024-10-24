import { Router } from "express";
import authRoutes from "./authRoutes";
import songRoutes from "./songRoutes";
import playlistRoutes from "./playlistRoutes";
import musicRoutes from "./musicRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/songs", songRoutes);
router.use("/playlists", playlistRoutes);
router.use("/music", musicRoutes);

export default router;
