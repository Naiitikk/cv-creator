# CV Creator - Deployment Guide

## Quick Deployment on Render (Recommended)

### Prerequisites
1. GitHub account with your code pushed
2. Render account (free at https://render.com)
3. OpenAI/Anthropic/Groq API key

### Step 1: Push Code to GitHub
```bash
cd /path/to/your/CV Creater
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cv-creator.git
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cv-creator-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Instance Type**: Free
5. Add Environment Variables:
   - `OPENAI_API_KEY`: Your OpenAI key
   - `ANTHROPIC_API_KEY`: (if using Claude)
   - `GROQ_API_KEY`: (if using Groq)
6. Deploy!

**Backend URL**: Copy the URL (e.g., `https://cv-creator-backend.onrender.com`)

### Step 3: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure:
   - **Name**: `cv-creator-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://cv-creator-backend.onrender.com` (from Step 2)
5. Deploy!

### Step 4: Update Frontend API URL

Edit `frontend/src/components/CVForm.jsx` and anywhere you make API calls:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Use: ${API_URL}/api/cv/generate
```

### Alternative: Vercel (Frontend Only) + Railway (Backend)

#### Frontend on Vercel:
1. Go to https://vercel.com and sign up with GitHub
2. Import your repository
3. Framework: Vite
4. Root Directory: `frontend`
5. Build Command: `npm run build`
6. Environment Variables: `VITE_API_URL=<railway-backend-url>`

#### Backend on Railway:
1. Go to https://railway.app
2. New Project → GitHub repo
3. Configure:
   - Root Directory: `backend`
   - Start Command: `npm start`
4. Add environment variables for your API keys
5. Get the backend URL from Railway dashboard

---

## Environment Variables Needed

### Backend (.env file)
```
PORT=5000
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=...
CORS_ORIGIN=https://your-frontend-url.com
```

### Frontend (.env or vite auto-detect)
```
VITE_API_URL=https://your-backend-url.com
```

---

## Troubleshooting

### Backend not connecting
- Check if `CORS_ORIGIN` includes your frontend URL
- Add `https://your-frontend-url.com` to CORS in `backend/server.js`

### API key errors
- Verify keys are correct in environment variables
- Check API key has proper permissions
- Ensure key isn't expired

### Build fails
- Check Node version (use 18+)
- Clear cache and rebuild
- Check for missing dependencies

---

## Cost Estimates

| Platform | Cost |
|----------|------|
| **Render** | Free tier (limited) or $7-25/month |
| **Vercel** | Free for frontend |
| **Railway** | Free tier or pay-as-you-go (~$5-20/month) |
| **AWS/GCP** | Free tier or ~$10-50/month |

---

## Next Steps

1. Choose your hosting platform
2. Follow the setup steps above
3. Test the deployed application
4. Custom domain setup (optional, $12-15/year)

Need help? Ask me for specific deployment steps!
