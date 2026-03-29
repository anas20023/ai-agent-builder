import React from 'react'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useAgent } from '../../context/AgentContext'
import { SortableItem } from '../../components/ui/SortableItem'

const PreviewPanel: React.FC = () => {
  const { 
    selectedProfileData, 
    selectedSkills, setSelectedSkills, selectedSkillsData,
    selectedLayers, setSelectedLayers, selectedLayersData,
    agentName, setAgentName, handleSaveAgent
  } = useAgent()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEndSkills = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSelectedSkills((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDragEndLayers = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSelectedLayers((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col gap-10 shadow-sm transition-transform hover:shadow-lg h-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Neural Link Preview</h2>
        <p className="text-slate-500 text-sm italic font-medium">Real-time status of the constructive AI link and entity blueprint.</p>
      </div>

      <div className="flex flex-col gap-10 flex-1">
        {/* Profile */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Architecture</h3>
          {selectedProfileData ? (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600"></div>
              <span className="text-slate-900 font-bold block">{selectedProfileData.name}</span>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{selectedProfileData.description}</p>
            </div>
          ) : (
            <p className="text-slate-400 italic text-sm py-4 border-2 border-dashed border-slate-100 rounded-2xl text-center">System awaiting neural profile initialization...</p>
          )}
        </div>

        {/* Skills (Sortable) */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex justify-between items-center">
            Active Capabilities
            <span className="text-[9px] font-medium lowercase text-slate-300">Drag to reorder priority</span>
          </h3>
          {selectedSkills.length > 0 ? (
            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter} 
              onDragEnd={handleDragEndSkills}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={selectedSkills} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {selectedSkills.map(id => {
                    const skill = selectedSkillsData.find(s => s.id === id)
                    return (
                      <SortableItem key={id} id={id}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">{skill?.name}</span>
                          <button 
                            onClick={() => setSelectedSkills(prev => prev.filter(sid => sid !== id))}
                            className="text-slate-300 hover:text-red-500 transition-colors text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </SortableItem>
                    )
                  })}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-slate-400 italic text-sm py-4 border-2 border-dashed border-slate-100 rounded-2xl text-center">No capabilities linked.</p>
          )}
        </div>

        {/* Layers (Sortable) */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex justify-between items-center">
            Personality Tuning 
            <span className="text-[9px] font-medium lowercase text-slate-300">Compositional order</span>
          </h3>
          {selectedLayers.length > 0 ? (
            <DndContext 
              sensors={sensors} 
              collisionDetection={closestCenter} 
              onDragEnd={handleDragEndLayers}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={selectedLayers} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {selectedLayers.map(id => {
                    const layer = selectedLayersData.find(l => l.id === id)
                    return (
                      <SortableItem key={id} id={id}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">{layer?.name}</span>
                          <button 
                            onClick={() => setSelectedLayers(prev => prev.filter(lid => lid !== id))}
                            className="text-slate-300 hover:text-red-500 transition-colors text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </SortableItem>
                    )
                  })}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-slate-400 italic text-sm py-4 border-2 border-dashed border-slate-100 rounded-2xl text-center">Personality overrides inactive.</p>
          )}
        </div>

        {/* Save Area */}
        <div className="mt-auto pt-10 border-t border-slate-100 space-y-6">
          <div className="flex flex-col gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Commit Construct</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Name your construct..."
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium"
              />
              <button 
                onClick={handleSaveAgent} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                Save Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(PreviewPanel)
