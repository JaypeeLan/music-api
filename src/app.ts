import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import routes from "./routes";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { errorLogger } from "./middleware/errorLogger";
import helmet from "helmet";
import SpotifyWebApi from "spotify-web-api-node";
import {
  searchMusics,
  searchAlbums,
  searchPlaylists,
  getSuggestions,
  listMusicsFromAlbum,
  listMusicsFromPlaylist,
  searchArtists,
  getArtist,
} from "node-youtube-music";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

app.use(notFoundHandler);

app.use(errorLogger);

// Error handling (should be last middleware)
app.use(errorHandler);

// Database connection
connectDB().then(() => {
  console.log("Database connected");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
