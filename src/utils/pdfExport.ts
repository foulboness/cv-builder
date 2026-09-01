import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { PaperSize } from '../types';

export function triggerPrint(): void {
  window.print();
}

export async function exportToPDF(
  elementId: string,
  fileName: string = 'Resume.pdf',
  paperSize: PaperSize = 'a4',
  onProgress?: (status: string) => void
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    if (onProgress) onProgress('Preparing document...');

    // A4 dimensions in mm: 210 x 297, Letter: 215.9 x 279.4
    const format = paperSize === 'letter' ? 'letter' : 'a4';

    if (onProgress) onProgress('Rendering high-resolution vector snapshot...');

    // Ensure web fonts are fully loaded
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const imgData = await toPng(element, {
      pixelRatio: 2, // Crisp high-DPI rasterization
      backgroundColor: '#ffffff',
      cacheBust: false,
      skipFonts: true,
    });

    if (onProgress) onProgress('Generating PDF document...');

    // Load image to determine natural dimensions
    const img = new Image();
    img.src = imgData;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: format,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (img.naturalHeight * pdfWidth) / img.naturalWidth;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Subsequent pages if CV overflows a single page (threshold of 2mm to avoid blank pages)
    while (heightLeft > 2) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    if (onProgress) onProgress('Saving file...');
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF Export Error:', error);
    return false;
  }
}

