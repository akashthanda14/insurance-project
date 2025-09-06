


import { useState, useCallback } from 'react';
import dotenv from 'dotenv';
import { pdfService, PDFData, PDFConfig } from '../services/pdfService';
import { emailService, EmailResult } from '../services/emailService';
import emailjs from '@emailjs/browser';

export interface CalculatorResults {
  totalAmount: number;
  contributions: number;
  returns: number;
  roiRate: number;
  govGrants?: number;
  taxSheltered?: number;
  taxSavings?: number;
  availableRoom?: number;
}

export interface UseCalculatorServicesReturn {
  emailStatus: {
    message: string;
    type: 'success' | 'error' | 'loading' | '';
  };
  isLoading: boolean;
  downloadPDF: (data: PDFData, config?: PDFConfig) => void;
  sendEmail: (
    userEmail: string,
    calculatorType: string,
    results: CalculatorResults,
    inputs: Record<string, any>,
    includePDF?: boolean
  ) => Promise<void>;
  sendEmailWithEmailJS: (
    userEmail: string,
    calculatorType: string,
    results: CalculatorResults,
    inputs: Record<string, any>,
    includePDF?: boolean
  ) => Promise<void>;
  clearEmailStatus: () => void;
  testEmailService: () => Promise<void>;
}

// Environment variables for Vite - use import.meta.env instead of process.env
const EMAILJS_PUBLIC_KEY: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID: string = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const useCalculatorServices = (): UseCalculatorServicesReturn => {
  const [emailStatus, setEmailStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'loading' | '';
  }>({ message: '', type: '' });

  const [isLoading, setIsLoading] = useState(false);

  // Helper function to format currency
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  // Convert PDF service result to base64
  const getPDFAsBase64 = useCallback(async (
    data: PDFData, 
    config?: PDFConfig
  ): Promise<string> => {
    try {
      // Assuming your pdfService has a method to get base64
      if (pdfService.getPDFBase64) {
        return pdfService.getPDFBase64(data, config);
      }
      
      // Alternative: If your service only provides blob/buffer
      throw new Error('PDF service does not support base64 conversion');
    } catch (error) {
      console.error('PDF base64 conversion failed:', error);
      throw error;
    }
  }, []);

  const downloadPDF = useCallback((data: PDFData, config?: PDFConfig) => {
    try {
      setEmailStatus({ message: 'Generating PDF...', type: 'loading' });
      pdfService.downloadPDF(data, config || { filename: 'investor-insurance-calculator-results.pdf' });
      setEmailStatus({ message: '✅ PDF downloaded successfully!', type: 'success' });
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 2000);
    } catch (error) {
      console.error('PDF download failed:', error);
      setEmailStatus({
        message: '❌ Failed to download PDF. Please try again.',
        type: 'error'
      });
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 3000);
    }
  }, []);

  // Your existing sendEmail method (kept as is)
  const sendEmail = useCallback(async (
    userEmail: string,
    calculatorType: string,
    results: CalculatorResults,
    inputs: Record<string, any>,
    includePDF: boolean = true
  ) => {
    setIsLoading(true);
    setEmailStatus({ message: 'Preparing your report...', type: 'loading' });

    try {
      let pdfBase64: string | undefined;

      if (includePDF) {
        setEmailStatus({ message: 'Generating your personalized PDF report...', type: 'loading' });
        
        const pdfData: PDFData = {
          title: `${calculatorType} Calculator Results`,
          subtitle: `Personalized financial projection by Investor Insurance`,
          results: {
            totalAmount: results.totalAmount,
            contributions: results.contributions,
            returns: results.returns,
            roiRate: results.roiRate,
            ...(results.govGrants && { govGrants: results.govGrants }),
            ...(results.taxSheltered && { taxSheltered: results.taxSheltered }),
            ...(results.taxSavings && { taxSavings: results.taxSavings }),
          },
          inputs: {
            ...inputs,
            generatedDate: new Date().toLocaleDateString('en-CA'),
            calculatorVersion: '1.0',
            companyName: 'Investor Insurance'
          },
          disclaimers: [
            'This calculation is provided for informational purposes only and is based on the assumptions and information you provided.',
            'Actual investment returns may vary significantly due to market conditions, economic factors, fees, taxes, and other variables.',
            'Past performance does not guarantee future results. All investments carry inherent risks.',
            'This report should not be considered as personalized financial advice. Individual circumstances vary significantly.',
            'We strongly recommend consulting with a qualified financial advisor before making any investment decisions.',
            'Investor Insurance is not responsible for any financial decisions made based solely on this calculation.',
            `RRSP, FHSA, RESP, and TFSA contribution limits and rules are subject to change by the Canada Revenue Agency.`,
            'Tax implications may vary based on your individual tax situation and should be discussed with a tax professional.',
            'Market volatility can significantly impact actual returns, especially over shorter time periods.',
            'This calculation assumes consistent contributions and does not account for life changes that may affect your ability to contribute.',
            'Investment fees, management costs, and inflation can reduce actual returns.',
            'Government benefits and contribution matching (where applicable) are subject to program availability and eligibility requirements.'
          ]
        };

        try {
          pdfBase64 = pdfService.getPDFBase64(pdfData, {
            filename: `investor-insurance-${calculatorType.toLowerCase().replace(/\s+/g, '-')}-results.pdf`
          });
        } catch (pdfError) {
          console.error('PDF generation failed:', pdfError);
          setEmailStatus({
            message: '⚠️ PDF generation failed, sending email without attachment...',
            type: 'loading'
          });
        }
      }

      setEmailStatus({ message: 'Sending your report via email...', type: 'loading' });

      const result: EmailResult = await emailService.sendCalculationResults(
        userEmail,
        calculatorType,
        results,
        pdfBase64
      );

      if (result.success) {
        setEmailStatus({ 
          message: `✅ ${result.message} Check your inbox for your detailed report!`, 
          type: 'success' 
        });
        setTimeout(() => setEmailStatus({ message: '', type: '' }), 5000);
      } else {
        setEmailStatus({ 
          message: `❌ ${result.message}`, 
          type: 'error' 
        });
        setTimeout(() => setEmailStatus({ message: '', type: '' }), 7000);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Email sending process failed:', error);
      setEmailStatus({
        message: `❌ Failed to send email: ${errorMessage}. Please try again or contact support at info@investorinsurance.ca`,
        type: 'error'
      });
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 8000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // New EmailJS method for Vite
  const sendEmailWithEmailJS = useCallback(async (
    userEmail: string,
    calculatorType: string,
    results: CalculatorResults,
    inputs: Record<string, any>,
    includePDF: boolean = true
  ): Promise<void> => {
    // Check environment variables are available
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error('Missing EmailJS configuration:', {
        hasPublicKey: !!EMAILJS_PUBLIC_KEY,
        hasServiceId: !!EMAILJS_SERVICE_ID,
        hasTemplateId: !!EMAILJS_TEMPLATE_ID
      });
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    setIsLoading(true);
    setEmailStatus({ message: 'Preparing your report...', type: 'loading' });

    try {
      let pdfBase64: string | undefined;
      const fileName = `investor-insurance-${calculatorType.toLowerCase().replace(/\s+/g, '-')}-results-${new Date().toISOString().split('T')[0]}.pdf`;

      if (includePDF) {
        setEmailStatus({ message: 'Generating your personalized PDF report...', type: 'loading' });
        
        const pdfData: PDFData = {
          title: `${calculatorType} Calculator Results`,
          subtitle: `Personalized financial projection by Investor Insurance`,
          results: {
            totalAmount: results.totalAmount,
            contributions: results.contributions,
            returns: results.returns,
            roiRate: results.roiRate,
            ...(results.govGrants && { govGrants: results.govGrants }),
            ...(results.taxSheltered && { taxSheltered: results.taxSheltered }),
            ...(results.taxSavings && { taxSavings: results.taxSavings }),
          },
          inputs: {
            ...inputs,
            generatedDate: new Date().toLocaleDateString('en-CA'),
            calculatorVersion: '1.0',
            companyName: 'Investor Insurance'
          },
          disclaimers: [
            'This calculation is provided for informational purposes only.',
            'Please consult with a qualified financial advisor before making investment decisions.',
            'Past performance does not guarantee future results.',
          ]
        };

        try {
          pdfBase64 = await getPDFAsBase64(pdfData, { filename: fileName });
        } catch (pdfError) {
          console.error('PDF generation failed:', pdfError);
          setEmailStatus({
            message: '⚠️ PDF generation failed, sending email without attachment...',
            type: 'loading'
          });
        }
      }

      // Prepare email template parameters
      const templateParams = {
        to_email: userEmail,
        calculator_type: calculatorType,
        total_amount: formatCurrency(results.totalAmount),
        contributions: formatCurrency(results.contributions),
        returns: formatCurrency(results.returns),
        roi_rate: `${results.roiRate}%`,
        ...(results.govGrants && { gov_grants: formatCurrency(results.govGrants) }),
        ...(results.taxSheltered && { tax_sheltered: formatCurrency(results.taxSheltered) }),
        ...(results.taxSavings && { tax_savings: formatCurrency(results.taxSavings) }),
        user_name: 'Valued Client',
        current_date: new Date().toLocaleDateString('en-CA'),
        input_summary: Object.entries(inputs)
          .map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const formattedValue = typeof value === 'number' && key.toLowerCase().includes('amount') 
              ? formatCurrency(value) 
              : String(value);
            return `${label}: ${formattedValue}`;
          })
          .join('\n'),
        // Add PDF attachment if available
        ...(pdfBase64 && {
          pdf_attachment: pdfBase64,
          pdf_filename: fileName,
        }),
      };

      setEmailStatus({ message: 'Sending your report via email...', type: 'loading' });

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setEmailStatus({ 
          message: `✅ Results sent successfully to ${userEmail}${includePDF ? ' with PDF attachment' : ''}! Check your inbox for your detailed report!`, 
          type: 'success' 
        });
        setTimeout(() => setEmailStatus({ message: '', type: '' }), 5000);
      } else {
        throw new Error(`EmailJS failed with status: ${response.status}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('EmailJS sending process failed:', error);
      setEmailStatus({
        message: `❌ Failed to send email: ${errorMessage}. Please try again or contact support at info@investorinsurance.ca`,
        type: 'error'
      });
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 8000);
    } finally {
      setIsLoading(false);
    }
  }, [getPDFAsBase64, formatCurrency]);

  const clearEmailStatus = useCallback(() => {
    setEmailStatus({ message: '', type: '' });
  }, []);

  const testEmailService = useCallback(async () => {
    setIsLoading(true);
    setEmailStatus({ message: 'Testing email service connection...', type: 'loading' });

    try {
      const result = await emailService.testEmailConnection();
      
      if (result.success) {
        setEmailStatus({ 
          message: '✅ Email service is working correctly!', 
          type: 'success' 
        });
      } else {
        setEmailStatus({ 
          message: `❌ Email service test failed: ${result.message}`, 
          type: 'error' 
        });
      }
      
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 3000);
    } catch (error) {
      setEmailStatus({
        message: '❌ Email service test failed. Please check your configuration.',
        type: 'error'
      });
      setTimeout(() => setEmailStatus({ message: '', type: '' }), 3000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    emailStatus,
    isLoading,
    downloadPDF,
    sendEmail, // Your existing method
    sendEmailWithEmailJS, // New EmailJS method
    clearEmailStatus,
    testEmailService
  };
};
