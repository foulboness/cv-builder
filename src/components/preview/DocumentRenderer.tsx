import React from 'react';
import { CVData } from '../../types';
import { EditorialTemplate } from './templates/EditorialTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { SwissTemplate } from './templates/SwissTemplate';
import { ContemporaryTemplate } from './templates/ContemporaryTemplate';
import { CreativeStudioTemplate } from './templates/CreativeStudioTemplate';

interface DocumentRendererProps {
  data: CVData;
  id?: string;
  isPrintMode?: boolean;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({ data, id = 'cv-preview-sheet', isPrintMode = false }) => {
  const { theme } = data;

  // Font family class
  const fontClass = {
    inter: 'font-inter',
    manrope: 'font-manrope',
    jakarta: 'font-jakarta',
    lora: 'font-lora',
    space: 'font-space',
  }[theme.fontFamily || 'manrope'];

  // Font size scale
  const fontSizeClass = {
    compact: 'text-[12.5px]',
    normal: 'text-[13.5px]',
    comfortable: 'text-[14.5px]',
  }[theme.fontSize || 'normal'];

  // Line spacing
  const lineSpacingClass = {
    dense: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  }[theme.lineSpacing || 'normal'];

  // Page margin padding (Executive has internal layout padding in sidebar, other templates use container padding)
  const isExecutive = theme.template === 'executive';
  const paddingClass = isExecutive
    ? ''
    : {
        compact: 'p-6 sm:p-8',
        normal: 'p-8 sm:p-10',
        spacious: 'p-10 sm:p-12',
      }[theme.pageMargin || 'normal'];

  // Dimension constraints: standard A4 is 210mm x 297mm (approx 1 : 1.414 ratio)
  // In Letter: 8.5 x 11 in (approx 1 : 1.294 ratio)
  const isLetter = theme.paperSize === 'letter';
  const minHeightStyle = isLetter ? 'min-h-[1056px]' : 'min-h-[1123px]'; // A4 pixel equivalent at ~96 DPI

  const renderTemplate = () => {
    switch (theme.template) {
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'swiss':
        return <SwissTemplate data={data} />;
      case 'contemporary':
        return <ContemporaryTemplate data={data} />;
      case 'creative':
        return <CreativeStudioTemplate data={data} />;
      case 'editorial':
      default:
        return <EditorialTemplate data={data} />;
    }
  };

  return (
    <div
      id={id}
      className={`cv-document-sheet relative w-full bg-white text-[#18181B] ${minHeightStyle} ${fontClass} ${fontSizeClass} ${lineSpacingClass} ${paddingClass} ${
        isPrintMode ? '' : 'shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#E7E5E0] rounded-sm transition-all duration-150'
      }`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {renderTemplate()}
    </div>
  );
};
