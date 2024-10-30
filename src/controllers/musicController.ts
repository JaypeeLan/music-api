import getAccessToken from "../services/musicService";
import { createError } from "../utils/error"; // Import custom error creator
import { Request, Response } from "express";

// Helper function to handle Spotify API requests
const handleSpotifyResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const message = errorData?.error?.message || "Spotify API Error";
    const statusCode = response.status;
    throw createError(message, statusCode);
  }
  return response.json();
};

export const searchTracks = async (req: Request, res: Response) => {
  let accessToken: string | null = null;
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        req.query.q as string
      )}&type=track&limit=20`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await handleSpotifyResponse(response);
    const tracks = data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[1]?.url,
      preview_url: track.preview_url,
    }));

    res.json(tracks);
  } catch (error: any) {
    console.error("Error searching tracks:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  let accessToken: string | null = null;
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await handleSpotifyResponse(response);
    const categories = data.categories.items.map((category: any) => ({
      id: category.id,
      name: category.name,
      href: category.href,
    }));

    res.json(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const getNewReleases = async (req: Request, res: Response) => {
  let accessToken: string | null = null;
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const response = await fetch(
      `https://api.spotify.com/v1/browse/new-releases?limit=20`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await handleSpotifyResponse(response);
    const newReleases = data.albums.items.map((album: any) => ({
      id: album.id,
      name: album.name,
      artist: album.artists[0].name,
      release_date: album.release_date,
      image: album.images[1]?.url,
    }));

    res.json(newReleases);
  } catch (error: any) {
    console.error("Error fetching new releases:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Get Category by ID
export const getCategoryById = async (req: any, res: any) => {
  let accessToken: string | null = null;
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const { id } = req.params;

    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const category = await response.json();
    res.json(category);
  } catch (error: any) {
    console.error("Error fetching new releases:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Get Track by ID
export const getTrackById = async (req: any, res: any) => {
  let accessToken: string | null = null;
  try {
    if (!accessToken) {
      accessToken = await getAccessToken();
    }

    const { id } = req.params;

    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const track = await response.json();
    res.json(track);
  } catch (error: any) {
    console.error("Error fetching new releases:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
