# Terra Music App

A music streaming application built with Node.js, Express, and MongoDB.

## Description

Terra Music App is a web application that allows users to stream music, create playlists, and manage their music library. The application features user authentication, music playback, playlist management, and more.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v18 or higher)
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/JaypeeLan/music-api
```

2. Navigate to the project directory

```bash
cd terra-music-app
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npx nodemon
```

The server will start running on `http://localhost:3000` (or your configured port).

## API Routes

### Authentication Routes

```
POST /api/auth/register - Register a new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
POST /api/auth/reset-password - Request password reset
POST /api/auth/reset-password/:token - Reset password
```

### User Routes

```
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
DELETE /api/users/profile - Delete user account
```

### Music Routes

```
GET /api/music/search - Search for tracks
GET /api/music/categories - Get all music categories
GET /api/music/new-releases - Get new album releases
GET /api/music/categories/:id - Get specific category by ID
GET /api/music/tracks/:id - Get specific track by ID
```

## Features

- User Authentication (Register, Login, Logout)
- Password Reset Functionality
- User Profile Management
- Music Search and Discovery
  - Track Search
  - Category Browsing
  - New Releases
  - Track Details
- Category Management
- Responsive Design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: nodemailer

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
```

## API Usage Examples

### Search Tracks

```bash
GET /api/music/search?q=song_name
```

### Get All Categories

```bash
GET /api/music/categories
```

### Get New Releases

```bash
GET /api/music/new-releases
```

### Get Category by ID

```bash
GET /api/music/categories/123
```

### Get Track by ID

```bash
GET /api/music/tracks/456
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
