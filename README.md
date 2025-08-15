# 🧠 Brainly - The Second Brain

> Your digital second brain for capturing, organizing, and retrieving knowledge effortlessly.

[![GitHub license](https://img.shields.io/github/license/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/network)
[![GitHub issues](https://img.shields.io/github/issues/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/issues)

## 🌟 Overview

Brainly is a modern, intuitive second brain application designed to help you capture, organize, and retrieve information seamlessly. Inspired by the Building a Second Brain (BASB) methodology, this tool serves as your digital extension for knowledge management.

## ✨ Features

- 📝 **Note Management**: Create, edit, and organize notes
- 📝 **Youtube & Tweet**: Save important youtube video and Tweet with ease
- 🏷️ **Filtering**: Categorize and filter content with Filter Option
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- 📤 **Share**: share your knowledge base with your freinds
- 🔍 **Smart Search**:Planed to implement Powerful search functionality to find information instantly

## 🚀 Demo

[Live Demo](https://brainly.chaitany.space) | [Screenshots](#screenshots)

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
- [Database system] MongoDB 

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

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   Edit the `.env` file with your configuration:
   ```env
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=8080
   ```

5. **Start the development server**
   ```bash
   cd backend
   npm run dev
   cd frontend
   npm run dev
   ```

6. **Open your browser**
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
| Install & Run | `npm install && npm run dev` | `docker-compose up` |
| Run in Background | `npm run dev &` | `docker-compose up -d` |
| Stop Application | `Ctrl+C` | `docker-compose down` |
| View Logs | Terminal output | `docker-compose logs -f` |
| Rebuild | `npm install` | `docker-compose up --build` |

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
       └── icons
       └── pages
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | backend port | `8080` |
| `PORT` | frontend port | `5173` |
| `DB_URL` | Database connection string | - |
| `JWT_SECRET` | JWT signing secret | - |

## 📞 Contact

**Chaitanya Patil** - [@your-twitter](https://x.com/PChaitanya529) - patilchaitany529@gmail.com

Project Link: [https://github.com/chaitany233patil/Brainly](https://github.com/chaitany233patil/Brainly)

## 💖 Support

If you found this project helpful, please give it a ⭐ star!

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/chaitany233patil">Chaitanya Patil</a>
</div>
