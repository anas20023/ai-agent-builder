import React from 'react'
import type { SavedAgent, AgentData } from '../types'

interface SavedAgentsListProps {
  savedAgents: SavedAgent[]
  data: AgentData | null
  onLoad: (agent: SavedAgent) => void
  onDelete: (index: number) => void
  onClearAll: () => void
}

const SavedAgentsList: React.FC<SavedAgentsListProps> = ({
  savedAgents,
  data,
  onLoad,
  onDelete,
  onClearAll,
}) => {
  if (savedAgents.length === 0) return null

  return (
    <section className="glass-card p-10 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Neural Construct Library</h2>
          <p className="text-slate-500 text-sm italic font-medium">Archive of persistent AI entities and their configuration schemas.</p>
        </div>
        <button
          onClick={onClearAll}
          className="px-6 py-2 border-2 border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold uppercase tracking-widest active:scale-95"
        >
          Destruct Registry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {savedAgents.map((agent, index) => (
          <div 
            key={`${agent.name}-${index}`} 
            className="group relative bg-slate-950/40 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors tracking-tight">{agent.name}</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500/50 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">Entity #{index + 1}</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Profile</span>
                <span className="text-slate-200 font-semibold">{data?.agentProfiles.find(p => p.id === agent.profileId)?.name || 'Generic'}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Capabilities</span>
                <span className="text-indigo-400 font-black tabular-nums">{agent.skillIds?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Personality</span>
                <span className="text-emerald-400 font-black tabular-nums">{agent.layerIds?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1.5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Orchestrator</span>
                <span className="text-slate-400 italic text-[10px] uppercase font-bold tracking-widest">{agent.provider || 'Unlinked'}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onLoad(agent)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                Load Entity
              </button>
              <button
                onClick={() => onDelete(index)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg text-sm transition-all border border-transparent hover:border-red-500/20 active:scale-95"
                title="Destruct Entity"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default React.memo(SavedAgentsList)
