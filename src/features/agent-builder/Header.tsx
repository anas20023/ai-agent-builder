import React, { useState, useEffect } from 'react'
import { useAgent } from '../../context/AgentContext'

const Header: React.FC = () => {
  const { loading, refresh } = useAgent()
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 pb-12 border-b border-slate-200">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 group">
          Agent Builder 
          <span className="inline-block ml-2 text-indigo-600 transition-transform group-hover:translate-x-1">→</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Design your custom AI personality and capability set in a professional, high-fidelity environment.
        </p>
      </div>

      <div className="flex items-center gap-6 self-start md:self-auto">
        <div className="text-right">
          <span className="text-[10px] block uppercase tracking-widest font-bold text-slate-400 mb-1">Session Duration</span>
          <span className="font-mono text-lg text-indigo-600 tabular-nums font-semibold">{sessionTime}s</span>
        </div>
        <button 
          onClick={refresh} 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/10 active:scale-95 text-sm"
        >
          {loading ? 'Refining Sync...' : 'Re-sync Configuration'}
        </button>
      </div>
    </header>
  )
}

export default React.memo(Header)
