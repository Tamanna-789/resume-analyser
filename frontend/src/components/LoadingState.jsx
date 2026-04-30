import { useState, useEffect } from 'react'
import './LoadingState.css'

const STEPS = [
  'Reading your resume...',
  'Extracting skills and experience...',
  'Comparing with job requirements...',
  'Identifying keyword gaps...',
  'Generating improvement suggestions...',
  'Almost done...',
]

export default function LoadingState() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading">
      <div className="loading-card">
        <div className="spinner">
          <div className="spinner-ring" />
          <div className="spinner-dot" />
        </div>
        <h2 className="loading-title">Analysing your resume</h2>
        <div className="steps-list">
          {STEPS.map((s, i) => (
            <div key={i} className={`step ${i < step ? 'done' : i === step ? 'active' : 'pending'}`}>
              <span className="step-icon">
                {i < step ? '✓' : i === step ? '→' : '○'}
              </span>
              <span className="step-text">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
