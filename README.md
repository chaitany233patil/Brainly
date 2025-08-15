# 🧠 Brainly - The Second Brain

> Your digital second brain for capturing, organizing, and retrieving knowledge effortlessly.

[![GitHub license](https://img.shields.io/github/license/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/network)
[![GitHub issues](https://img.shields.io/github/issues/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/issues)

## 🌟 Overview

Brainly is a modern, intuitive second brain application designed to help you capture, organize, and retrieve information seamlessly. Inspired by the Building a Second Brain (BASB) methodology, this tool serves as your digital extension for knowledge management.

## ✨ Features

- 📝 **Note Management**: Create and organize notes
- 📝 **Youtube & Tweet**: Save important youtube video and Tweet with ease
- 🏷️ **Filtering**: Categorize and filter content with Filter Option
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 📤 **Share**: share your knowledge base with your freinds
- 🔍 **Smart Search**: Planned to implement Powerful search functionality to find information instantly

## 🚀 Demo

[Live Demo](https://brainly.chaitany.space)

### 🎥 Demo Video

<!-- Option 1: If you upload video to your repo -->
https://github.com/user-attachments/assets/your-video-file.mp4

<!-- Option 2: If you upload to YouTube -->
[![Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

<!-- Option 3: If you upload to another platform like Loom/Vimeo -->
[Watch Demo Video](https://www.loom.com/share/your-video-id)

## 🛠️ Technology Stack

- **Frontend**: Reactjs, Nextjs, Typescript
- **Backend**:  Node.js, Express,Typescript
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: Tailwind CSS, Framer-motion

## 📋 Prerequisites

### For Manual Installation
- [Node.js](https://nodejs.org/) (v20.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

### For Docker Installation
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## ⚡ Installation

### 🔧 Option 1: Manual Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitany233patil/Brainly.git
   cd Brainly
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create `.env` file in the backend directory:
   ```env
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

### 🐳 Option 2: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitany233patil/Brainly.git
   cd Brainly
   ```

2. **Set up environment variables**
   Edit the `.env` file with your Docker configuration:
   ```env
   DB_URL=mongodb://localhost:27017/brainly
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

3. **Start the application with Docker Compose**
   ```bash
   docker-compose up
   ```
   
   For background execution:
   ```bash
   docker-compose up -d
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Stop the application** (when needed)
   ```bash
   docker-compose down
   ```

### 🚀 Quick Start Commands

| Task | Manual | Docker |
|------|--------|--------|
| Install & Run Backend | `cd backend && npm install && npm run dev` | `docker-compose up` |
| Install & Run Frontend | `cd frontend && npm install && npm run dev` | Already included above |
| Run in Background | Run both in separate terminals | `docker-compose up -d` |
| Stop Application | `Ctrl+C` in both terminals | `docker-compose down` |
| View Logs | Terminal output | `docker-compose logs -f` |
| Rebuild | `npm install` in both directories | `docker-compose up --build` |

## 📁 Project Structure

```
Brainly/
├── backend/
│   └── src/    
│       ├── controllers/         
│       ├── models/               
│       ├── routes/               
│       ├── schemas/              
│       └── styles/               
├── frontend/            
    └──src/            
       └── components/             
       ├── hooks/              
       └── icons/
       └── pages/
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend port | `8080` |
| `DB_URL` | Database connection string | - |
| `JWT_SECRET` | JWT signing secret | - |

## 📞 Contact

**Chaitanya Patil** - [@PChaitanya529](https://x.com/PChaitanya529) - patilchaitany529@gmail.com

Project Link: [https://github.com/chaitany233patil/Brainly](https://github.com/chaitany233patil/Brainly)

## 💖 Support

If you found this project helpful, please give it a ⭐ star!

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/chaitany233patil">Chaitanya Patil</a>
</div>
