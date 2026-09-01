import React from 'react';
import { CertificationItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsEditorProps {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export const CertificationsEditor: React.FC<CertificationsEditorProps> = ({ items, onChange }) => {
  const addItem = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      credentialId: '',
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, updates: Partial<CertificationItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 bg-white">
          No certifications added yet.
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white border border-[#E5E2DC] rounded-lg space-y-2.5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                placeholder="Certification Title (e.g. AWS Solutions Architect)"
                className="text-xs font-semibold text-neutral-900 px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 flex-1"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-1 text-neutral-400 hover:text-red-600 rounded"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={item.issuer}
                onChange={(e) => updateItem(item.id, { issuer: e.target.value })}
                placeholder="Issuer (e.g. Amazon Web Services)"
                className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
              />
              <input
                type="text"
                value={item.date}
                onChange={(e) => updateItem(item.id, { date: e.target.value })}
                placeholder="Date (e.g. 2023)"
                className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 font-mono"
              />
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Plus size={13} />
        <span>Add Certification</span>
      </button>
    </div>
  );
};
