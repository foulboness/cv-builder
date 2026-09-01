import React from 'react';
import { LanguageItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface LanguagesEditorProps {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

export const LanguagesEditor: React.FC<LanguagesEditorProps> = ({ items, onChange }) => {
  const addItem = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<LanguageItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const proficiencies: LanguageItem['proficiency'][] = [
    'Native',
    'Fluent',
    'Professional',
    'Intermediate',
    'Elementary',
  ];

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 bg-white">
          No languages added yet.
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white border border-[#E5E2DC] rounded-lg flex items-center gap-2 shadow-2xs"
          >
            <input
              type="text"
              value={item.language}
              onChange={(e) => updateItem(item.id, { language: e.target.value })}
              placeholder="Language (e.g. English, Spanish)"
              className="text-xs font-semibold px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 flex-1"
            />
            <select
              value={item.proficiency}
              onChange={(e) =>
                updateItem(item.id, { proficiency: e.target.value as LanguageItem['proficiency'] })
              }
              className="text-xs px-2.5 py-1.5 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
            >
              {proficiencies.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="p-1 text-neutral-400 hover:text-red-600 rounded"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus size={13} />
        <span>Add Language</span>
      </button>
    </div>
  );
};
