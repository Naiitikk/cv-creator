# 🚀 Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- OpenAI API Key (get from https://platform.openai.com/api-keys)

## Step 1: Set up OpenAI API Key

1. Get your API key from OpenAI
2. Create `.env` file in `backend/` folder:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Edit `backend/.env` and paste your API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   PORT=5000
   ```

## Step 2: Start Backend Server

```bash
cd backend
npm start
```

You should see: `Server running on http://localhost:5000`

## Step 3: Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Browser should open automatically to `http://localhost:3000`

## Step 4: Test the Application

1. Fill in your information:
   - Your name, email, phone
   - Job title and years of experience
   - Company name (optional)
   - Responsibilities and achievements

2. Click "Generate Professional CV"

3. Wait for AI to generate content

4. Review your CV

5. Click "📥 Download CV as PDF" to get your CV

## Troubleshooting

### Port Already in Use
If port 3000 or 5000 is busy:
```bash
# For backend (change port in backend/.env)
# For frontend (Vite will ask to use next available port)
```

### API Key Error
- Check your API key is correctly copied in `.env`
- Verify you have API credits on OpenAI
- Make sure `.env` is in the `backend/` folder (not `.env.example`)

### Dependencies Not Installed
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Can't Connect to Backend
- Check backend is running on http://localhost:5000
- Test: Visit http://localhost:5000/api/health in browser
- Should show: `{"status":"Server is running"}`

## Build for Production

```bash
# Frontend build
cd frontend
npm run build

# The 'dist' folder contains production files
```

## What's Happening Behind the Scenes

1. You fill the form with basic info
2. Frontend sends data to Backend API
3. Backend uses OpenAI API to generate:
   - Professional summary
   - Experience descriptions with impact metrics
   - Relevant skills list
4. Frontend receives generated content
5. Beautiful CV preview is displayed
6. Download as PDF using jsPDF + html2canvas

---

**Need help?** Check the main README.md for detailed documentation.
