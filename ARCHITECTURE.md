# 🏗️ CV Creator Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER (Port 3000)                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  React Frontend                          │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  CVForm Component                                  │  │  │
│  │  │  - Personal Info Input                             │  │  │
│  │  │  - Professional Details                            │  │  │
│  │  │  - Form Validation                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                         ↓                                  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  CVPreview Component                               │  │  │
│  │  │  - Beautiful CV Template                           │  │  │
│  │  │  - Professional Styling                            │  │  │
│  │  │  - jsPDF/html2canvas Download                      │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  HTTP Client (Axios)                               │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           ↓ HTTP ↑
                    (CORS enabled)
                           ↓ HTTP ↑
┌─────────────────────────────────────────────────────────────────┐
│                   Node.js/Express Server                        │
│                      (Port 5000)                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Routes                                              │  │
│  │  POST /api/cv/generate          - Generate CV Content   │  │
│  │  POST /api/cv/cover-letter      - Generate Cover Letter│  │
│  │  GET  /api/health               - Health Check         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Controllers (cvController.js)                           │  │
│  │  - Request validation                                    │  │
│  │  - Call AI generator                                     │  │
│  │  - Format responses                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AI Generator (aiGenerator.js)                           │  │
│  │  - generateSummary()                                     │  │
│  │  - generateExperienceDescription()                       │  │
│  │  - generateSkillsContent()                               │  │
│  │  - generateCoverLetter()                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓                                        │
└─────────────────────────────────────────────────────────────────┘
                           ↓ API Call ↑
                    (Environment configured)
┌─────────────────────────────────────────────────────────────────┐
│              OpenAI/Claude API (External Service)               │
│                                                                  │
│  Receives: Job title, experience, skills, responsibilities     │
│  Returns: Professional CV content                              │
│  Powers: All content generation                                │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Form Submission Flow
```
User Input → CVForm → Validation → Axios POST → Backend API
```

### 2. AI Generation Flow
```
Backend receives → Controller validates → Calls aiGenerator 
→ OpenAI API → Returns content → Response to Frontend
```

### 3. PDF Export Flow
```
CV Preview → html2canvas (HTML→PNG) → jsPDF (PNG→PDF) 
→ Download file to user's computer
```

## Technology Stack by Layer

### Frontend Layer
```
React Components
    ↓
Tailwind CSS (Styling)
    ↓
Vite (Build Tool)
    ↓
Browser (Chrome, Firefox, Safari, Edge)
```

### Backend Layer
```
Express.js (HTTP Framework)
    ↓
Node.js (Runtime)
    ↓
OpenAI SDK (API Client)
    ↓
Dotenv (Config Management)
```

### Data Format (JSON)
```json
{
  "personal": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  },
  "summary": "string (AI generated)",
  "experience": {
    "jobTitle": "string",
    "company": "string",
    "description": "string (AI generated)"
  },
  "skills": ["string array (AI generated)"]
}
```

## Deployment Architecture

### Option 1: Separate Deployments
```
Frontend (Netlify/Vercel) ←→ Backend (Heroku/Railway)
     |                           |
     └─→ OpenAI API ←─────────────┘
```

### Option 2: Same Server (Future)
```
Server (AWS/DigitalOcean)
├── Frontend (React built to static)
├── Backend (Express serving frontend + API)
└── OpenAI API
```

## Security Considerations

```
User Browser (Frontend)
    ↓
    ├─ No sensitive data stored
    ├─ No API keys exposed
    └─ HTTPS for production

Backend Server (Private)
    ├─ API key in .env (never committed)
    ├─ Input validation on all routes
    ├─ CORS configured
    └─ Error handling without exposing internals

OpenAI API
    └─ Secured with API key authentication
```

## Performance Characteristics

- **Frontend Build**: < 5MB (Vite optimized)
- **Backend Response**: 2-5 seconds (AI processing)
- **PDF Generation**: < 1 second (client-side)
- **Page Load**: < 2 seconds (Vite optimized)

## Scalability Path

```
Current (Single Server)
    ↓
Phase 1: Database (MongoDB/Firebase) for saving CVs
    ↓
Phase 2: Caching (Redis) for faster responses
    ↓
Phase 3: Load Balancer for multiple backend instances
    ↓
Phase 4: Content Delivery Network (CDN) for frontend
```

---

This architecture provides a clean separation of concerns with the React frontend handling UI, Express backend handling business logic, and OpenAI API providing intelligent content generation.
