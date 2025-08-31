**CodeSensei - AI-Powered Coding Mentor & Talent Hub**
A revolutionary platform that bridges the gap between aspiring developers and tech companies through AI-powered code analysis, personalized learning paths, and intelligent talent matching.

🚀 **Features**
For Students:

🤖 AI-powered code analysis with detailed feedback

🎯 Personalized DSA learning roadmaps

💬 Live AI chatbot support for instant doubt resolution

📞 Voice call functionality for interactive learning

📊 Progress tracking and performance analytics

📚 Curated learning resources from top YouTube channels

🏆 Skill ranking and achievement system

**For Companies/HRs:**

👥 Talent discovery portal with advanced filtering

🔍 Search candidates by skills, scores, and universities

📈 Comprehensive candidate analytics and code assessment

⭐ Shortlisting and candidate management system

🎯 Smart matching based on company requirements

**Browser Extension:**

🌐 Integrates with LeetCode, HackerRank, and other coding platforms

⚡ One-click code analysis from any coding platform

🔄 Syncs with main platform for continuous learning tracking

🛠️ **Tech Stack
Frontend:**

React 18 with TypeScript

Tailwind CSS for styling

React Query for state management

Wouter for routing

Lucide React for icons

**Backend:**

Node.js with Express

PostgreSQL with Drizzle ORM

JWT authentication

AI code analysis algorithms

Browser Extension:

Chrome Extension Manifest V3

Content Scripts for platform integration

Modern CSS with animations

**APIs & Services:**

RESTful API architecture

ElevenLabs voice AI integration

YouTube Data API for resources

Custom AI analysis endpoints

📂 **Project Structure**
text
codesensei/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Custom middleware
│   │   └── utils/         # Utility functions
│   ├── shared/            # Shared schema definitions
│   └── package.json
├── extension/             # Chrome extension
│   ├── content.js         # Content scripts
│   ├── background.js      # Background service worker
│   ├── manifest.json      # Extension manifest
│   ├── styles/            # CSS styles
│   └── icons/             # Extension icons
└── README.md
⚙️ **Installation & Setup
Prerequisites**
Node.js 18.0 or higher

PostgreSQL 12+

npm or yarn package manager

1. Clone the repository
bash
git clone https://github.com/yourusername/codesensei.git
cd codesensei
2. Install dependencies
bash
# Install client dependencies
cd client
npm install

# Install server dependencies  
cd ../server
npm install

# Install extension dependencies (if any)
cd ../extension
npm install
3. Database Setup
bash
# Navigate to server directory
cd server

# Create database (ensure PostgreSQL is running)
createdb codesensei_db

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
4. Environment Configuration
Create .env files in both client and server directories:

server/.env:

env
DATABASE_URL=postgresql://username:password@localhost:5432/codesensei_db
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:3000
ELEVENLABS_API_KEY=your_elevenlabs_api_key
client/.env:

env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=CodeSensei
5. Run the application
bash
# Start backend server (from server directory)
npm run dev

# Start frontend client (from client directory)  
npm run dev

# The application will be available at http://localhost:3000
6. Load Browser Extension
bash
# Build the extension (from extension directory)
npm run build

# Load in Chrome:
# 1. Open chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select the extension directory
# 4. The extension will work on LeetCode, HackerRank, etc.
📖 Usage
For Students:
Sign up as a student and complete your profile

Solve problems in the integrated code editor

Get instant AI feedback on your solutions

Follow personalized learning paths based on your skill gaps

Use the AI chatbot for instant doubt resolution

Track your progress through analytics dashboard

Use the browser extension to analyze code on external platforms

For Companies/HRs:
Register your company profile

Access the Talent Hub to browse candidates

Filter students by skills, scores, and universities

View detailed analytics of candidate performance

Shortlist candidates for recruitment

Contact promising talent directly through the platform

Browser Extension:
Install the extension from Chrome Web Store

Navigate to LeetCode/HackerRank

Click "Analyze with CodeSensei" in the editor toolbar

View instant feedback without leaving the platform

Sync results with your main CodeSensei account

🧪 Tests
bash
# Run backend tests
cd server
npm test

# Run frontend tests  
cd client
npm test

# Run end-to-end tests (if configured)
npm run test:e2e
📸 Screenshots
https://via.placeholder.com/800x400/6366f1/ffffff?text=Student+Dashboard
Student dashboard with code analysis and learning roadmap

https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Talent+Hub+Portal
HR talent hub with candidate filtering and analytics

https://via.placeholder.com/800x400/10b981/ffffff?text=AI+Code+Analysis
Detailed code analysis with suggestions and scoring
