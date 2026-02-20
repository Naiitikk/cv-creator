# 🚀 AI-Powered CV Creator

Generate professional CVs in seconds with AI-powered content generation!

## Features

✨ **AI-Powered Content Generation** - Uses OpenAI/Claude API to generate professional CV content
📄 **Professional CV Templates** - Beautiful, professional CV layout
💾 **PDF Export** - Download your CV as a PDF file
🎨 **Clean UI** - Modern, responsive design with Tailwind CSS
⚡ **Fast & Easy** - Fill basic info and AI does the rest

## Project Structure

```
CV Creator/
├── backend/               # Node.js/Express server
│   ├── controllers/      # API controllers
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions & AI integration
│   ├── server.js        # Express server setup
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Styles
│   ├── public/          # Static files
│   ├── vite.config.js   # Vite config
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API Key

### Installation

1. **Clone or extract the project**

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Add your OpenAI API Key**
   Edit `backend/.env` and add your API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

Visit `http://localhost:3000` in your browser.

## How to Use

1. **Fill in your personal information** (Name, Email, Phone)
2. **Enter your professional details**:
   - Job Title/Position
   - Years of Experience
   - Company Name
   - Responsibilities
   - Key Achievements
3. **Click "Generate Professional CV"** - AI will create:
   - Professional summary
   - Experience descriptions with action verbs
   - Relevant skills
4. **Review your CV** in the preview
5. **Download as PDF** or print directly

## Tech Stack

### Backend
- **Express.js** - Web framework
- **OpenAI API** - AI content generation
- **CORS** - Cross-origin support
- **Dotenv** - Environment configuration

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **jsPDF + html2canvas** - PDF generation

## API Endpoints

### Generate CV Content
```
POST /api/cv/generate
Body: {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  jobTitle: string,
  experience: number,
  company: string,
  responsibilities: string,
  achievements: string,
  skills: string[]
}
```

### Generate Cover Letter
```
POST /api/cv/cover-letter
Body: {
  jobTitle: string,
  company: string,
  experience: number
}
```

## Customization

### Change PDF Styling
Edit `src/components/CVPreview.jsx` to customize the CV appearance.

### Add More Fields
1. Add fields to the form in `src/components/CVForm.jsx`
2. Update the backend controller in `backend/controllers/cvController.js`
3. Update the AI generator in `backend/utils/aiGenerator.js`

### Update AI Prompts
Modify the prompts in `backend/utils/aiGenerator.js` to change how content is generated.

## Troubleshooting

### CORS Errors
Make sure the backend is running on port 5000 and frontend on 3000.

### PDF Download Not Working
Check browser console for errors. Make sure html2canvas and jsPDF are properly installed.

### AI Generation Not Working
- Verify your OpenAI API key is correct
- Check that the API key has sufficient credits
- Ensure all required fields are filled

## Future Enhancements

- [ ] Database integration for saving CVs
- [ ] Multiple CV templates
- [ ] Cover letter generation
- [ ] Linkedin profile import
- [ ] Real-time preview
- [ ] Collaboration features
- [ ] Custom branding options
- [ ] ATS optimization tips

## License

MIT License - Feel free to use this for personal or commercial projects.

## Support

For issues or questions, check the console logs and ensure all dependencies are properly installed.

---

**Made with ❤️ using React, Node.js, and AI**
