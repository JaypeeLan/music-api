import "dotenv/config";

const config = {
  env: process.env.NODE_ENV!,
  port: process.env.PORT!,
  mongoURI: process.env.MONGODB_URI!,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  jwt: process.env.JWT_SECRET,
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export default config;
