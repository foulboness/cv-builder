import React, { useState } from 'react';
import { EducationItem } from '../../../types';
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

interface EducationEditorProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const addItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      field: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };
    onChange([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<EducationItem>) => {
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

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 bg-white">
          No education entries yet. Click &quot;Add Education&quot; to begin.
        </div>
      ) : (
        items.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="bg-white border border-[#E5E2DC] rounded-lg overflow-hidden transition-all shadow-2xs">
              <div
                className="p-3 bg-[#FAF9F6] border-b border-[#EBE8E1] flex items-center justify-between gap-2 cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <GripVertical size={13} className="text-neutral-400 shrink-0" />
                  <div className="truncate text-xs font-semibold text-neutral-800">
                    {item.degree ? `${item.degree} ${item.field ? `in ${item.field}` : ''}` : 'Untitled Degree'}
                    <span className="font-normal text-neutral-500 text-[11px]">
                      {' '}
                      {item.school ? `— ${item.school}` : ''}
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

              {isExpanded && (
                <div className="p-3.5 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Degree</label>
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                        placeholder="e.g. Bachelor of Science"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Field of Study / Major</label>
                      <input
                        type="text"
                        value={item.field}
                        onChange={(e) => updateItem(item.id, { field: e.target.value })}
                        placeholder="e.g. Computer Science"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Institution / University</label>
                      <input
                        type="text"
                        value={item.school}
                        onChange={(e) => updateItem(item.id, { school: e.target.value })}
                        placeholder="e.g. Stanford University"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Location</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                        placeholder="e.g. Stanford, CA"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Start Date</label>
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                        placeholder="e.g. 2017-09 or Sep 2017"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Graduation Date</label>
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                        placeholder="e.g. 2021-06 or Jun 2021"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">GPA (Optional)</label>
                      <input
                        type="text"
                        value={item.gpa || ''}
                        onChange={(e) => updateItem(item.id, { gpa: e.target.value })}
                        placeholder="e.g. 3.9 / 4.0"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Honors / Awards (Optional)</label>
                      <input
                        type="text"
                        value={item.honors || ''}
                        onChange={(e) => updateItem(item.id, { honors: e.target.value })}
                        placeholder="e.g. Magna Cum Laude, Dean's List"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
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
        <span>Add Education</span>
      </button>
    </div>
  );
};
