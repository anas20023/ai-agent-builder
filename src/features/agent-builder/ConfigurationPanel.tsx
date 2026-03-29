import React from 'react'
import { useAgent } from '../../context/AgentContext'

const ConfigurationPanel: React.FC = () => {
  const { 
    data, loading, error, 
    selectedProfile, setSelectedProfile,
    setSelectedSkills, setSelectedLayers,
    selectedProvider, setSelectedProvider 
  } = useAgent()

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-sm font-semibold">
        Critical Synchronization Error: {error}
      </div>
    )
  }

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col gap-10 shadow-sm transition-transform hover:shadow-lg">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Identity Matrix</h2>
        <p className="text-slate-500 text-sm italic font-medium">Define the core neural profile and behavioral constraints of your agent.</p>
      </div>

      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="h-4 bg-slate-100 rounded-full w-2/3"></div>
          <div className="h-10 bg-slate-50 rounded-xl"></div>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <label htmlFor="profile-select" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Structural Base Profile
            </label>
            <select
              id="profile-select"
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="bg-white border-2 border-slate-100 rounded-2xl p-4 w-full focus:outline-none focus:border-indigo-600 transition-all text-slate-700 font-semibold"
            >
              <option value="">-- Initialize Profile --</option>
              {data.agentProfiles.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="skill-select" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Capability Injection
            </label>
            <select
              id="skill-select"
              onChange={(e) => {
                const val = e.target.value
                if (val) {
                  setSelectedSkills(prev => prev.includes(val) ? prev : [...prev, val])
                }
                e.target.value = ""
              }}
              defaultValue=""
              className="bg-white border-2 border-slate-100 rounded-2xl p-4 w-full focus:outline-none focus:border-indigo-600 transition-all text-slate-700 font-semibold"
            >
              <option value="" disabled>-- Inject Skill --</option>
              {data.skills.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="layer-select" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Personality Overlays
            </label>
            <select
              id="layer-select"
              onChange={(e) => {
                const val = e.target.value
                if (val) {
                  setSelectedLayers(prev => prev.includes(val) ? prev : [...prev, val])
                }
                e.target.value = ""
              }}
              defaultValue=""
              className="bg-white border-2 border-slate-100 rounded-2xl p-4 w-full focus:outline-none focus:border-indigo-600 transition-all text-slate-700 font-semibold"
            >
              <option value="" disabled>-- Map Layer --</option>
              {data.layers.map((l) => (
                <option key={l.id} value={l.id}>{l.name} ({l.type})</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label htmlFor="provider-select" className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
              Computational Orchestrator
            </label>
            <select
              id="provider-select"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="bg-indigo-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl p-4 w-full focus:outline-none transition-all text-indigo-900 font-black tracking-tight"
            >
              <option value="">-- Choose Provider --</option>
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
