import './Results.css'

const VERDICT_CONFIG = {
  strong_match: { label: 'Strong Match', color: 'green', emoji: '🎯' },
  good_match: { label: 'Good Match', color: 'blue', emoji: '👍' },
  partial_match: { label: 'Partial Match', color: 'amber', emoji: '⚡' },
  weak_match: { label: 'Weak Match', color: 'red', emoji: '⚠' },
}

function ScoreCircle({ score }) {
  const color =
    score >= 75 ? 'var(--green)' :
    score >= 50 ? 'var(--amber)' :
    'var(--red)'

  const radius = 42
  const circ = 2 * Math.PI * radius
  const fill = (score / 100) * circ

  return (
    <div className="score-wrap">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="var(--border)" strokeWidth="7" />
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
        />
        <text x="55" y="50" textAnchor="middle" fill={color} fontSize="24" fontWeight="800" fontFamily="Outfit, sans-serif">{score}</text>
        <text x="55" y="65" textAnchor="middle" fill="var(--text-dim)" fontSize="10" fontFamily="DM Mono, monospace">/ 100</text>
      </svg>
      <p className="score-label">Match Score</p>
    </div>
  )
}

export default function Results({ result, onReset }) {
  const verdict = VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG.partial_match

  return (
    <div className="results">

      {/* Top bar */}
      <div className="results-topbar">
        <h2 className="results-heading">Analysis Complete</h2>
        <button className="back-btn" onClick={onReset}>← Analyse another</button>
      </div>

      {/* Hero card */}
      <div className="hero-card">
        <ScoreCircle score={result.match_score} />
        <div className="hero-content">
          <span className={`verdict-badge verdict-${verdict.color}`}>
            {verdict.emoji} {verdict.label}
          </span>
          <p className="hero-summary">{result.summary}</p>
        </div>
      </div>

      {/* Strengths + Missing keywords */}
      <div className="two-col">
        <div className="info-card">
          <h3 className="card-title green">✓ Your Strengths</h3>
          <ul className="bullet-list">
            {result.strengths?.map((s, i) => (
              <li key={i} className="bullet-item green">{s}</li>
            ))}
          </ul>
        </div>
        <div className="info-card">
          <h3 className="card-title red">✕ Missing Keywords</h3>
          <div className="keyword-chips">
            {result.missing_keywords?.map((k, i) => (
              <span key={i} className="keyword-chip">{k}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Improvements */}
      {result.improvements?.length > 0 && (
        <div className="section">
          <h3 className="section-title">💡 Suggested Improvements</h3>
          <div className="improvements-list">
            {result.improvements.map((imp, i) => (
              <div key={i} className="improvement-card">
                <div className="imp-section-tag">{imp.section}</div>
                <p className="imp-issue">❌ {imp.issue}</p>
                <p className="imp-suggestion">✅ {imp.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewritten summary */}
      {result.rewritten_summary && (
        <div className="section">
          <h3 className="section-title">✍ AI-Rewritten Professional Summary</h3>
          <div className="rewrite-card">
            <p className="rewrite-text">{result.rewritten_summary}</p>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(result.rewritten_summary)}
            >
              Copy to clipboard
            </button>
          </div>
        </div>
      )}

      <button className="back-btn-bottom" onClick={onReset}>← Analyse another resume</button>
    </div>
  )
}
