import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">R</div>
          <div>
            <div className="logo-name">ResumeAI</div>
            <div className="logo-sub">powered by Groq + Llama 3</div>
          </div>
        </div>
        <p className="header-tagline">Upload your CV · Paste a job description · Get instant AI feedback</p>
      </div>
    </header>
  )
}
