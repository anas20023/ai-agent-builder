import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAgentData } from './hooks/useAgentData'
import type { SavedAgent } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Components
import Header from './components/Header'
import ConfigurationPanel from './components/ConfigurationPanel'
import PreviewPanel from './components/PreviewPanel'
import SavedAgentsList from './components/SavedAgentsList'

function App() {
  const { data, loading, error, refresh } = useAgentData()

  // Selection states
  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>('')

  // Saving states
  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])

  // Load saved agents from local storage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedAgents')
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved agents', e)
      }
    }
  }, [])

  // Analytics Heartbeat
  useEffect(() => {
    const analyticsInterval = setInterval(() => {
      const name = agentName.trim() || 'unnamed agent draft'
      console.log(`[Analytics Heartbeat] User is working on: "${name}"`)
    }, 8000)
    return () => clearInterval(analyticsInterval)
  }, [agentName])

  // Memoized Derived State
  const selectedProfileData = useMemo(() => 
    data?.agentProfiles.find(p => p.id === selectedProfile),
    [data, selectedProfile]
  )

  const selectedSkillsData = useMemo(() => 
    selectedSkills.map(id => data?.skills.find(s => s.id === id)).filter(Boolean) as any[],
    [data, selectedSkills]
  )

  const selectedLayersData = useMemo(() => 
    selectedLayers.map(id => data?.layers.find(l => l.id === id)).filter(Boolean) as any[],
    [data, selectedLayers]
  )

  // Handlers
  const handleSkillSelect = useCallback((skillId: string) => {
    if (skillId && !selectedSkills.includes(skillId)) {
      setSelectedSkills(prev => [...prev, skillId])
    }
  }, [selectedSkills])

  const handleLayerSelect = useCallback((layerId: string) => {
    if (layerId && !selectedLayers.includes(layerId)) {
      setSelectedLayers(prev => [...prev, layerId])
    }
  }, [selectedLayers])

  const handleRemoveSkill = useCallback((id: string) => {
    setSelectedSkills(prev => prev.filter(skillId => skillId !== id))
  }, [])

  const handleRemoveLayer = useCallback((id: string) => {
    setSelectedLayers(prev => prev.filter(layerId => layerId !== id))
  }, [])

  const handleSaveAgent = useCallback(() => {
    if (!agentName.trim()) {
      toast.error('Please enter a name for your agent.')
      return
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updatedAgents = [...savedAgents, newAgent]
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
    setAgentName('')
    toast.success(`Agent "${newAgent.name}" saved successfully!`)
  }, [agentName, selectedProfile, selectedSkills, selectedLayers, selectedProvider, savedAgents])

  const handleDeleteAgent = useCallback((indexToRemove: number) => {
    const updatedAgents = savedAgents.filter((_, index) => index !== indexToRemove)
    setSavedAgents(updatedAgents)
    localStorage.setItem('savedAgents', JSON.stringify(updatedAgents))
    toast.info('Agent deleted.')
  }, [savedAgents])

  const handleClearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all saved agents?')) {
      setSavedAgents([])
      localStorage.removeItem('savedAgents')
      toast.info('All agents cleared.')
    }
  }, [])

  const handleLoadAgent = useCallback((agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers(agent.layerIds || [])
    setAgentName(agent.name)
    setSelectedProvider(agent.provider || '')
    toast.info(`Loaded agent: ${agent.name}`)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-smooth">
      <ToastContainer position="top-right" theme="dark" pauseOnFocusLoss={false} autoClose={3000} />

      <Header loading={loading} onRefresh={refresh} />

      <main className="flex flex-col gap-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ConfigurationPanel 
            data={data}
            loading={loading}
            error={error}
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            onSkillSelect={handleSkillSelect}
            onLayerSelect={handleLayerSelect}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
          />

          <PreviewPanel 
            selectedProfile={selectedProfileData}
            selectedSkills={selectedSkillsData}
            selectedLayers={selectedLayersData}
            selectedProvider={selectedProvider}
            agentName={agentName}
            setAgentName={setAgentName}
            onSave={handleSaveAgent}
            onRemoveSkill={handleRemoveSkill}
            onRemoveLayer={handleRemoveLayer}
          />
        </div>

        <SavedAgentsList 
          savedAgents={savedAgents}
          data={data}
          onLoad={handleLoadAgent}
          onDelete={handleDeleteAgent}
          onClearAll={handleClearAll}
        />
      </main>
    </div>
  )
}

export default App
