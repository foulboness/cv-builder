import React, { useState, KeyboardEvent } from 'react';
import { SkillCategory } from '../../../types';
import { Plus, Trash2, X, Tag } from 'lucide-react';

interface SkillsEditorProps {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ categories, onChange }) => {
  const [skillInputs, setSkillInputs] = useState<Record<string, string>>({});

  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: 'New Category',
      skills: [],
    };
    onChange([...categories, newCategory]);
  };

  const updateCategoryName = (id: string, name: string) => {
    onChange(categories.map((c) => (c.id === id ? { ...c, categoryName: name } : c)));
  };

  const removeCategory = (id: string) => {
    onChange(categories.filter((c) => c.id !== id));
  };

  const addSkillToCategory = (catId: string, skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return;
    if (cat.skills.includes(trimmed)) return;

    onChange(
      categories.map((c) =>
        c.id === catId ? { ...c, skills: [...c.skills, trimmed] } : c
      )
    );
    setSkillInputs((prev) => ({ ...prev, [catId]: '' }));
  };

  const removeSkillFromCategory = (catId: string, skillIdx: number) => {
    onChange(
      categories.map((c) =>
        c.id === catId ? { ...c, skills: c.skills.filter((_, idx) => idx !== skillIdx) } : c
      )
    );
  };

  const handleKeyDown = (catId: string, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkillToCategory(catId, skillInputs[catId] || '');
    }
  };

  return (
    <div className="space-y-4">
      {categories.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 bg-white">
          No skill categories yet. Click &quot;Add Skill Category&quot; to begin.
        </div>
      ) : (
        categories.map((cat) => (
          <div
            key={cat.id}
            className="p-3.5 bg-white border border-[#E5E2DC] rounded-lg space-y-3 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={cat.categoryName}
                onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Frontend & Tools)"
                className="text-xs font-semibold text-neutral-900 px-2 py-1 bg-[#FAF9F6] border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 flex-1"
              />
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="p-1 text-neutral-400 hover:text-red-600 rounded"
                title="Remove Category"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FAF9F6] border border-[#E5E2DC] text-neutral-800 text-[11px] font-medium rounded-full"
                >
                  <Tag size={10} className="text-neutral-400" />
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                    className="text-neutral-400 hover:text-red-500 ml-0.5 rounded-full"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}

              {/* Add tag input */}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={skillInputs[cat.id] || ''}
                  onChange={(e) =>
                    setSkillInputs((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onKeyDown={(e) => handleKeyDown(cat.id, e)}
                  placeholder="Type skill & hit Enter..."
                  className="text-xs px-2.5 py-1 bg-white border border-[#E5E2DC] rounded-full focus:outline-none focus:border-neutral-900 w-36 placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => addSkillToCategory(cat.id, skillInputs[cat.id] || '')}
                  className="p-1 bg-[#FAF9F6] hover:bg-neutral-100 border border-[#E5E2DC] text-neutral-700 rounded-full text-xs"
                  title="Add skill"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addCategory}
        className="w-full py-2 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus size={13} />
        <span>Add Skill Category</span>
      </button>
    </div>
  );
};
