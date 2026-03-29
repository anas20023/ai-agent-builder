import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'shadow-lg ring-2 ring-indigo-500/20' : ''}`}
    >
      <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
        <button
          {...attributes}
          {...listeners}
          className="cursor-move p-1 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Drag to reorder"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
