import React, { useRef, useState } from 'react';
import { CVData } from '../types';
import {
  sampleCVProductDesigner,
  sampleCVSoftwareEngineer,
  sampleCVExecutive,
  emptyCVData,
} from '../data/initialData';
import { exportCVToJSON, importCVFromJSON } from '../utils/storage';
import { triggerPrint, exportToPDF } from '../utils/pdfExport';
import {
  Printer,
  Download,
  FileCode,
  UploadCloud,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  FileCheck,
  Layers,
  Loader2,
} from 'lucide-react';

interface HeaderProps {
  data: CVData;
  onUpdateData: (newData: CVData) => void;
  lastSavedTime: string;
}

export const Header: React.FC<HeaderProps> = ({ data, onUpdateData, lastSavedTime }) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportProgressText, setExportProgressText] = useState('');
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    setExportProgressText('Preparing PDF export...');
    const filename = `${(data.personal.fullName || 'Resume').trim().replace(/\s+/g, '_')}_CV.pdf`;

    const success = await exportToPDF(
      'cv-main-render-canvas',
      filename,
      data.theme.paperSize,
      (status) => setExportProgressText(status)
    );

    setIsExportingPDF(false);
    if (success) {
      showToast('PDF downloaded successfully');
    } else {
      showToast('PDF generation failed, opening standard print dialog...');
      triggerPrint();
    }
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const importedData = await importCVFromJSON(file);
        onUpdateData(importedData);
        showToast('CV data imported successfully');
      } catch (err) {
        alert('Invalid CV file. Please upload a valid JSON backup.');
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const loadPreset = (presetData: CVData) => {
    onUpdateData(presetData);
    setShowPresetsMenu(false);
    showToast(`Loaded ${presetData.title}`);
  };

  return (
    <>
      <header className="h-16 px-4 sm:px-6 bg-[#FAF9F6] border-b border-[#E2DDD5] flex items-center justify-between gap-3 shrink-0 no-print select-none z-30 relative">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
            CV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-neutral-900">
                CV Builder
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider bg-[#EBE7DF] text-neutral-700 px-2 py-0.5 rounded-full font-semibold">
                Editorial
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden md:block">
              Minimalist Document & Resume Creator
            </p>
          </div>
        </div>

        {/* Center Saved Status */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="flex items-center gap-1">
            <FileCheck size={13} className="text-neutral-400" />
            <span>Saved locally</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Preset Profiles Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="px-2.5 sm:px-3 py-1.5 bg-white hover:bg-neutral-50 border border-[#E2DDD5] text-neutral-700 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-600" />
              <span className="hidden sm:inline">Presets</span>
              <ChevronDown size={13} className="text-neutral-400" />
            </button>

            {showPresetsMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowPresetsMenu(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 bg-white border border-[#E2DDD5] rounded-xl shadow-lg p-1.5 z-50 text-xs space-y-1">
                  <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    Realistic Personas
                  </div>
                  <button
                    type="button"
                    onClick={() => loadPreset(sampleCVProductDesigner)}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#FAF9F6] rounded-lg flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 group-hover:text-black">
                        Product Design Lead
                      </div>
                      <div className="text-[11px] text-neutral-500">Elena Rostova • Editorial</div>
                    </div>
                    {data.id === sampleCVProductDesigner.id && <Check size={13} className="text-neutral-900" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(sampleCVSoftwareEngineer)}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#FAF9F6] rounded-lg flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 group-hover:text-black">
                        Full-Stack Engineer
                      </div>
                      <div className="text-[11px] text-neutral-500">Julian Vance • Swiss</div>
                    </div>
                    {data.id === sampleCVSoftwareEngineer.id && <Check size={13} className="text-neutral-900" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => loadPreset(sampleCVExecutive)}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#FAF9F6] rounded-lg flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-neutral-900 group-hover:text-black">
                        VP Growth & Operations
                      </div>
                      <div className="text-[11px] text-neutral-500">Clara Chen • Executive</div>
                    </div>
                    {data.id === sampleCVExecutive.id && <Check size={13} className="text-neutral-900" />}
                  </button>

                  <div className="border-t border-neutral-100 my-1" />

                  <button
                    type="button"
                    onClick={() => loadPreset(emptyCVData)}
                    className="w-full text-left px-2.5 py-1.5 hover:bg-red-50 text-red-600 rounded-lg flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <RotateCcw size={12} />
                    <span>Start with Blank Template</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Backup / Export JSON */}
          <button
            type="button"
            onClick={() => exportCVToJSON(data)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 bg-white hover:bg-neutral-50 border border-[#E2DDD5] text-neutral-700 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export JSON backup of this CV"
          >
            <FileCode size={13} />
            <span className="hidden md:inline">JSON</span>
          </button>

          {/* Import JSON File */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 sm:px-2.5 sm:py-1.5 bg-white hover:bg-neutral-50 border border-[#E2DDD5] text-neutral-700 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Import saved CV JSON file"
          >
            <UploadCloud size={13} />
            <span className="hidden md:inline">Import</span>
          </button>

          {/* Print / Save as PDF Button */}
          <button
            type="button"
            onClick={triggerPrint}
            className="px-2.5 sm:px-3 py-1.5 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print or Save via system dialog"
          >
            <Printer size={13} />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Direct Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isExportingPDF}
            className="px-3 sm:px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExportingPDF ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span className="hidden sm:inline">{exportProgressText || 'Exporting...'}</span>
              </>
            ) : (
              <>
                <Download size={13} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
