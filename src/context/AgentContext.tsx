import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import type { AgentData, SavedAgent, AgentProfile, Skill, Layer } from '../types'
import { useAgentData } from '../hooks/useAgentData'
import { toast } from 'react-toastify'

interface AgentContextType {
  data: AgentData | null
  loading: boolean
  error: string | null
  selectedProfile: string
  selectedSkills: string[]
  selectedLayers: string[]
  selectedProvider: string
  agentName: string
  savedAgents: SavedAgent[]
  setSelectedProfile: (id: string) => void
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedProvider: (provider: string) => void
  setAgentName: (name: string) => void
  handleSaveAgent: () => void
  handleDeleteAgent: (index: number) => void
  handleClearAll: () => void
  handleLoadAgent: (agent: SavedAgent) => void
  handleReorderSkills: (oldIndex: number, newIndex: number) => void
  handleReorderLayers: (oldIndex: number, newIndex: number) => void
  selectedProfileData: AgentProfile | undefined
  selectedSkillsData: Skill[]
  selectedLayersData: Layer[]
  refresh: () => void
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, loading, error, refresh } = useAgentData()

  const [selectedProfile, setSelectedProfile] = useState<string>('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>('')
  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])

  // Persistence
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

  const selectedProfileData = useMemo(() => 
    data?.agentProfiles.find(p => p.id === selectedProfile),
    [data, selectedProfile]
  )

  const selectedSkillsData = useMemo(() => 
    selectedSkills.map(id => data?.skills.find(s => s.id === id)).filter(Boolean) as Skill[],
    [data, selectedSkills]
  )

  const selectedLayersData = useMemo(() => 
    selectedLayers.map(id => data?.layers.find(l => l.id === id)).filter(Boolean) as Layer[],
    [data, selectedLayers]
  )

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
    toast.info(`Loaded: ${agent.name}`)
  }, [])

  const handleReorderSkills = useCallback((oldIndex: number, newIndex: number) => {
    const newOrder = [...selectedSkills];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
    setSelectedSkills(newOrder);
  }, [selectedSkills]);

  const handleReorderLayers = useCallback((oldIndex: number, newIndex: number) => {
    const newOrder = [...selectedLayers];
    const [moved] = newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, moved);
    setSelectedLayers(newOrder);
  }, [selectedLayers]);

  const value = useMemo(() => ({
    data, loading, error, selectedProfile, selectedSkills, selectedLayers, selectedProvider, agentName, savedAgents,
    setSelectedProfile, setSelectedSkills, setSelectedLayers, setSelectedProvider, setAgentName,
    handleSaveAgent, handleDeleteAgent, handleClearAll, handleLoadAgent,
    handleReorderSkills, handleReorderLayers,
    selectedProfileData, selectedSkillsData, selectedLayersData, refresh
  }), [
    data, loading, error, selectedProfile, selectedSkills, selectedLayers, selectedProvider, agentName, savedAgents,
    handleSaveAgent, handleDeleteAgent, handleClearAll, handleLoadAgent,
    handleReorderSkills, handleReorderLayers,
    selectedProfileData, selectedSkillsData, selectedLayersData, refresh
  ])

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}

export const useAgent = () => {
  const context = useContext(AgentContext)
  if (!context) throw new Error('useAgent must be used within an AgentProvider')
  return context
}
