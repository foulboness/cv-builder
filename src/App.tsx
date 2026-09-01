/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVData } from './types';
import { loadCVData, saveCVData } from './utils/storage';
import { Header } from './components/Header';
import { EditorPanel } from './components/editor/EditorPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { Edit3, Eye } from 'lucide-react';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(() => loadCVData());
  const [lastSaved, setLastSaved] = useState<string>('Just now');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Auto-save CV data locally whenever changes occur
  useEffect(() => {
    saveCVData(cvData);
    setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [cvData]);

  const handleUpdateData = (newData: CVData) => {
    setCvData(newData);
  };

  const handleChangeTheme = (updates: Partial<CVData['theme']>) => {
    setCvData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...updates },
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FAF9F6] text-[#18181B]">
      {/* Top Application Header */}
      <Header data={cvData} onUpdateData={handleUpdateData} lastSavedTime={lastSaved} />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column: CV Editor Panel */}
        <section
          aria-label="CV Editor"
          className={`w-full lg:w-[480px] xl:w-[540px] shrink-0 h-full flex flex-col z-10 transition-all ${
            mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <EditorPanel data={cvData} onChange={handleUpdateData} />
        </section>

        {/* Right Column: Live A4 Document Preview */}
        <section
          aria-label="CV Preview"
          className={`flex-1 h-full min-w-0 flex flex-col transition-all ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <PreviewPanel data={cvData} onChangeTheme={handleChangeTheme} />
        </section>
      </div>

      {/* Mobile Bottom Tab Switcher */}
      <div className="lg:hidden h-12 bg-white border-t border-[#E2DDD5] flex items-center justify-around px-4 shrink-0 no-print">
        <button
          type="button"
          onClick={() => setMobileView('editor')}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mobileView === 'editor'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Edit3 size={14} />
          <span>Editor</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mobileView === 'preview'
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Eye size={14} />
          <span>Preview CV</span>
        </button>
      </div>
    </div>
  );
}
