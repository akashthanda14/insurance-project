import jsPDF from 'jspdf';

export interface PDFData {
  title: string;
  subtitle: string;
  results: {
    totalAmount: number;
    contributions: number;
    returns: number;
    roiRate: number;
  };
  inputs: Record<string, any>;
  disclaimers?: string[];
}

export interface PDFConfig {
  filename: string;
  headerColor?: [number, number, number];
  logoUrl?: string;
}

class PDFService {
  private readonly COMPANY_INFO = {
    name: 'Investor Insurance',
    email: 'info@investorinsurance.ca',
    tagline: 'Your Financial Planning Partner',
    address: 'Licensed Financial Planning Services',
    website: 'investorinsurance.ca'
  };

  private readonly COLORS = {
    primary: [48, 83, 153] as [number, number, number],
    secondary: [74, 111, 173] as [number, number, number],
    text: [45, 55, 72] as [number, number, number],
    textLight: [113, 128, 150] as [number, number, number],
    accent: [5, 150, 105] as [number, number, number],
    warning: [245, 158, 11] as [number, number, number]
  };

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  private formatPercentage(value: number): string {
    return `${value}%`;
  }

  private addCompanyHeader(pdf: jsPDF, pageWidth: number): number {
    let yPos = 25;
    
    // Company Logo/Icon (text-based for simplicity)
    pdf.setFontSize(24);
    pdf.setTextColor(...this.COLORS.primary);
    pdf.text('🏛️', 25, yPos);
    
    // Company Name
    pdf.setFontSize(20);
    pdf.setTextColor(...this.COLORS.primary);
    pdf.text(this.COMPANY_INFO.name, 45, yPos);
    
    // Tagline
    yPos += 8;
    pdf.setFontSize(12);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text(this.COMPANY_INFO.tagline, 45, yPos);
    
    // Contact Info
    yPos += 6;
    pdf.setFontSize(10);
    pdf.text(`${this.COMPANY_INFO.email} | ${this.COMPANY_INFO.website}`, 45, yPos);
    
    // Divider line
    yPos += 10;
    pdf.setDrawColor(...this.COLORS.primary);
    pdf.setLineWidth(0.5);
    pdf.line(25, yPos, pageWidth - 25, yPos);
    
    return yPos + 15;
  }

