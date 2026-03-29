import React, { useState, useEffect } from 'react'

interface HeaderProps {
  loading: boolean
  onRefresh: () => void
}

const Header: React.FC<HeaderProps> = ({ loading, onRefresh }) => {
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-800">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          AI Agent Builder
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          Architect your custom AI intelligence. Define profiles, capabilities, and personality layers in a high-fidelity sandbox.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-slate-800 self-start md:self-auto">
        <button 
          onClick={onRefresh} 
          disabled={loading}
          className="btn-primary py-2 px-4 text-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Syncing...
            </span>
          ) : 'Re-sync Data'}
        </button>
        <div className="px-4 border-l border-slate-800">
          <span className="text-xs uppercase tracking-widest text-slate-500 block mb-0.5">Session Active</span>
          <span className="font-mono text-indigo-400 tabular-nums">{sessionTime}s</span>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)
