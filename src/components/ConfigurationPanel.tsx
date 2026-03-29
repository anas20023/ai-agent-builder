import React from 'react'
import type { AgentData } from '../types'

interface ConfigurationPanelProps {
  data: AgentData | null
  loading: boolean
  error: string | null
  selectedProfile: string
  setSelectedProfile: (id: string) => void
  onSkillSelect: (skillId: string) => void
  onLayerSelect: (layerId: string) => void
  selectedProvider: string
  setSelectedProvider: (provider: string) => void
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  data,
  loading,
  error,
  selectedProfile,
  setSelectedProfile,
  onSkillSelect,
  onLayerSelect,
  selectedProvider,
  setSelectedProvider,
}) => {
  return (
    <section className="glass-card p-10 flex flex-col gap-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Configuration Matrix</h2>
        <p className="text-slate-500 text-sm">Define the core identity and behavioral constraints of your agent.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-medium">
          System Fault Identified: {error}
        </div>
      )}

      {loading && (
        <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-indigo-500/20 rounded-full w-3/4"></div>
            <div className="h-10 bg-slate-800/50 rounded-lg"></div>
        </div>
      )}

      {!data && !loading && !error && (
        <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-500 italic">No configuration data available. Try re-syncing.</p>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <label htmlFor="profile-select" className="block text-xs font-bold uppercase tracking-widest text-slate-500">
              Neural Base Profile
            </label>
            <select
              id="profile-select"
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="bg-slate-950/50 border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-300"
            >
              <option value="">-- Select a Profile --</option>
              {data.agentProfiles.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="skill-select" className="blue text-xs font-bold uppercase tracking-widest text-slate-500">
              Inject Capability
            </label>
            <select
              id="skill-select"
              onChange={(e) => {
                onSkillSelect(e.target.value)
                e.target.value = ""
              }}
              defaultValue=""
              className="bg-slate-950/50 border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-300"
            >
              <option value="" disabled>-- Select a Skill to Add --</option>
              {data.skills.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="layer-select" className="block text-xs font-bold uppercase tracking-widest text-slate-500">
              Personality Layer
            </label>
            <select
              id="layer-select"
              onChange={(e) => {
                onLayerSelect(e.target.value)
                e.target.value = ""
              }}
              defaultValue=""
              className="bg-slate-950/50 border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-300"
            >
              <option value="" disabled>-- Select a Layer to Add --</option>
              {data.layers.map((l) => (
                <option key={l.id} value={l.id}>{l.name} ({l.type})</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="provider-select" className="block text-xs font-bold uppercase tracking-widest text-slate-500">
              Neural Network Orchestrator
            </label>
            <select
              id="provider-select"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="bg-slate-950/50 border border-white/10 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-300 font-semibold"
            >
              <option value="">-- Select a Provider --</option>
              {['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek'].map((provider) => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </section>
  )
}

export default React.memo(ConfigurationPanel)
