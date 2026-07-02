import { useState } from 'react'
import './index.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${backendUrl}/health`)
      const data = await response.json()
      setStatus(JSON.stringify(data, null, 2))
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setStatus(`Error: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="dashboard-card">
        <div className="hero-header">
          <span className="live-pill">● Live monitor</span>
          <h1>System Dashboard</h1>
          <p>Monitor your backend health with a sharper, brighter view.</p>
        </div>

        <div className="info-strip">
          <div className="info-chip">
            <span className="chip-label">Endpoint</span>
            <strong>{backendUrl}</strong>
          </div>
          <div className="info-chip">
            <span className="chip-label">Mode</span>
            <strong>Realtime</strong>
          </div>
        </div>

        <div className="button-row">
          <button
            className={`health-btn ${loading ? 'loading' : ''}`}
            onClick={checkHealth}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Backend Health'}
          </button>
        </div>

        <div className="status-panel">
          <div className="status-panel-header">
            <h3>Status Output</h3>
            <span className="status-dot" />
          </div>
          <div className="status-terminal">
            {status ? (
              <pre><code>{status}</code></pre>
            ) : (
              <span className="placeholder">Awaiting health check...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
