import { useState } from 'react'
import Header from './components/Header'
import UploadForm from './components/UploadForm'
import LoadingState from './components/LoadingState'
import Results from './components/Results'
import './App.css'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyse = async (resumeFile, jobDescription) => {
    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description', jobDescription)

    try {
      const res = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        {!loading && !result && (
          <UploadForm onAnalyse={handleAnalyse} error={error} />
        )}
        {loading && <LoadingState />}
        {result && <Results result={result} onReset={handleReset} />}
      </main>
      <footer className="footer">
        <span>Built with React + Flask + Groq AI</span>
      </footer>
    </div>
  )
}
