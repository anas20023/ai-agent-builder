import React from 'react'
import { useAgent } from '../../context/AgentContext'

const SavedAgentsList: React.FC = () => {
  const { savedAgents, data, handleLoadAgent, handleDeleteAgent, handleClearAll } = useAgent()

  if (savedAgents.length === 0) return null

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col gap-10 shadow-sm transition-transform hover:shadow-lg mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Construct Library</h2>
          <p className="text-slate-500 text-sm italic font-medium">Archive of persistent AI constructs and their neural configuration schemas.</p>
        </div>
        <button
          onClick={handleClearAll}
          className="px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600 rounded-xl transition-all text-xs font-black uppercase tracking-widest active:scale-95 shadow-sm"
        >
          Purge Registry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {savedAgents.map((agent, index) => (
          <div 
            key={`${agent.name}-${index}`} 
            className="group relative bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-600 transition-all hover:shadow-xl hover:-translate-y-1 cursor-default shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">{agent.name}</h3>
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Entity #{index + 1}</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase tracking-widest">Base</span>
                <span className="text-slate-700 font-extrabold">{data?.agentProfiles.find(p => p.id === agent.profileId)?.name || 'Standard'}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Capabilities</span>
                <span className="text-indigo-600 font-black tabular-nums">{agent.skillIds?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Tuning</span>
                <span className="text-emerald-500 font-black tabular-nums">{agent.layerIds?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Orchestrator</span>
                <span className="text-slate-300 italic text-[10px] uppercase font-bold tracking-widest">{agent.provider || 'Generic'}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleLoadAgent(agent)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
              >
                Restore Entity
              </button>
              <button
                onClick={() => handleDeleteAgent(index)}
                className="px-4 py-3 border border-slate-200 hover:border-red-100 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl text-xs transition-all active:scale-95"
                title="Deconstruct Entity"
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
