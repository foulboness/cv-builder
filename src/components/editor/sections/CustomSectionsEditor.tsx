import React, { useState } from 'react';
import { CustomSection, CustomSectionItem } from '../../../types';
import { Plus, Trash2, ChevronDown, ChevronUp, PlusCircle, X, Layers } from 'lucide-react';

interface CustomSectionsEditorProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
  onAddSectionToOrder: (sectionId: string, title: string) => void;
  onRemoveSectionFromOrder: (sectionId: string) => void;
}

export const CustomSectionsEditor: React.FC<CustomSectionsEditorProps> = ({
  sections,
  onChange,
  onAddSectionToOrder,
  onRemoveSectionFromOrder,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(sections[0]?.id || null);

  const createSection = () => {
    const title = newTitle.trim() || 'Custom Section';
    const newSec: CustomSection = {
      id: `custom-${Date.now()}`,
      title,
      items: [
        {
          id: `item-${Date.now()}`,
          title: '',
          subtitle: '',
          date: '',
          description: '',
          highlights: [''],
        },
      ],
    };
    onChange([...sections, newSec]);
    onAddSectionToOrder(newSec.id, newSec.title);
    setNewTitle('');
    setExpandedSectionId(newSec.id);
  };

  const removeSection = (sectionId: string) => {
    onChange(sections.filter((s) => s.id !== sectionId));
    onRemoveSectionFromOrder(sectionId);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    onChange(sections.map((s) => (s.id === sectionId ? { ...s, title } : s)));
  };

  const addItemToSection = (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: `item-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      highlights: [''],
    };
    onChange(
      sections.map((s) => (s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s))
    );
  };

  const updateItem = (sectionId: string, itemId: string, updates: Partial<CustomSectionItem>) => {
    onChange(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
            }
          : s
      )
    );
  };

  const removeItem = (sectionId: string, itemId: string) => {
    onChange(
      sections.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Add Custom Section Bar */}
      <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded-lg space-y-2">
        <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
          <Layers size={12} className="text-neutral-500" />
          <span>Create New Custom Section</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Publications, Awards, Volunteering..."
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                createSection();
              }
            }}
          />
          <button
            type="button"
            onClick={createSection}
            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus size={13} />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Existing Custom Sections */}
      {sections.map((sec) => {
        const isExpanded = expandedSectionId === sec.id;
        return (
          <div
            key={sec.id}
            className="bg-white border border-[#E5E2DC] rounded-lg overflow-hidden transition-all shadow-2xs"
          >
            <div
              className="p-3 bg-[#FAF9F6] border-b border-[#EBE8E1] flex items-center justify-between gap-2 cursor-pointer select-none"
              onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
            >
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                <Layers size={13} className="text-neutral-500 shrink-0" />
                <input
                  type="text"
                  value={sec.title}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateSectionTitle(sec.id, e.target.value)}
                  className="text-xs font-semibold text-neutral-900 bg-transparent border-b border-dashed border-neutral-300 hover:border-neutral-700 px-1 py-0.5 focus:bg-white focus:outline-none flex-1 max-w-xs"
                />
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => removeSection(sec.id)}
                  className="p-1 text-neutral-400 hover:text-red-600 rounded"
                  title="Delete Section"
                >
                  <Trash2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedSectionId(isExpanded ? null : sec.id)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 rounded"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="p-3.5 space-y-4">
                {sec.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#FAF9F6] border border-[#EBE8E1] rounded-md space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(sec.id, item.id, { title: e.target.value })}
                        placeholder="Item Title (e.g. Keynote Speaker or Award Name)"
                        className="text-xs font-semibold px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(sec.id, item.id)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        value={item.subtitle || ''}
                        onChange={(e) => updateItem(sec.id, item.id, { subtitle: e.target.value })}
                        placeholder="Subtitle / Organization"
                        className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                      />
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => updateItem(sec.id, item.id, { date: e.target.value })}
                        placeholder="Date (e.g. 2023)"
                        className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    {/* Bullet point */}
                    <div className="space-y-1.5">
                      {item.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <span className="text-neutral-400 text-xs">•</span>
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const newH = [...item.highlights];
                              newH[bIdx] = e.target.value;
                              updateItem(sec.id, item.id, { highlights: newH });
                            }}
                            placeholder="Detail / description bullet..."
                            className="flex-1 px-2 py-1 text-xs bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateItem(sec.id, item.id, {
                                highlights: item.highlights.filter((_, idx) => idx !== bIdx),
                              });
                            }}
                            className="p-1 text-neutral-400 hover:text-red-500 rounded"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          updateItem(sec.id, item.id, {
                            highlights: [...item.highlights, ''],
                          })
                        }
                        className="text-[11px] text-neutral-600 hover:text-neutral-900 flex items-center gap-1 font-medium pt-1"
                      >
                        <PlusCircle size={11} />
                        <span>Add Bullet</span>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addItemToSection(sec.id)}
                  className="w-full py-1.5 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 text-neutral-700 text-xs font-medium rounded flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  <span>Add Item to {sec.title}</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
