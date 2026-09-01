import React, { useState, useRef, useEffect } from 'react';
import { CVData } from '../../types';
import { DocumentRenderer } from './DocumentRenderer';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileText,
} from 'lucide-react';

interface PreviewPanelProps {
  data: CVData;
  onChangeTheme: (updates: Partial<CVData['theme']>) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data, onChangeTheme }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPageGuides, setShowPageGuides] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial fit based on window size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width < 600) {
          setZoomLevel(Math.max(0.45, Math.min(0.65, (width - 40) / 794)));
        } else if (width < 900) {
          setZoomLevel(0.75);
        } else {
          setZoomLevel(0.85);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.4, Math.max(0.4, Number((prev + delta).toFixed(2)))));
  };

  const handleFit = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const target = (width - 64) / 794;
      setZoomLevel(Math.min(1.1, Math.max(0.45, Number(target.toFixed(2)))));
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-[#EFECE6] border-l border-[#E2DDD5] overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 bg-[#EFECE6]' : 'relative'
      }`}
    >
      {/* Top Preview Control Bar */}
      <div className="h-12 px-4 bg-[#F8F7F4] border-b border-[#E2DDD5] flex items-center justify-between gap-3 shrink-0 no-print select-none">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700">
          <FileText size={14} className="text-neutral-500" />
          <span>Live Document Preview</span>
        </div>

        {/* Zoom & Format Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Paper Size selector */}
          <div className="hidden sm:flex items-center bg-[#EBE7DF] rounded-md p-0.5 text-[11px] font-medium text-neutral-600">
            <button
              onClick={() => onChangeTheme({ paperSize: 'a4' })}
              className={`px-2 py-0.5 rounded transition-all ${
                data.theme.paperSize === 'a4' ? 'bg-white text-neutral-900 font-semibold shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              A4
            </button>
            <button
              onClick={() => onChangeTheme({ paperSize: 'letter' })}
              className={`px-2 py-0.5 rounded transition-all ${
                data.theme.paperSize === 'letter' ? 'bg-white text-neutral-900 font-semibold shadow-2xs' : 'hover:text-neutral-900'
              }`}
            >
              Letter
            </button>
          </div>

          <div className="h-4 w-px bg-neutral-300 hidden sm:block" />

          {/* Zoom controls */}
          <div className="flex items-center bg-[#EBE7DF] rounded-md p-0.5 text-neutral-700">
            <button
              onClick={() => handleZoom(-0.1)}
              disabled={zoomLevel <= 0.45}
              className="p-1 hover:bg-white hover:text-neutral-900 rounded disabled:opacity-40 transition-colors"
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={handleFit}
              className="px-2 py-0.5 text-xs font-medium font-mono hover:bg-white hover:text-neutral-900 rounded transition-colors"
              title="Fit to width"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => handleZoom(0.1)}
              disabled={zoomLevel >= 1.35}
              className="p-1 hover:bg-white hover:text-neutral-900 rounded disabled:opacity-40 transition-colors"
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-[#EBE7DF] rounded-md transition-colors"
            title={isFullscreen ? 'Exit full screen' : 'Expand preview full screen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Main Interactive Scaled Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print-page-container scroll-smooth"
      >
        <div
          className="transition-transform duration-100 ease-out origin-top shrink-0 relative"
          style={{
            transform: `scale(${zoomLevel})`,
            width: data.theme.paperSize === 'letter' ? '816px' : '794px', // 210mm @ 96 DPI = 794px, Letter = 816px
          }}
        >
          {/* Subtle Page Break Boundary Guide (approx 1123px standard A4 page height) */}
          {showPageGuides && (
            <div
              className="absolute left-0 right-0 top-[1123px] border-b-2 border-dashed border-red-300 pointer-events-none no-print z-20 flex justify-end pr-2"
              title="Page 1 end boundary"
            >
              <span className="bg-red-50 text-red-500 font-mono text-[9px] px-1.5 py-0.5 rounded-b uppercase font-semibold">
                Page 1 Boundary
              </span>
            </div>
          )}

          <DocumentRenderer data={data} id="cv-main-render-canvas" />
        </div>
      </div>

      {/* Footer Info / Page stats */}
      <div className="h-8 px-4 bg-[#F8F7F4] border-t border-[#E2DDD5] flex items-center justify-between text-[11px] text-neutral-500 shrink-0 no-print">
        <div className="flex items-center gap-3">
          <span>
            Template:{' '}
            <strong className="text-neutral-700 font-medium capitalize">{data.theme.template}</strong>
          </span>
          <span>•</span>
          <span>
            Font:{' '}
            <strong className="text-neutral-700 font-medium capitalize">{data.theme.fontFamily}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPageGuides}
              onChange={(e) => setShowPageGuides(e.target.checked)}
              className="rounded border-neutral-300 text-neutral-800 focus:ring-0 w-3 h-3"
            />
            <span>Page Break Guide</span>
          </label>
          <span>•</span>
          <span>A4 (210 × 297 mm)</span>
        </div>
      </div>
    </div>
  );
};
