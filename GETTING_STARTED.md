# 🎯 Getting Started - Complete Setup Guide

## ✅ What's Ready

Your complete AI-powered CV Creator application is now set up with:

- ✅ React frontend with professional UI
- ✅ Node.js/Express backend
- ✅ OpenAI/Claude API integration
- ✅ PDF export functionality
- ✅ All dependencies installed
- ✅ Complete documentation

## 📋 System Requirements

- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **OpenAI API Key**: Free or paid account at openai.com
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🔑 Step 1: Get Your API Key

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign in (create account if needed)
3. Go to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key (you won't see it again)
6. Keep it safe!

## ⚙️ Step 2: Configure Backend

1. Open terminal in the project folder
2. Navigate to backend:
   ```bash
   cd backend
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file (use any text editor):
   ```
   OPENAI_API_KEY=sk-paste-your-key-here
   PORT=5000
   NODE_ENV=development
   ```

5. Save the file

## 🚀 Step 3: Start the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on http://localhost:5000
```

### Terminal 2 - Start Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

## 🌐 Step 4: Open in Browser

Your default browser should open automatically to:
```
http://localhost:3000
```

If not, manually open this URL in your browser.

## 📝 Step 5: Create Your First CV

### Form Inputs:

**Personal Information:**
- First Name: Your first name
- Last Name: Your last name
- Email: your@email.com
- Phone: (optional) Your phone number

**Professional Information:**
- Job Title: e.g., "Software Engineer", "Product Manager"
- Years of Experience: e.g., "5"
- Company Name: Your current/previous company
- Responsibilities: Key responsibilities (comma-separated)
- Achievements: Major accomplishments and results

### Example Input:

```
Name: John Smith
Email: john@example.com
Job Title: Senior Software Engineer
Experience: 5 years
Company: Tech Corp
Responsibilities: Led development team, architected microservices, managed 3 developers
Achievements: Reduced API response time by 40%, Increased user engagement by 25%, Led migration to cloud infrastructure
```

## 🎨 Step 6: Review & Download

1. Click **"Generate Professional CV"**
2. Wait 2-5 seconds for AI to generate content
3. Review the preview on the right side
4. Click **"📥 Download CV as PDF"** to save
5. Or click **"🖨️ Print CV"** to print directly

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
**Solution:**
- Make sure backend is running (Terminal 1)
- Check http://localhost:5000/api/health returns success
- Restart backend if needed

### Issue: "API Key Error" or "401 Unauthorized"
**Solution:**
- Double-check API key in `.env` file
- Make sure key is copied correctly (no extra spaces)
- Verify key has available credits
- Try creating a new key

### Issue: "CORS Error"
**Solution:**
- Backend must be on port 5000
- Frontend must be on port 3000
- Both should be running

### Issue: Port Already in Use
**Solution:**
```bash
# For port 5000
lsof -ti:5000 | xargs kill -9

# For port 3000
lsof -ti:3000 | xargs kill -9
```

Then restart the servers.

### Issue: Dependencies Installation Failed
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

## 📁 Project Organization

```
Frontend: Runs on http://localhost:3000
├── CVForm.jsx         - Input form
├── CVPreview.jsx      - CV display & PDF download
└── App.jsx            - Main component

Backend: Runs on http://localhost:5000
├── server.js          - Express setup
├── routes/            - API endpoints
├── controllers/       - Business logic
└── utils/             - AI generation
```

## 🔄 API Endpoints

### Generate CV Content
```
POST http://localhost:5000/api/cv/generate

Request Body:
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "555-1234",
  "jobTitle": "Software Engineer",
  "experience": 5,
  "company": "Tech Corp",
  "responsibilities": "Led team, built systems",
  "achievements": "Increased performance by 40%"
}

Response:
{
  "success": true,
  "cv": {
    "personal": {...},
    "summary": "AI generated professional summary",
    "experience": {...},
    "skills": ["Skill1", "Skill2", ...]
  }
}
```

## 💾 Customization

### Change Colors/Styling
Edit `frontend/src/components/CVPreview.jsx`:
```jsx
// Change the blue-600 color class
className="border-blue-600"  // ← Change to blue-700, indigo-600, etc.
```

### Add More Form Fields
1. Add input to `CVForm.jsx`
2. Update form state
3. Add field to API request
4. Update backend controller
5. Update AI prompt in `aiGenerator.js`

### Modify AI Prompts
Edit `backend/utils/aiGenerator.js`:
```javascript
// Change the prompt message to get different output
const message = await client.messages.create({
  messages: [
    {
      role: 'user',
      content: `Your custom prompt here...`
    }
  ]
})
```

## 📚 Documentation Files

- **README.md** - Full documentation
- **QUICK_START.md** - Quick reference
- **ARCHITECTURE.md** - System design
- **PROJECT_SUMMARY.md** - What was built
- **This file** - Getting started guide

## 🌟 Tips for Better Results

### For Professional Summary:
Include your key strengths and what makes you unique

### For Achievements:
Use metrics: "Increased by X%", "Reduced by X%", "Generated $X revenue"

### For Skills:
List both technical and soft skills relevant to the job

### PDF Quality:
- Use a modern browser (Chrome recommended)
- Ensure good internet (AI processing takes 2-5 seconds)
- Check preview before downloading

## 🚀 Next Steps

### After You Have Working App:
1. Test with different job titles
2. Try various experience levels
3. Customize the CV template
4. Share with friends

### To Deploy Online:
1. Frontend: Deploy to Netlify or Vercel
2. Backend: Deploy to Heroku or Railway
3. Use production API keys
4. Add database to save CVs

### To Add Features:
1. Save CVs to database
2. Multiple CV templates
3. Cover letter generation
4. LinkedIn import
5. ATS optimization tips

## 📞 Need Help?

1. Check console for error messages (F12 in browser)
2. Verify API key is valid
3. Ensure both servers are running
4. Check .env file is in backend folder
5. Review documentation files

## ✨ Enjoy Your CV Creator!

You now have a professional, AI-powered CV generator ready to use.

**Happy CV creating! 🎉**

---

For technical details, see [ARCHITECTURE.md](ARCHITECTURE.md)
For quick reference, see [QUICK_START.md](QUICK_START.md)
For full docs, see [README.md](README.md)
