import { Router } from "express";
import {
  searchTracks,
  getCategories,
  getNewReleases,
  getCategoryById,
  getTrackById,
} from "../controllers/musicController";

const router = Router();

// Search Tracks
router.get("/search", searchTracks);

// Get Categories
router.get("/categories", getCategories);

// Get New Releases (Albums)
router.get("/new-releases", getNewReleases);

// Get Category by ID
router.get("/categories/:id", getCategoryById);

// Get Track by ID
router.get("/tracks/:id", getTrackById);

export default router;
