**PROJECT TITLE :**
**CodeSensei - AI-Powered Coding Mentor & Talent Hub**

**Overview**
A revolutionary platform that bridges the gap between aspiring developers and tech companies through AI-powered code analysis, personalized learning paths, and intelligent talent matching.

**Installation & Setup
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

🤖 **Model & Data**
Primary Model: Open AI API - GPT-4 , Eleven labs.

Source: Eleven Labs, open AI, Trilio

License:  Apache 2.0 ✅

Purpose: Code Analyzation

Training/Example Data: Self data

Note: Please check the specific license for any use restrictions.

⚠️ **Known Limitations & Risks**
Bias: This model may reflect biases present in its training data, potentially leading to [e.g., unfair outcomes for certain demographics].

Scope: Performance may degrade on data that is highly different from the training corpus (e.g., different domains, languages, or formats).

Accuracy: Current evaluation metrics show an F1-score of [X]%. It should not be used for high-stakes decision-making without further validation.

Computational Requirements: Inference requires a GPU for optimal performance.


📖 **Usage**
**For Students:**
Sign up as a student and complete your profile

Solve problems in the integrated code editor

Get instant AI feedback on your solutions

Follow personalized learning paths based on your skill gaps

Use the AI chatbot for instant doubt resolution

Track your progress through analytics dashboard

Use the browser extension to analyze code on external platforms

**For Companies/HRs:**
Register your company profile

Access the Talent Hub to browse candidates

Filter students by skills, scores, and universities

View detailed analytics of candidate performance

Shortlist candidates for recruitment

Contact promising talent directly through the platform

👥 **Team & Contact**
Name	Role	Contact
Team Member 1 : Yashwanth Parichha   , Role: Full stack developer	, Github : https://github.com/3Yashwanth, Email : 90yashwanth@gmail.com
Team Member 2 : Pranshu Dev   , Role: AI  Automation and LLM	, Github : https://github.com/TechAltruist, Email : pransai.verse@gmail.com


