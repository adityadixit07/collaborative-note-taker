# Real-time Collaborative Note Taking App 📝

A real-time collaborative note-taking application with live editing, user presence, and workspace sharing built using Node.js, WebSocket, React and MongoDB.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

- **Real-time Collaboration**

  - Live multi-user editing
  - Cursor presence tracking
  - User typing indicators
  - Real-time updates

- **Workspace Management**

  - Create personal and shared workspaces
  - Organize notes into collections
  - Control access permissions
  - Share notes and folders

- **User System**

  - Secure authentication
  - User profiles
  - Email notifications
  - Activity tracking

- **Rich Editing Features**
  - Markdown support
  - Version history
  - File attachments
  - Comments and mentions

## 🚀 Quick Start

### Prerequisites

- Node.js >= 14.x
- MongoDB >= 4.x
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/realtime-notes-app.git
cd realtime-notes-app
```

2. Install dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Configure environment variables

```bash
# In server directory
cp .env.example .env

# Edit .env with your settings
nano .env
```

4. Start development servers

```bash
# Start backend server
cd server
npm run dev

# Start frontend in new terminal
cd client
npm start
```

The app should now be running on `http://localhost:3000` 🎉

## 🛠️ Tech Stack

- **Frontend**

  - React.js
  - Socket.io-client
  - TailwindCSS
  - React Router

- **Backend**
  - Node.js
  - Express
  - Socket.io
  - MongoDB
  - JWT Authentication

## 📖 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
GET  /api/auth/me         # Get current user
```

### Notes Endpoints

```bash
GET    /api/notes         # Get user's notes
POST   /api/notes         # Create new note
GET    /api/notes/:id     # Get specific note
PUT    /api/notes/:id     # Update note
DELETE /api/notes/:id     # Delete note
```

### Workspace Endpoints

```bash
GET    /api/workspaces    # Get user's workspaces
POST   /api/workspaces    # Create workspace
PUT    /api/workspaces/:id/invite  # Invite users
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/notes-app

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT used for authentication
- Input validation on all endpoints
- CORS enabled
- Rate limiting implemented
- WebSocket connections authenticated

## 📱 Responsive Design

The app is fully responsive and works on:

- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop browsers

## ⚙️ Development

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📈 Future Improvements

- [ ] Implement rich text editor
- [ ] Add file upload support
- [ ] Enable offline mode
- [ ] Add search functionality
- [ ] Implement teams feature
