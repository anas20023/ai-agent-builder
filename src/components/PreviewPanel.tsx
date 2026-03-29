import React from 'react'
import type { Skill, Layer, AgentProfile } from '../types'

interface PreviewPanelProps {
  selectedProfile: AgentProfile | undefined
  selectedSkills: Skill[]
  selectedLayers: Layer[]
  selectedProvider: string
  agentName: string
  setAgentName: (name: string) => void
  onSave: () => void
  onRemoveSkill: (id: string) => void
  onRemoveLayer: (id: string) => void
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  selectedProfile,
  selectedSkills,
  selectedLayers,
  selectedProvider,
  agentName,
  setAgentName,
  onSave,
  onRemoveSkill,
  onRemoveLayer,
}) => {
  return (
    <section className="glass-card p-10 flex flex-col gap-8 h-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Neural Blueprint</h2>
        <p className="text-slate-500 text-sm">Real-time visualization of the agent's constructive state.</p>
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Core Identity</h3>
          {selectedProfile ? (
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
              <span className="text-indigo-400 font-bold block">{selectedProfile.name}</span>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">{selectedProfile.description}</p>
            </div>
          ) : (
            <p className="text-slate-600 italic text-sm py-2">Waiting for neural link initialization...</p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Capabilities</h3>
          {selectedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map(skill => (
                <div key={skill.id} className="group flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-medium cursor-default hover:bg-indigo-500/20 transition-colors">
                  {skill.name}
                  <button 
                    onClick={() => onRemoveSkill(skill.id)}
                    className="opacity-40 hover:opacity-100 hover:text-red-400 transition-all font-bold text-base leading-none"
                    aria-label={`Remove ${skill.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 italic text-sm py-2">No capabilities injected.</p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Personality Directives</h3>
          {selectedLayers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedLayers.map(layer => (
                <div key={layer.id} className="group flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-xs font-medium cursor-default hover:bg-emerald-500/20 transition-colors">
                  {layer.name}
                  <button 
                    onClick={() => onRemoveLayer(layer.id)}
                    className="opacity-40 hover:opacity-100 hover:text-red-400 transition-all font-bold text-base leading-none"
                    aria-label={`Remove ${layer.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 italic text-sm py-2">Personality defaults engaged.</p>
          )}
        </div>

        {selectedProvider && (
          <div className="space-y-1 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Orchestrator</h3>
            <p className="text-slate-200 font-bold tracking-tight text-lg">{selectedProvider}</p>
          </div>
        )}

        <div className="mt-auto pt-8 border-t border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white">Save Neural link</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Assign entity name..."
              value={agentName}
              onChange={e => setAgentName(e.target.value)}
              className="input-field"
            />
            <button onClick={onSave} className="btn-primary whitespace-nowrap px-8">
              Commit
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(PreviewPanel)
