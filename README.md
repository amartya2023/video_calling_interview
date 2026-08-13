# Video Calling Interview Platform

A full-stack MERN application for conducting technical interviews with integrated video calling, code editor, and problem management features.

## Project Overview

This platform allows users to:
- Create and join interview sessions
- Conduct video calls with other participants
- Collaborate on code in real-time
- Execute and test code snippets
- Track recent sessions and interview history

## Tech Stack

### Frontend
- React with Vite
- Socket.io for real-time communication
- Stream API for video calling
- Axios for HTTP requests
- Clerk for authentication

### Backend
- Node.js with Express
- MongoDB for database
- Stream API for video infrastructure
- Inngest for event processing
- Clerk for authentication
- JDoodle and Piston for code execution

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd video_calling_interview
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

---

## Environment Variables

### Backend Setup (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DB_URL=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?appName=Cluster0

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Stream.io Video API
STREAM_API_KEY=xxxxxxxxxxxxxxxx
STREAM_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# JDoodle Code Execution API
JDOODLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JDOODLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Inngest Event Processing
INNGEST_EVENT_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
INNGEST_SIGNING_KEY=signkey-prod-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Backend Environment Variables Explanation

| Variable | Description | How to Get |
|----------|-------------|-----------|
| `PORT` | Server port number | Default: 3000 |
| `NODE_ENV` | Environment mode | Set to: `development`, `production`, or `test` |
| `CLIENT_URL` | Frontend URL for CORS | Local: `http://localhost:5173` |
| `DB_URL` | MongoDB connection string | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| `CLERK_PUBLISHABLE_KEY` | Clerk public authentication key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `CLERK_SECRET_KEY` | Clerk secret authentication key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `STREAM_API_KEY` | Stream.io API key for video | [Stream Dashboard](https://getstream.io/try-for-free/) |
| `STREAM_API_SECRET` | Stream.io secret key | [Stream Dashboard](https://getstream.io/try-for-free/) |
| `JDOODLE_CLIENT_ID` | JDoodle API client ID | [JDoodle](https://www.jdoodle.com/compiler-api) |
| `JDOODLE_CLIENT_SECRET` | JDoodle API secret | [JDoodle](https://www.jdoodle.com/compiler-api) |
| `INNGEST_EVENT_KEY` | Inngest event API key | [Inngest Dashboard](https://app.inngest.com) |
| `INNGEST_SIGNING_KEY` | Inngest signing key for webhook verification | [Inngest Dashboard](https://app.inngest.com) |

---

### Frontend Setup (.env)

Create a `.env` file in the `frontend/` directory with the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# API Configuration
VITE_API_URL=http://localhost:3000/api

# Stream.io Video API
VITE_STREAM_API_KEY=xxxxxxxxxxxxxxxx
```

#### Frontend Environment Variables Explanation

| Variable | Description | How to Get |
|----------|-------------|-----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk public authentication key (same as backend) | [Clerk Dashboard](https://dashboard.clerk.com) |
| `VITE_API_URL` | Backend API base URL | Local: `http://localhost:3000/api` |
| `VITE_STREAM_API_KEY` | Stream.io API key (same as backend) | [Stream Dashboard](https://getstream.io/try-for-free/) |

---

## Getting API Keys

### 1. **Clerk Authentication**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application
   - Copy the **Publishable Key** and **Secret Key**
   - Use them in both frontend and backend `.env` files

### 2. **MongoDB Atlas**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Create a database user
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<cluster-name>` in your connection string

### 3. **Stream.io**
   - Create an account at [Stream](https://getstream.io/try-for-free/)
   - Create an application
   - Copy the **API Key** and **API Secret**
   - Use them in both frontend and backend

### 4. **JDoodle**
   - Go to [JDoodle Compiler API](https://www.jdoodle.com/compiler-api)
   - Sign up for a free account
   - Copy your **Client ID** and **Client Secret**
   - Add to backend `.env`

### 5. **Inngest**
   - Sign up at [Inngest](https://app.inngest.com)
   - Create a new environment
   - Copy the **Event Key** and **Signing Key**
   - Add to backend `.env`

---

## Running the Application

### Development Mode

1. **Start the backend server** (from `backend/` directory):
   ```bash
   npm start
   # Server will run on http://localhost:3000
   ```

2. **Start the frontend development server** (from `frontend/` directory):
   ```bash
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

---

## Project Structure

```
video_calling_interview/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server setup
│   │   ├── controllers/           # Request handlers
│   │   ├── models/               # MongoDB schemas
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Custom middleware
│   │   └── lib/                  # Utility functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── components/           # Reusable components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── api/                  # API utilities
│   │   ├── lib/                  # Helper functions
│   │   └── data/                 # Static data
│   └── package.json
└── README.md
```

---

## Features

- ✅ User authentication with Clerk
- ✅ Create and manage interview sessions
- ✅ Real-time video and audio calling
- ✅ Collaborative code editor
- ✅ Code execution and testing
- ✅ Session history and analytics
- ✅ Real-time chat and communication

---

## Troubleshooting

### Database Connection Issues
- Verify your MongoDB connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure `DB_URL` is properly formatted

### API Key Issues
- Double-check that all API keys are copied correctly (no extra spaces)
- Verify that API keys match between frontend and backend where applicable
- Ensure keys are not expired in their respective dashboards

### CORS Issues
- Confirm `CLIENT_URL` in backend matches your frontend URL
- Check that frontend `VITE_API_URL` points to the correct backend

### Video Call Not Working
- Verify Stream.io credentials are correct
- Check that both frontend and backend have the same `STREAM_API_KEY`
- Ensure firewall allows WebRTC connections

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Interviewing! 🎥**
