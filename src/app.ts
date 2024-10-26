import express from "express";
import cors from "cors";
import { connectDB } from "./config/database";
import routes from "./routes";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import helmet from "helmet";
import "dotenv/config";
import config from "./config";

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

// Error handling (should be last middleware)
app.use(errorHandler);

// Database connection
connectDB().then(() => {
  console.log("Database connected");
});

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
