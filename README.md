# 🧠 Brainly - The Second Brain

> Your digital second brain for capturing, organizing, and retrieving knowledge effortlessly.

[![GitHub license](https://img.shields.io/github/license/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/network)
[![GitHub issues](https://img.shields.io/github/issues/chaitany233patil/Brainly)](https://github.com/chaitany233patil/Brainly/issues)

## 🌟 Overview

Brainly is a modern, intuitive second brain application designed to help you capture, organize, and retrieve information seamlessly. Inspired by the Building a Second Brain (BASB) methodology, this tool serves as your digital extension for knowledge management and creative thinking.

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

- **Frontend**: [Add your frontend tech - e.g., Reactjs, Nextjs, Typescript]
- **Backend**: [Add your backend tech - e.g., Node.js, Express,Typescript]
- **Database**: [Add your database - e.g., MongoDB]
- **Authentication**: [Add auth method - e.g., JWT]
- **Styling**: [Add styling framework - e.g., Tailwind CSS, Framer-motion]
## 📋 Prerequisites

### For Manual Installation
- [Node.js](https://nodejs.org/) (v20.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Database system] (PostgreSQL/MySQL/MongoDB - if applicable)

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
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=development
   ```

4. **Initialize the database** (if applicable)
   ```bash
   npm run migrate
   # or
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### 🐳 Option 2: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitany233patil/Brainly.git
   cd Brainly
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your Docker configuration:
   ```env
   DATABASE_URL=postgresql://postgres:password@db:5432/brainly
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=development
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
   Navigate to `http://localhost:3000`

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

## 🎯 Usage

### Creating Your First Note
1. Click the "New Note" button
2. Add a title and start writing
3. Use tags to categorize your note
4. Save automatically as you type

### Linking Notes
- Use `[[Note Title]]` to create connections between notes
- Build your knowledge graph by linking related concepts
- Navigate through connections with the graph view

### Advanced Search
- Use the search bar to find notes by content, title, or tags
- Filter results by date, tags, or note type
- Save frequent searches for quick access

## 📁 Project Structure

```
Brainly/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── services/      # API services
│   └── styles/        # Stylesheets
├── public/            # Static assets
├── server/            # Backend code (if applicable)
├── tests/             # Test files
├── docs/              # Documentation
└── README.md
```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

For coverage reports:
```bash
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | Database connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `NODE_ENV` | Environment mode | `development` |

### Customization

You can customize the application by:
- Modifying themes in `src/styles/themes.js`
- Adding custom note templates in `src/templates/`
- Configuring search parameters in `src/config/search.js`

## 📖 API Documentation

### Authentication
```bash
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Notes
```bash
GET    /api/notes          # Get all notes
POST   /api/notes          # Create a note
GET    /api/notes/:id      # Get specific note
PUT    /api/notes/:id      # Update note
DELETE /api/notes/:id      # Delete note
```

For detailed API documentation, visit `/api/docs` when running the server.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment details

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and versions.

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Collaboration features
- [ ] AI-powered content suggestions
- [ ] Advanced analytics dashboard
- [ ] Integration with popular note-taking apps
- [ ] Voice note capabilities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Tiago Forte's "Building a Second Brain" methodology
- Thanks to all contributors and the open-source community
- Special thanks to [mention any specific libraries, tools, or people]

## 📞 Contact

**Chaitanya Patil** - [@your-twitter](https://twitter.com/your-twitter) - your.email@example.com

Project Link: [https://github.com/chaitany233patil/Brainly](https://github.com/chaitany233patil/Brainly)

## 💖 Support

If you found this project helpful, please give it a ⭐ star!

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/chaitany233patil">Chaitanya Patil</a>
</div>
