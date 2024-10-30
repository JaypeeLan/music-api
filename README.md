# Playlist Management API

A RESTful API built with Node.js, Express, and TypeScript that allows users to create and manage playlists with song previews powered by the Spotify API.

## Features

- User authentication and authorization
- Create and manage personal playlists
- Add songs with 30-second previews via Spotify API integration
- Secure endpoints with JWT authentication
- TypeScript for enhanced type safety and development experience

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Spotify Developer Account and API credentials

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JaypeeLan/music-api.git
cd music-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

4. Build the TypeScript code:

```bash
npm run build
```

5. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Playlists

- `GET /api/playlists` - Get all playlists for authenticated user
- `GET /api/playlists/:id` - Get specific playlist
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist

### Songs

- `GET /api/songs` - Search songs via Spotify API
- `POST /api/playlists/:id/songs` - Add song to playlist

## Request Examples

### Register a new user

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user@example.com",
    "password": "securepassword",
    "name" : "name",
    "dateOfBirth": "10/20/2000",
    "email" : "email@example.com"
  }'
```

### Create a new playlist

```bash
curl -X POST http://localhost:3000/api/playlists \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Awesome Playlist",
    "description": "A collection of my favorite songs"
  }'
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

1. Run in development mode:

```bash
npm run dev
```

2. Run tests:

```bash
npm test
```

3. Lint code:

```bash
npm run lint
```

## Security

- All endpoints (except registration and login) require JWT authentication
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive data
- Rate limiting is implemented to prevent abuse

## Acknowledgments

- Built with Express.js and TypeScript
- Spotify API for song previews
- MongoDB for data storage
