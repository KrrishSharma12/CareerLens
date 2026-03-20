# 🚀 CareerLens

An intelligent full-stack web application that analyzes resumes using AI and helps users prepare for interviews effectively. It evaluates how well a resume matches a job description and provides actionable insights like skill gaps, interview questions, and a personalized roadmap.

---

## 📌 Features

### 🔐 Authentication
- Secure login & registration using JWT
- Protected routes for authenticated users
- Token-based session management

### 📄 Resume Analysis
- Upload resume along with:
  - Job Description
  - Self Description
- AI evaluates resume relevance and quality

### 🤖 AI-Powered Insights
- Match Score (Resume vs Job Description)
- Skill Gap Analysis
- Behavioral Interview Questions
- Technical Interview Questions
- Personalized Learning Roadmap

### 📊 Interview Report
- Detailed AI-generated report
- Suggestions for improvement
- Structured insights for better preparation

### 📥 Resume Generator
- AI-enhanced resume generation
- Downloadable resume

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Context API
- SCSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### AI Integration
- Google Gemini API

### Authentication
- JSON Web Tokens (JWT)

---

## 📂 Project Structure

### Frontend
```
└── 📁Frontend
    └── 📁public
        ├── favicon.png
    └── 📁src
        └── 📁features
            └── 📁auth
                └── 📁components
                    ├── Navbar.jsx
                    ├── Protected.jsx
                └── 📁hooks
                    ├── useAuth.js
                └── 📁pages
                    ├── Login.jsx
                    ├── Register.jsx
                └── 📁services
                    ├── auth.api.js
                ├── auth.context.jsx
                ├── auth.form.scss
            └── 📁interview
                └── 📁hooks
                    ├── useInterview.jsx
                └── 📁pages
                    ├── Home.jsx
                    ├── Interview.jsx
                └── 📁services
                    ├── interview.api.js
                └── 📁style
                    ├── home.scss
                    ├── interview.scss
                ├── interview.context.jsx
        └── 📁style
            ├── button.scss
        ├── App.jsx
        ├── app.routes.jsx
        ├── main.jsx
        ├── style.scss
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```
### Backend
```
└── 📁Backend
    └── 📁src
        └── 📁config
            ├── database.js
        └── 📁controllers
            ├── auth.controller.js
            ├── interview.controller.js
        └── 📁middlewares
            ├── auth.middleware.js
            ├── file.middleware.js
        └── 📁models
            ├── blackList.model.js
            ├── interviewReport.model.js
            ├── user.model.js
        └── 📁routes
            ├── auth.routes.js
            ├── interview.routes.js
        └── 📁services
            ├── ai.service.js
        ├── app.js
    ├── .env
    ├── package-lock.json
    ├── package.json
    └── server.js
```


---

## ⚙️ Installation & Setup (Step-by-Step)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/KrrishSharma12/CareerLens.git
```

### 2️⃣🔧 Backend Setup
```bash
Install Dependencies
cd Backend
npm install
```
### 3️⃣Create .env file in Backend
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
```
### 4️⃣Run Backend Server
```bash
npm run dev
```

Server will run on:
👉 http://localhost:port

## 💻 Frontend Setup
```bash
Install Dependencies
cd Frontend
npm install
```
### 1️⃣Create .env file in Frontend
```bash
VITE_API_URL=http://localhost:5000
```

### 2️⃣Run Frontend
```bash
npm run dev
```

App will run on:
👉 http://localhost:5173

### 🔑 Environment Variables Explained
#### Backend .env

PORT	:    Server port
MONGO_URI	: MongoDB connection string
JWT_SECRET	: Secret key for JWT authentication
GEMINI_API_KEY	: API key for Google Gemini AI

#### Frontend .env
VITE_API_URL :	Backend API base URL