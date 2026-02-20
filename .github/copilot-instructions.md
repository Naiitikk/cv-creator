# CV Creator Website - Project Setup

## Project Overview
AI-powered CV creator website that generates professional CVs automatically based on user inputs, with PDF export functionality.

## Tech Stack
- **Frontend**: React with Vite, Tailwind CSS, jsPDF
- **Backend**: Node.js/Express
- **AI**: OpenAI/Claude API
- **PDF Generation**: jsPDF + html2canvas
- **Database**: Optional (MongoDB/Firebase for storing CVs)

## Project Structure
```
CV Creator/
├── backend/
│   ├── controllers/    - API controllers
│   ├── routes/        - API endpoints
│   ├── utils/         - AI generator
│   ├── server.js      - Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ - React components (CVForm, CVPreview)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── README.md
└── .gitignore

## Completed Steps
- [x] Project structure created
- [x] Backend setup with Express and OpenAI integration
- [x] React frontend with CV form and preview
- [x] AI content generation (summary, experience, skills)
- [x] PDF generation and download functionality
- [x] Dependencies installed
- [x] README with complete setup instructions

## How to Run
1. Backend: `cd backend && npm start` (runs on port 5000)
2. Frontend: `cd frontend && npm run dev` (runs on port 3000)
3. Get OpenAI API key and add to backend/.env

## Key Features Implemented
✅ Professional CV form with all fields
✅ AI-powered content generation
✅ Beautiful CV preview template
✅ PDF download functionality
✅ Print support
✅ Responsive design with Tailwind CSS
✅ Error handling and loading states
