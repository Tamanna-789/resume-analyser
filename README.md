# ResumeAI — AI-Powered Resume Analyser

> Upload your CV and paste a job description. Get an instant match score, keyword gap analysis, improvement suggestions, and an AI-rewritten professional summary — powered by Groq + Llama 3.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square)
![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square)
![Groq](https://img.shields.io/badge/AI-Groq%20%2B%20Llama3-orange?style=flat-square)

---

## Features

- **Match score (0–100)** — instant visual score showing how well your CV fits the role
- **Keyword gap analysis** — spots missing skills and terms recruiters are looking for
- **Strengths highlight** — shows what you're already doing well
- **Improvement suggestions** — section-by-section actionable feedback
- **AI-rewritten summary** — rewrites your professional summary tailored to the job
- **PDF upload with drag & drop** — clean, intuitive interface
- **Completely free** — powered by Groq's free API tier

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Python 3 + Flask |
| AI | Groq API (Llama 3 70B) |
| PDF Parsing | pdfplumber |
| Styling | Pure CSS with CSS variables |

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A free Groq API key from [console.groq.com](https://console.groq.com)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/resume-analyser.git
cd resume-analyser
```

### 2. Set up the backend
```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env
python app.py
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
resume-analyser/
├── backend/
│   ├── app.py              # Flask API — /api/analyse endpoint
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── UploadForm.jsx      # PDF upload + job description input
│   │       ├── LoadingState.jsx    # Animated step-by-step loader
│   │       └── Results.jsx         # Full analysis display
│   └── vite.config.js
└── README.md
```

---

## API Reference

### `POST /api/analyse`

**Request:** `multipart/form-data`
- `resume` — PDF file
- `job_description` — plain text string

**Response:**
```json
{
  "match_score": 72,
  "summary": "Your resume shows strong frontend experience...",
  "verdict": "good_match",
  "strengths": ["Strong React experience", "Relevant project work"],
  "missing_keywords": ["TypeScript", "CI/CD", "Docker"],
  "improvements": [
    {
      "section": "Skills",
      "issue": "No mention of TypeScript despite it being required",
      "suggestion": "Add TypeScript to your skills and highlight any experience with it"
    }
  ],
  "rewritten_summary": "Motivated junior developer with 2 years of..."
}
```

---

## What I Learned

- Handling file uploads in Flask with `request.files` and `multipart/form-data`
- Extracting text from PDFs using `pdfplumber`
- Prompt engineering for structured JSON output from an LLM
- Managing multi-step async state in React (upload → loading → results)
- Building a drag-and-drop file upload UI from scratch

---

## Future Improvements

- [ ] Support DOCX resumes in addition to PDF
- [ ] Save analysis history with a database
- [ ] Side-by-side resume editor with live re-analysis
- [ ] Multiple job description comparison

---

## License

MIT