  private addSummarySection(pdf: jsPDF, data: PDFData, startY: number, pageWidth: number): number {
    let yPos = startY;
    
    // Title
    pdf.setFontSize(18);
    pdf.setTextColor(...this.COLORS.text);
    pdf.text(data.title, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    pdf.setFontSize(12);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text(data.subtitle, pageWidth / 2, yPos, { align: 'center' });
    
    // Results Box
    yPos += 25;
    const boxHeight = 60;
    const boxWidth = pageWidth - 50;
    
    // Box background
    pdf.setFillColor(248, 250, 252);
    pdf.rect(25, yPos - 5, boxWidth, boxHeight, 'F');
    
    // Box border
    pdf.setDrawColor(...this.COLORS.primary);
    pdf.setLineWidth(1);
    pdf.rect(25, yPos - 5, boxWidth, boxHeight, 'S');
    
    // Total Amount - Center highlight
    pdf.setFontSize(24);
    pdf.setTextColor(...this.COLORS.primary);
    pdf.text(this.formatCurrency(data.results.totalAmount), pageWidth / 2, yPos + 15, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text('Total Projected Amount', pageWidth / 2, yPos + 25, { align: 'center' });
    
    // Three columns for breakdown
    const colWidth = boxWidth / 3;
    const col1X = 40;
    const col2X = col1X + colWidth;
    const col3X = col2X + colWidth;
    
    // Contributions
    pdf.setFontSize(14);
    pdf.setTextColor(...this.COLORS.text);
    pdf.text(this.formatCurrency(data.results.contributions), col1X, yPos + 40, { align: 'center' });
    pdf.setFontSize(10);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text('Your Contributions', col1X, yPos + 48, { align: 'center' });
    
    // Returns
    pdf.setFontSize(14);
    pdf.setTextColor(...this.COLORS.accent);
    pdf.text(this.formatCurrency(data.results.returns), col2X, yPos + 40, { align: 'center' });
    pdf.setFontSize(10);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text('Investment Growth', col2X, yPos + 48, { align: 'center' });
    
    // ROI
    pdf.setFontSize(14);
    pdf.setTextColor(...this.COLORS.primary);
    pdf.text(this.formatPercentage(data.results.roiRate), col3X, yPos + 40, { align: 'center' });
    pdf.setFontSize(10);
    pdf.setTextColor(...this.COLORS.textLight);
    pdf.text('Annual Return', col3X, yPos + 48, { align: 'center' });
    
    return yPos + boxHeight + 20;
  }

  private addInputSection(pdf: jsPDF, data: PDFData, startY: number, pageHeight: number): number {
    let yPos = startY;
    
    // Section header
    pdf.setFontSize(16);
    pdf.setTextColor(...this.COLORS.text);
    pdf.text('Input Parameters', 25, yPos);
    
    yPos += 15;
    pdf.setFontSize(12);
    pdf.setTextColor(...this.COLORS.text);
    
    // Input parameters in two columns
    const leftCol = 25;
    const rightCol = 120;
    const lineHeight = 12;
    let currentCol = leftCol;
    let paramCount = 0;
    
    Object.entries(data.inputs).forEach(([key, value]) => {
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = this.addCompanyHeader(pdf, pdf.internal.pageSize.getWidth()) + 10;
      }
      
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      let formattedValue = value?.toString() || 'N/A';
      
      // Format currency values
      if (typeof value === 'number' && key.toLowerCase().includes('amount')) {
        formattedValue = this.formatCurrency(value);
      }
      
      // Truncate long values
      if (formattedValue.length > 30) {
        formattedValue = formattedValue.substring(0, 27) + '...';
      }
      
      pdf.setTextColor(...this.COLORS.textLight);
      pdf.text(`${formattedKey}:`, currentCol, yPos);
      pdf.setTextColor(...this.COLORS.text);
      pdf.text(formattedValue, currentCol, yPos + 6);
      
      paramCount++;
      if (paramCount % 2 === 0) {
        yPos += lineHeight + 8;
        currentCol = leftCol;
      } else {
        currentCol = rightCol;
      }
    });
    
    if (paramCount % 2 !== 0) {
      yPos += lineHeight + 8;
    }
    
    return yPos + 10;
  }

  private addDisclaimersSection(pdf: jsPDF, data: PDFData, startY: number, pageWidth: number, pageHeight: number): number {
    if (!data.disclaimers || data.disclaimers.length === 0) return startY;
    
    let yPos = startY + 20;
    
    if (yPos > pageHeight - 80) {
      pdf.addPage();
      yPos = this.addCompanyHeader(pdf, pageWidth) + 10;
    }
    
    // Warning box
    const boxHeight = 15;
    pdf.setFillColor(254, 243, 199); // Light amber
    pdf.rect(25, yPos - 5, pageWidth - 50, boxHeight, 'F');
    pdf.setDrawColor(...this.COLORS.warning);
    pdf.setLineWidth(0.5);
    pdf.rect(25, yPos - 5, pageWidth - 50, boxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setTextColor(...this.COLORS.warning);
    pdf.text('⚠️ Important Disclaimers', 30, yPos + 5);
    
    yPos += 25;
    pdf.setFontSize(10);
    pdf.setTextColor(...this.COLORS.text);
    
    data.disclaimers.forEach((disclaimer, index) => {
      if (yPos > pageHeight - 30) {
        pdf.addPage();
        yPos = this.addCompanyHeader(pdf, pageWidth) + 10;
      }
      
      const lines = pdf.splitTextToSize(`${index + 1}. ${disclaimer}`, pageWidth - 55);
      lines.forEach((line: string) => {
        if (yPos > pageHeight - 25) {
          pdf.addPage();
          yPos = this.addCompanyHeader(pdf, pageWidth) + 10;
        }
        pdf.text(line, 30, yPos);
        yPos += 12;
      });
      yPos += 5; // Extra space between disclaimers
    });
    
    return yPos;
  }

  private addFooter(pdf: jsPDF, pageWidth: number, pageHeight: number): void {
    const footerY = pageHeight - 25;
    
    // Footer background
    pdf.setFillColor(26, 32, 44); // Dark background
    pdf.rect(0, footerY - 10, pageWidth, 35, 'F');
    
    // Company info
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.text(this.COMPANY_INFO.name, pageWidth / 2, footerY, { align: 'center' });
    
    pdf.setFontSize(8);
    pdf.setTextColor(160, 174, 192);
    pdf.text(`${this.COMPANY_INFO.email} | ${this.COMPANY_INFO.address}`, pageWidth / 2, footerY + 6, { align: 'center' });
    
    const currentDate = new Date().toLocaleDateString('en-CA');
    pdf.text(`Generated on ${currentDate}`, pageWidth / 2, footerY + 12, { align: 'center' });
  }

  public generateCalculatorPDF(data: PDFData, config: PDFConfig = { filename: 'calculation-results.pdf' }): jsPDF {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add company header
    let yPosition = this.addCompanyHeader(pdf, pageWidth);
    
    // Add summary section
    yPosition = this.addSummarySection(pdf, data, yPosition, pageWidth);
    
    // Add input parameters
    yPosition = this.addInputSection(pdf, data, yPosition, pageHeight);
    
    // Add disclaimers
    this.addDisclaimersSection(pdf, data, yPosition, pageWidth, pageHeight);
    
    // Add footer to all pages
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      this.addFooter(pdf, pageWidth, pageHeight);
    }
    
    return pdf;
  }

  public downloadPDF(data: PDFData, config: PDFConfig): void {
    const pdf = this.generateCalculatorPDF(data, config);
    pdf.save(config.filename);
  }

  public getPDFBase64(data: PDFData, config: PDFConfig = { filename: 'calculation.pdf' }): string {
    const pdf = this.generateCalculatorPDF(data, config);
    return pdf.output('datauristring').split(',')[1];
  }

  // Generate a preview thumbnail (useful for UI)
  public generateThumbnail(data: PDFData): string {
    const pdf = this.generateCalculatorPDF(data);
    return pdf.output('datauristring'); // Returns full data URI for preview
  }
}

export const pdfService = new PDFService();
