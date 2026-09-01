import React from 'react';
import { ReferenceItem } from '../../../types';
import { Plus, Trash2 } from 'lucide-react';

interface ReferencesEditorProps {
  items: ReferenceItem[];
  onChange: (items: ReferenceItem[]) => void;
}

export const ReferencesEditor: React.FC<ReferencesEditorProps> = ({ items, onChange }) => {
  const isAllAvailableUponRequest = items.length > 0 && items.every((r) => r.isAvailableUponRequest);

  const toggleAvailableUponRequest = (enabled: boolean) => {
    if (enabled) {
      onChange([
        {
          id: 'ref-default-avail',
          name: 'Available Upon Request',
          role: '',
          company: '',
          email: '',
          phone: '',
          isAvailableUponRequest: true,
        },
      ]);
    } else {
      onChange([
        {
          id: `ref-${Date.now()}`,
          name: '',
          role: '',
          company: '',
          email: '',
          phone: '',
          isAvailableUponRequest: false,
        },
      ]);
    }
  };

  const addItem = () => {
    const newItem: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      role: '',
      company: '',
      email: '',
      phone: '',
      isAvailableUponRequest: false,
    };
    onChange([...items.filter((r) => !r.isAvailableUponRequest), newItem]);
  };

  const updateItem = (id: string, updates: Partial<ReferenceItem>) => {
    onChange(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      {/* Quick toggle for available upon request */}
      <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded-lg flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-neutral-800">&quot;Available Upon Request&quot; Mode</div>
          <div className="text-[11px] text-neutral-500">Display a standard confidentiality statement</div>
        </div>
        <input
          type="checkbox"
          checked={isAllAvailableUponRequest}
          onChange={(e) => toggleAvailableUponRequest(e.target.checked)}
          className="rounded border-neutral-300 w-4 h-4 text-neutral-900 focus:ring-0 cursor-pointer"
        />
      </div>

      {!isAllAvailableUponRequest && (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-white border border-[#E5E2DC] rounded-lg space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  placeholder="Referee Name (e.g. Sarah Jenkins)"
                  className="text-xs font-semibold px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 flex-1"
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
                  value={item.role}
                  onChange={(e) => updateItem(item.id, { role: e.target.value })}
                  placeholder="Title / Role (e.g. VP of Product)"
                  className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(item.id, { company: e.target.value })}
                  placeholder="Company (e.g. Acme Tech)"
                  className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="email"
                  value={item.email}
                  onChange={(e) => updateItem(item.id, { email: e.target.value })}
                  placeholder="Email address"
                  className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="tel"
                  value={item.phone}
                  onChange={(e) => updateItem(item.id, { phone: e.target.value })}
                  placeholder="Phone number"
                  className="px-2.5 py-1 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full py-2 bg-white hover:bg-neutral-50 border border-dashed border-neutral-300 hover:border-neutral-400 text-neutral-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus size={13} />
            <span>Add Referee</span>
          </button>
        </div>
      )}
    </div>
  );
};
