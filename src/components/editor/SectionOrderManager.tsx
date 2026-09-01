import React, { useState } from 'react';
import { SectionMeta } from '../../types';
import { GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, Check, Edit2 } from 'lucide-react';

interface SectionOrderManagerProps {
  sections: SectionMeta[];
  onChange: (sections: SectionMeta[]) => void;
}

export const SectionOrderManager: React.FC<SectionOrderManagerProps> = ({ sections, onChange }) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);

  const toggleVisibility = (id: string) => {
    onChange(
      sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;
    const newArr = [...sections];
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    onChange(newArr);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const newArr = [...sections];
    const item = newArr.splice(draggedIdx, 1)[0];
    newArr.splice(index, 0, item);
    setDraggedIdx(index);
    onChange(newArr);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const updateTitle = (id: string, title: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  return (
    <div className="space-y-3">
      <div className="text-xs text-neutral-600 bg-[#FAF9F6] p-3 rounded-lg border border-[#E5E2DC] leading-relaxed">
        Drag sections using the grip handle or use arrow buttons to rearrange the order in which sections appear on your CV. You can also hide sections or rename their display titles.
      </div>

      <div className="space-y-2">
        {sections.map((sec, idx) => {
          const isPersonal = sec.id === 'personal';
          const isEditing = editingTitleId === sec.id;

          return (
            <div
              key={sec.id}
              draggable={!isPersonal}
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className={`p-3 bg-white border rounded-lg flex items-center justify-between gap-2.5 transition-all select-none ${
                draggedIdx === idx ? 'opacity-50 border-neutral-900 shadow-md' : 'border-[#E5E2DC] shadow-2xs'
              } ${!sec.isVisible ? 'bg-neutral-50/70 opacity-60' : ''}`}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div
                  className={`p-1 text-neutral-400 ${
                    isPersonal ? 'cursor-not-allowed opacity-30' : 'cursor-grab active:cursor-grabbing hover:text-neutral-700'
                  }`}
                  title={isPersonal ? 'Header position is fixed' : 'Drag to reorder'}
                >
                  <GripVertical size={14} />
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => updateTitle(sec.id, e.target.value)}
                      className="text-xs font-semibold text-neutral-900 px-2 py-0.5 border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 w-full"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingTitleId(null);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setEditingTitleId(null)}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                    >
                      <Check size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-xs font-semibold text-neutral-800 truncate">{sec.title}</span>
                    {sec.isCustom && (
                      <span className="text-[9px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-mono">
                        Custom
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setEditingTitleId(sec.id)}
                      className="p-0.5 text-neutral-400 hover:text-neutral-700 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                      title="Rename section"
                    >
                      <Edit2 size={11} />
                    </button>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0 || isPersonal}
                  onClick={() => moveSection(idx, 'up')}
                  className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-20 rounded"
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={idx === sections.length - 1 || isPersonal}
                  onClick={() => moveSection(idx, 'down')}
                  className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-20 rounded"
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>

                <button
                  type="button"
                  disabled={isPersonal}
                  onClick={() => toggleVisibility(sec.id)}
                  className={`p-1 rounded transition-colors ${
                    sec.isVisible ? 'text-neutral-700 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-neutral-100'
                  }`}
                  title={sec.isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {sec.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
