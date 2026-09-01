import React, { useState } from 'react';
import { ProjectItem } from '../../../types';
import { Plus, Trash2, ChevronUp, ChevronDown, PlusCircle, X, GripVertical } from 'lucide-react';

interface ProjectsEditorProps {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ items, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const addItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      link: '',
      githubLink: '',
      startDate: '',
      endDate: '',
      highlights: [''],
      techStack: [],
    };
    onChange([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<ProjectItem>) => {
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
          No projects yet. Click &quot;Add Project&quot; to showcase your work.
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
                    {item.title || 'Untitled Project'}
                    {item.role && <span className="font-normal text-neutral-500 text-[11px]"> ({item.role})</span>}
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
                      <label className="text-[11px] font-semibold text-neutral-700">Project Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        placeholder="e.g. Prism Design System"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Role on Project</label>
                      <input
                        type="text"
                        value={item.role}
                        onChange={(e) => updateItem(item.id, { role: e.target.value })}
                        placeholder="e.g. Lead Architect & Designer"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">Live URL / Demo</label>
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => updateItem(item.id, { link: e.target.value })}
                        placeholder="https://project.com"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700">GitHub / Code Repo</label>
                      <input
                        type="text"
                        value={item.githubLink || ''}
                        onChange={(e) => updateItem(item.id, { githubLink: e.target.value })}
                        placeholder="https://github.com/user/repo"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-semibold text-neutral-700">
                        Tech Stack (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={item.techStack?.join(', ') || ''}
                        onChange={(e) =>
                          updateItem(item.id, {
                            techStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                          })
                        }
                        placeholder="e.g. React, TypeScript, Tailwind CSS, GraphQL"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Bullet points highlights */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-semibold text-neutral-700">Key Highlights</label>
                      <button
                        type="button"
                        onClick={() => updateItem(item.id, { highlights: [...item.highlights, ''] })}
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
                            onChange={(e) => {
                              const newH = [...item.highlights];
                              newH[bIdx] = e.target.value;
                              updateItem(item.id, { highlights: newH });
                            }}
                            placeholder="Describe architecture, user adoption, or impact..."
                            className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 resize-y"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateItem(item.id, {
                                highlights: item.highlights.filter((_, idx) => idx !== bIdx),
                              });
                            }}
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
        <span>Add Project</span>
      </button>
    </div>
  );
};
