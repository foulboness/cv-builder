import React from 'react';
import { ProfileSummary } from '../../../types';

interface SummaryEditorProps {
  data: ProfileSummary;
  onChange: (updates: ProfileSummary) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[11px] text-neutral-500">
        <span>A concise summary highlighting your core expertise, career highlights, and value proposition.</span>
        <span className="font-mono text-[10px]">{data.content.length} chars</span>
      </div>
      <textarea
        rows={4}
        value={data.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write a concise overview of your background, achievements, and technical strengths..."
        className="w-full px-3 py-2.5 text-xs bg-white border border-[#E5E2DC] rounded-md focus:outline-none focus:border-neutral-900 leading-relaxed transition-colors resize-y min-h-[90px]"
      />
    </div>
  );
};
