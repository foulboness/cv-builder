import React from 'react';
import { CVTheme, FontFamilyType, FontSizeScale, LineSpacingScale, PageMarginScale, PaperSize, TemplateType } from '../../types';
import { Check, Type, Sliders, Palette, FileText, Columns, LayoutGrid, FileSpreadsheet, Sparkles } from 'lucide-react';

interface AppearanceEditorProps {
  theme: CVTheme;
  onChange: (updates: Partial<CVTheme>) => void;
}

export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({ theme, onChange }) => {
  const templates: {
    id: TemplateType;
    name: string;
    description: string;
    icon: React.ElementType;
    badge: string;
  }[] = [
    {
      id: 'editorial',
      name: 'Editorial Minimalist',
      description: 'Refined classical typography with hairline dividers and balanced white space.',
      icon: FileText,
      badge: 'Classic',
    },
    {
      id: 'executive',
      name: 'Modern Executive',
      description: 'Sophisticated two-column layout with tinted sidebar for skills and credentials.',
      icon: Columns,
      badge: 'Leadership',
    },
    {
      id: 'swiss',
      name: 'Swiss Modernist',
      description: 'Disciplined grid layout with bold modernist numbering and clean typography.',
      icon: LayoutGrid,
      badge: 'Grid',
    },
    {
      id: 'contemporary',
      name: 'Contemporary Compact',
      description: 'High-density single-column with colored timeline accent markers.',
      icon: FileSpreadsheet,
      badge: 'Tech & SaaS',
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      description: 'Subtle warm header pill banner, stylish cards, and rounded tag badges.',
      icon: Sparkles,
      badge: 'Design',
    },
  ];

  const fonts: { id: FontFamilyType; name: string; category: string; className: string }[] = [
    { id: 'manrope', name: 'Manrope', category: 'Modern Geometric Sans', className: 'font-manrope' },
    { id: 'inter', name: 'Inter', category: 'Neutral Neo-Grotesque Sans', className: 'font-inter' },
    { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'Refined Display Sans', className: 'font-jakarta' },
    { id: 'lora', name: 'Lora', category: 'Contemporary Editorial Serif', className: 'font-lora' },
    { id: 'space', name: 'Space Grotesk', category: 'Tech & Architecture Mono/Sans', className: 'font-space' },
  ];

  const presetColors = [
    { name: 'Noir / Charcoal', hex: '#18181B' },
    { name: 'Warm Taupe', hex: '#78716C' },
    { name: 'Pine Teal', hex: '#0F766E' },
    { name: 'Amber Bronze', hex: '#854D0E' },
    { name: 'Deep Navy', hex: '#1E293B' },
    { name: 'Burgundy', hex: '#881337' },
    { name: 'Terracotta', hex: '#9A3412' },
    { name: 'Forest Olive', hex: '#365314' },
    { name: 'Royal Indigo', hex: '#3730A3' },
  ];

  return (
    <div className="space-y-6">
      {/* Templates Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <Palette size={13} className="text-neutral-500" />
          <span>Curated CV Templates</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {templates.map((tmpl) => {
            const Icon = tmpl.icon;
            const isSelected = theme.template === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onChange({ template: tmpl.id })}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-neutral-900 bg-[#FAF9F6] ring-1 ring-neutral-900 shadow-xs'
                    : 'border-[#E5E2DC] bg-white hover:border-neutral-400 hover:bg-[#FAF9F6]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{tmpl.name}</div>
                      <span className="text-[10px] text-neutral-400 font-mono uppercase">{tmpl.badge}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                      <Check size={10} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">{tmpl.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typography Selector */}
      <div className="space-y-3 pt-3 border-t border-neutral-200">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <Type size={13} className="text-neutral-500" />
          <span>Typography Family</span>
        </label>

        <div className="grid grid-cols-1 gap-2">
          {fonts.map((f) => {
            const isSelected = theme.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ fontFamily: f.id })}
                className={`p-2.5 px-3 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 bg-[#FAF9F6] ring-1 ring-neutral-900'
                    : 'border-[#E5E2DC] bg-white hover:border-neutral-400'
                }`}
              >
                <div className="flex items-baseline gap-2.5">
                  <span className={`text-sm font-semibold text-neutral-900 ${f.className}`}>{f.name}</span>
                  <span className="text-[11px] text-neutral-400">{f.category}</span>
                </div>
                {isSelected && <Check size={14} className="text-neutral-900" strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-3 pt-3 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
            <Palette size={13} className="text-neutral-500" />
            <span>Accent Tone</span>
          </label>
          <span className="text-[11px] font-mono text-neutral-500">{theme.accentColor}</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
          {presetColors.map((c) => {
            const isSelected = theme.accentColor?.toLowerCase() === c.hex.toLowerCase();
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => onChange({ accentColor: c.hex })}
                className="group relative flex flex-col items-center gap-1 cursor-pointer"
                title={c.name}
              >
                <div
                  className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && <Check size={12} className="text-white drop-shadow-xs" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Hex Color input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="color"
            value={theme.accentColor || '#18181B'}
            onChange={(e) => onChange({ accentColor: e.target.value })}
            className="w-8 h-8 rounded border border-[#E5E2DC] p-0.5 bg-white cursor-pointer"
          />
          <input
            type="text"
            value={theme.accentColor || '#18181B'}
            onChange={(e) => onChange({ accentColor: e.target.value })}
            placeholder="#18181B"
            className="text-xs font-mono px-3 py-1.5 bg-white border border-[#E5E2DC] rounded focus:outline-none focus:border-neutral-900 w-32"
          />
          <span className="text-[11px] text-neutral-500">Custom Accent Hex</span>
        </div>
      </div>

      {/* Spacing & Page Scaling Controls */}
      <div className="space-y-4 pt-3 border-t border-neutral-200">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <Sliders size={13} className="text-neutral-500" />
          <span>Page Density & Sizing</span>
        </label>

        {/* Base Font Size Scale */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-neutral-700 font-medium">
            <span>Font Scale</span>
            <span className="text-neutral-400 capitalize">{theme.fontSize}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['compact', 'normal', 'comfortable'] as FontSizeScale[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => onChange({ fontSize: sz })}
                className={`py-1.5 text-xs font-medium rounded-md border capitalize transition-all cursor-pointer ${
                  theme.fontSize === sz
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-white text-neutral-700 border-[#E5E2DC] hover:bg-neutral-50'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-neutral-700 font-medium">
            <span>Line Spacing</span>
            <span className="text-neutral-400 capitalize">{theme.lineSpacing}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['dense', 'normal', 'relaxed'] as LineSpacingScale[]).map((ls) => (
              <button
                key={ls}
                type="button"
                onClick={() => onChange({ lineSpacing: ls })}
                className={`py-1.5 text-xs font-medium rounded-md border capitalize transition-all cursor-pointer ${
                  theme.lineSpacing === ls
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-white text-neutral-700 border-[#E5E2DC] hover:bg-neutral-50'
                }`}
              >
                {ls}
              </button>
            ))}
          </div>
        </div>

        {/* Margins */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-neutral-700 font-medium">
            <span>Page Margins</span>
            <span className="text-neutral-400 capitalize">{theme.pageMargin}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['compact', 'normal', 'spacious'] as PageMarginScale[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => onChange({ pageMargin: pm })}
                className={`py-1.5 text-xs font-medium rounded-md border capitalize transition-all cursor-pointer ${
                  theme.pageMargin === pm
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-white text-neutral-700 border-[#E5E2DC] hover:bg-neutral-50'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>

        {/* Paper Size */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-neutral-700 font-medium">
            <span>Paper Format</span>
            <span className="text-neutral-400 uppercase">{theme.paperSize}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(['a4', 'letter'] as PaperSize[]).map((ps) => (
              <button
                key={ps}
                type="button"
                onClick={() => onChange({ paperSize: ps })}
                className={`py-1.5 text-xs font-medium rounded-md border uppercase transition-all cursor-pointer ${
                  theme.paperSize === ps
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                    : 'bg-white text-neutral-700 border-[#E5E2DC] hover:bg-neutral-50'
                }`}
              >
                {ps === 'a4' ? 'A4 (210 × 297mm)' : 'US Letter (8.5 × 11in)'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
