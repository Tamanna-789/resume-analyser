import { useState, useRef } from 'react'
import './UploadForm.css'

export default function UploadForm({ onAnalyse, error }) {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef()

  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
    } else {
      alert('Please upload a PDF file.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const canSubmit = resumeFile && jobDescription.trim().length > 20

  return (
    <div className="upload-form">
      <div className="form-hero">
        <h1 className="form-title">Is your resume the right fit?</h1>
        <p className="form-subtitle">Upload your CV and paste a job description — our AI will score the match, find gaps, and suggest improvements in seconds.</p>
      </div>

      <div className="form-grid">
        {/* Left: PDF upload */}
        <div className="form-section">
          <label className="section-label">Your Resume (PDF)</label>
          <div
            className={`drop-zone ${dragging ? 'dragging' : ''} ${resumeFile ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {resumeFile ? (
              <div className="file-chosen">
                <span className="file-icon">📄</span>
                <span className="file-name">{resumeFile.name}</span>
                <span className="file-size">{(resumeFile.size / 1024).toFixed(0)} KB</span>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); setResumeFile(null) }}>✕</button>
              </div>
            ) : (
              <div className="drop-prompt">
                <span className="drop-icon">⬆</span>
                <span className="drop-text">Drop your PDF here</span>
                <span className="drop-sub">or click to browse</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Job description */}
        <div className="form-section">
          <label className="section-label">Job Description</label>
          <textarea
            className="jd-textarea"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here...&#10;&#10;e.g. We are looking for a Junior Full Stack Developer with experience in React, Node.js..."
            rows={10}
          />
          <span className="char-hint">{jobDescription.length} characters</span>
        </div>
      </div>

      {error && (
        <div className="error-box">
          <span>⚠</span> {error}
        </div>
      )}

      <button
        className="analyse-btn"
        onClick={() => onAnalyse(resumeFile, jobDescription)}
        disabled={!canSubmit}
      >
        Analyse My Resume →
      </button>

      {!canSubmit && (
        <p className="submit-hint">
          {!resumeFile ? '← Upload your PDF resume to get started' : 'Paste a job description (at least 20 characters)'}
        </p>
      )}
    </div>
  )
}
