import React, { useState } from 'react';
import { ExperienceItem } from '../../../types';
import { Plus, Trash2, ChevronUp, ChevronDown, PlusCircle, X, GripVertical } from 'lucide-react';

interface ExperienceEditorProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: true,
      highlights: [''],
      description: '',
    };
    onChange([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    onChange(newItems);
  };

  const handleHighlightChange = (itemId: string, bulletIdx: number, val: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    const nextHighlights = [...item.highlights];
    nextHighlights[bulletIdx] = val;
    updateItem(itemId, { highlights: nextHighlights });
  };

  const addHighlightBullet = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    updateItem(itemId, { highlights: [...item.highlights, ''] });
  };

  const removeHighlightBullet = (itemId: string, bulletIdx: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    updateItem(itemId, { highlights: item.highlights.filter((_, idx) => idx !== bulletIdx) });
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 bg-white">
          No experience items yet. Click &quot;Add Experience&quot; to begin.
        </div>
      ) : (
        items.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-[#E5E2DC] rounded-lg overflow-hidden transition-all shadow-2xs"
            >
              {/* Header bar */}
              <div
                className="p-3 bg-[#FAF9F6] border-b border-[#EBE8E1] flex items-center justify-between gap-2 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <GripVertical size={13} className="text-neutral-400 shrink-0" />
                  <div className="truncate text-xs font-semibold text-neutral-800">
                    {item.role || 'Untitled Role'}
                    <span className="font-normal text-neutral-500 text-[11px]">
                      {' '}
                      {item.company ? `— ${item.company}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveItem(index, 'up')}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded"
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(index, 'down')}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 rounded"
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-neutral-400 hover:text-red-600 rounded"
                    title="Delete item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {isExpanded && (
                <div className="p-3.5 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Job Title / Role</label>
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) => updateItem(item.id, { role: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Company / Organization</label>
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => updateItem(item.id, { company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-neutral-700">Location</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                        placeholder="e.g. San Francisco, CA (or Remote)"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Start Date</label>
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                        placeholder="e.g. 2021-03 or Mar 2021"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-neutral-700">End Date</label>
                        <label className="flex items-center gap-1 text-[10px] text-neutral-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.isCurrent}
                            onChange={(e) => updateItem(item.id, { isCurrent: e.target.checked })}
                            className="rounded border-neutral-300 w-3 h-3 text-neutral-900"
                          />
                          <span>Currently Work Here</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={item.isCurrent}
                        value={item.isCurrent ? 'Present' : item.endDate}
                        onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                        placeholder="e.g. 2023-11 or Nov 2023"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono disabled:bg-neutral-50 disabled:text-neutral-400"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-neutral-700">Sub-description (Optional)</label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        placeholder="e.g. Enterprise Cloud Security Platform"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  {/* Bullet points highlights */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-semibold text-neutral-700">
                        Key Responsibilities & Achievements
                      </label>
                      <button
                        type="button"
                        onClick={() => addHighlightBullet(item.id)}
                        className="text-[11px] text-neutral-700 hover:text-neutral-900 font-medium flex items-center gap-1"
                      >
                        <PlusCircle size={12} />
                        <span>Add Bullet</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {item.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-neutral-400 text-xs mt-1.5">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => handleHighlightChange(item.id, bIdx, e.target.value)}
                            placeholder="Describe measurable impact, technologies applied, or metrics achieved..."
                            className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 resize-y"
                          />
                          <button
                            type="button"
                            onClick={() => removeHighlightBullet(item.id, bIdx)}
                            className="p-1 text-neutral-400 hover:text-red-500 rounded mt-1"
                            title="Remove bullet"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus size={13} />
        <span>Add Experience Position</span>
      </button>
    </div>
  );
};
