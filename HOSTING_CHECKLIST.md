# 🚀 Hosting Checklist - CV Creator

## Pre-Deployment Checklist

### Code Preparation
- [ ] Push code to GitHub (create repo if needed)
- [ ] Update `.gitignore` with `.env` files
- [ ] Test locally: `backend: npm start` and `frontend: npm run dev`
- [ ] Verify API calls work with backend URL

### Environment Variables

#### Backend (Render/Railway)
- [ ] Set `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- [ ] Set `FRONTEND_URL` to your deployed frontend URL
- [ ] Set `PORT` (usually handled automatically)

#### Frontend (Vercel/Render)
- [ ] Set `VITE_API_URL` to your backend URL

### Build Configuration
- [ ] Frontend builds: `npm run build` produces `dist/` folder
- [ ] Backend has `npm start` command in `package.json`

---

## Recommended Hosting Setup

### ✅ **Option 1: Render (Easiest)**
**Time: ~10 minutes**

1. **Create GitHub Repo**
   ```bash
   cd "Documents/Cv Creater"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/cv-creator.git
   git push -u origin main
   ```

2. **Deploy Backend on Render**
   - Visit https://render.com
   - Sign up → New Web Service
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables (API keys)
   - Deploy → Get URL (e.g., `https://cv-creator-backend.onrender.com`)

3. **Deploy Frontend on Render**
   - New Static Site (same repo)
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment: `VITE_API_URL=https://cv-creator-backend.onrender.com`

4. **Verify**
   - Visit your frontend URL
   - Test CV generation
   - Check console for CORS/API errors

### ⚡ **Option 2: Vercel (Frontend) + Railway (Backend)**
**Time: ~15 minutes**

**Frontend (Vercel):**
- Visit vercel.com → Import GitHub repo
- Framework: Vite
- Root Directory: `frontend`
- Environment: `VITE_API_URL=<railway-backend-url>`

**Backend (Railway):**
- Visit railway.app → New Project
- Root Directory: `backend`
- Set environment variables
- Get public URL

---

## Deployment Command Cheatsheet

```bash
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 2. Add remote
git remote add origin https://github.com/USERNAME/cv-creator.git
git push -u origin main

# 3. Test build locally
cd backend && npm install && npm start &
cd frontend && npm install && npm run build
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS Error** | Check `FRONTEND_URL` in backend .env matches your frontend URL |
| **API 404** | Verify `VITE_API_URL` in frontend points to correct backend URL |
| **Build fails** | Ensure Node 18+ installed, clear node_modules and reinstall |
| **API key invalid** | Verify API key format and permissions in OpenAI/Anthropic dashboard |
| **Slow backend** | Free tier spins down after 15 min inactivity; use paid tier for always-on |

---

## After Deployment

### Testing
- [ ] Test CV form submission
- [ ] Generate CV with AI
- [ ] Download PDF
- [ ] Test on mobile

### Optional Enhancements
- [ ] Add custom domain ($12-15/year)
- [ ] Set up SSL (automatic on most platforms)
- [ ] Enable analytics
- [ ] Add error tracking (Sentry, LogRocket)

### Performance
- [ ] Monitor API response times
- [ ] Check backend logs for errors
- [ ] Optimize images if using profile pictures

---

## Costs Summary

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Render Backend** | ✅ Limited | $7-25/mo |
| **Render Frontend** | ✅ (Included) | N/A |
| **Vercel** | ✅ (Included) | Optional |
| **Railway** | ✅ $5/mo credit | Pay as you go |
| **Domain** | N/A | $12-15/year |
| **OpenAI API** | ❌ No free tier | $0.01-0.05 per CV |

**Total Monthly (Free):** $0 + API costs  
**Total Monthly (Small):** $7-15 + API costs

---

## Next Steps

1. Choose hosting platform (Render recommended)
2. Create GitHub repository
3. Set up environment variables
4. Deploy backend first
5. Deploy frontend with backend URL
6. Test thoroughly
7. Get your own domain (optional)

**Questions? Check DEPLOYMENT_GUIDE.md for detailed steps!**
