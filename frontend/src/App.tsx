import { useState } from 'react'
import './index.css'

function App() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/health')
      const data = await response.json()
      setStatus(JSON.stringify(data, null, 2))
    } catch (error: any) {
      setStatus(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">System Dashboard</h1>
        <p className="subtitle">Monitor your backend health status</p>
        
        <div className="button-group">
          <button 
            className={`health-btn ${loading ? 'loading' : ''}`} 
            onClick={checkHealth}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check Backend Health'}
          </button>
        </div>

        <div className="status-display">
          <h3 className="status-title">Status Output</h3>
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
