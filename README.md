# Animatic.Ai 🎨

An AI-powered web animation creation platform that generates interactive p5.js animations from natural language descriptions. Built with React, TypeScript, and Google's Generative AI.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Animation Generation**: Create animations using natural language prompts
- **Real-time Live Preview**: See your animations come to life instantly
- **Interactive Code Editor**: Monaco Editor with syntax highlighting for HTML, CSS, and JavaScript
- **Resizable Panels**: Customizable workspace layout
- **Fullscreen Preview Mode**: Immersive animation viewing experience

### 🔐 Authentication
- **Multi-Provider OAuth**: Sign in with GitHub or Google
- **Email/Password Registration**: Traditional authentication
- **JWT Token Management**: Secure session handling
- **Protected Routes**: Secure access to animation editor

### 🎨 Animation Features
- **p5.js Integration**: Professional-grade animation library
- **Responsive Design**: Animations adapt to any screen size
- **Interactive Elements**: Mouse and touch support
- **Physics Simulation**: Gravity, bounce, easing, and more
- **Particle Systems**: Dynamic visual effects
- **Character Animation**: Human-like characters with personality

### 💾 Project Management
- **Download as ZIP**: Export your animations
- **File Management**: Organize HTML, CSS, and JS files
- **Code Tabs**: Switch between different file types seamlessly

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - Professional code editor
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe server development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing

### AI & External Services
- **Google Generative AI** - Animation code generation
- **GitHub OAuth** - Social authentication
- **Google OAuth** - Social authentication

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google AI API key
- GitHub OAuth credentials (optional)
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mayankjoshi670/Animatic.AI
   cd Animatic.Ai
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/animation-studio
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_API_KEY=your-google-ai-api-key
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (from backend directory)
   npm run dev
   
   # Start frontend server (from frontend directory)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Usage

### Creating Your First Animation

1. **Sign Up/Login**: Use OAuth or email registration
2. **Navigate to Editor**: Access the animation workspace
3. **Chat with AI**: Describe your animation in the chat panel
   - "Create a bouncing ball animation"
   - "Make a rotating 3D cube"
   - "Design a particle system"
4. **Preview**: Watch your animation come to life in real-time
5. **Customize**: Edit the generated code in the Monaco editor
6. **Export**: Download your animation as a ZIP file

### Example Prompts

- "Create a character that waves hello"
- "Make a sunset with moving clouds"
- "Design a loading spinner with particles"
- "Build a game with a bouncing ball"
- "Create a morphing shape animation"

## 🔧 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### POST `/api/auth/login`
Authenticate existing user.
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### GET `/api/auth/github`
Initiate GitHub OAuth flow.

#### GET `/api/auth/google`
Initiate Google OAuth flow.

### Animation Endpoints

#### POST `/api/animations/generate`
Generate animation code from prompt.
```json
{
  "prompt": "Create a bouncing ball animation"
}
```

Response:
```json
{
  "html": "<!DOCTYPE html>...",
  "js": "function setup() {...}",
  "manifest": {
    "type": "bouncing",
    "dimensions": [800, 600],
    "interactions": ["mouse"]
  }
}
```

#### POST `/api/animations/download-zip`
Download animation files as ZIP.
```json
{
  "html": "HTML content",
  "css": "CSS content", 
  "js": "JavaScript content"
}
```

## 🏗️ Project Structure

```
Animatic.Ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── passport.ts          # OAuth configuration
│   │   ├── controllers/
│   │   │   ├── animationController.ts
│   │   │   ├── authController.ts
│   │   │   └── downloadZip.ts
│   │   ├── models/
│   │   │   └── User.ts              # User schema
│   │   ├── routes/
│   │   │   ├── animationRoutes.ts
│   │   │   └── authRoute.ts
│   │   ├── services/
│   │   │   ├── llmService.ts        # AI integration
│   │   │   ├── parsr.ts            # Code parsing
│   │   │   └── userService.ts
│   │   └── index.ts                 # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.tsx            # Authentication UI
│   │   │   ├── ChatPanel.tsx       # AI chat interface
│   │   │   ├── CodeTabs.tsx        # File navigation
│   │   │   ├── Header.tsx          # App header
│   │   │   ├── LivePreview.tsx     # Animation preview
│   │   │   └── ResizablePane.tsx   # Layout management
│   │   ├── App.tsx                 # Main application
│   │   ├── defaultContent.ts       # Default animations
│   │   └── types.ts                # TypeScript definitions
│   └── package.json
└── README.md
```

## 🎨 Animation Examples

The platform can generate various types of animations:

- **Character Animations**: Human-like characters with personality
- **Particle Systems**: Dynamic visual effects
- **Physics Simulations**: Gravity, bounce, and motion
- **Interactive Games**: Clickable and responsive elements
- **Visual Effects**: Gradients, shadows, and lighting
- **3D Animations**: Rotating objects and perspective
- **Morphing Shapes**: Dynamic geometric transformations

## 🔒 Security Features

- **JWT Authentication**: Secure token-based sessions
- **Password Hashing**: bcryptjs for password security
- **OAuth Integration**: Secure social login
- **CORS Configuration**: Cross-origin request handling
- **Input Validation**: Server-side validation
- **Error Handling**: Graceful error management

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)
4. Set up OAuth redirect URLs

### Frontend Deployment
1. Update API endpoints in production
2. Build the application: `npm run build`
3. Deploy to static hosting (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **p5.js** - Creative coding library
- **Google Generative AI** - AI-powered code generation
- **Monaco Editor** - Professional code editing
- **React Community** - Amazing ecosystem

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example animations

---

**Made with ❤️ by the  Mayank Joshi ** 