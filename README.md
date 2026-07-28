# Chat Application MERN

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. Users can sign up, log in, search for other users, send private messages, and manage their profile with image uploads.

## Features

- User authentication with JWT and cookies
- Real-time messaging with Socket.IO
- Private conversations between users 
- User search and contact discovery
- Profile management with image upload support
- Responsive chat UI built with React and Tailwind CSS

## Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- Axios
- Tailwind CSS
- Socket.IO Client for ( End to End Encreption )

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cookie-based session handling
- Cloudinary for image uploads
- Socket.IO

## Project Structure

```text
client/          # React frontend
server/          # Express backend
```

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance
- Cloudinary account (for image uploads)

## Environment Variables

Create a `.env` file in the server folder with the following variables:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

## Running the Project

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend development server:

```bash
cd client
npm run dev
```

The frontend will typically run on http://localhost:5173 and the backend on http://localhost:5000.

## Usage

- Sign up for a new account
- Log in with your credentials
- Search for other users
- Start a conversation and send real-time messages
- Update your profile picture and details

## Notes

- The app uses cookies for authentication, so the frontend and backend must be configured to share the same origin or properly allow cross-origin credentials in production.
- Image upload support requires valid Cloudinary credentials.
