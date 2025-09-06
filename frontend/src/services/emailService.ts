import emailjs from 'emailjs-com';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

interface EmailTemplate {
  to_email: string;
  calculator_type: string;
  total_amount: string;
  contributions: string;
  returns: string;
  roi_rate: string;
  gov_grants?: string;
  tax_sheltered?: string;
  tax_savings?: string;
  user_name: string;
  current_date: string;
  pdf_attachment?: string;
  pdf_filename?: string;
  input_summary: string;
  // Add index signature to make it compatible with Record<string, unknown>
  [key: string]: string | undefined;
}


export interface EmailResult {
  success: boolean;
  message: string;
}

class EmailService {
  private config: EmailConfig;
  private readonly COMPANY_INFO = {
    name: 'Investor Insurance',
    email: 'info@investorinsurance.ca',
    website: 'https://investorinsurance.ca',
    tagline: 'Your Financial Planning Partner'
  };

  constructor() {
    this.config = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    };
  }

  public setConfig(config: Partial<EmailConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  private generateCustomMessage(calculatorType: string): string {
    const messages = {
      'FHSA': `Thank you for using our FHSA Calculator! At ${this.COMPANY_INFO.name}, we're committed to helping you achieve your homeownership dreams. Your First Home Savings Account is a powerful tool that combines the benefits of RRSPs and TFSAs to accelerate your journey to homeownership.`,
      'RRSP': `Thank you for using our RRSP Calculator! At ${this.COMPANY_INFO.name}, we believe that planning for retirement should start today. Your RRSP projections show the power of compound growth and consistent contributions over time.`,
      'RESP': `Thank you for using our RESP Calculator! At ${this.COMPANY_INFO.name}, we understand that investing in your child's education is one of the most important decisions you'll make. The government matching contributions make RESPs an excellent savings vehicle.`,
      'TFSA': `Thank you for using our TFSA Calculator! At ${this.COMPANY_INFO.name}, we know that tax-free growth is crucial for building wealth. Your Tax-Free Savings Account projections demonstrate the benefits of disciplined saving and investing.`
    };

    return messages[calculatorType as keyof typeof messages] || 
           `Thank you for using our ${calculatorType} Calculator! At ${this.COMPANY_INFO.name}, we're here to help you make informed financial decisions.`;
  }

  public async sendCalculationResults(
    userEmail: string,
    calculatorType: string,
    results: {
      totalAmount: number;
      contributions: number;
      returns: number;
      roiRate: number;
    },
    pdfBase64?: string,
    customMessage?: string
  ): Promise<EmailResult> {
    
    // Enhanced validation
    if (!userEmail || !userEmail.trim()) {
      return {
        success: false,
        message: 'Email address is required and cannot be empty.'
      };
    }

    const trimmedEmail = userEmail.trim();
    if (!this.validateEmail(trimmedEmail)) {
      return {
        success: false,
        message: 'Please enter a valid email address.'
      };
    }

    if (!this.config.serviceId || !this.config.templateId || !this.config.publicKey) {
      console.error('EmailJS Configuration Missing:', {
        serviceId: !!this.config.serviceId,
        templateId: !!this.config.templateId,
        publicKey: !!this.config.publicKey
      });
      return {
        success: false,
        message: 'Email service is not properly configured. Please contact support.'
      };
    }

    try {
      const templateParams: EmailTemplate = {
        to_email: trimmedEmail,
        reply_to: this.COMPANY_INFO.email,
        from_name: this.COMPANY_INFO.name,
        company_name: this.COMPANY_INFO.name,
        calculator_type: calculatorType,
        total_amount: this.formatCurrency(results.totalAmount),
        contributions: this.formatCurrency(results.contributions),
        returns: this.formatCurrency(results.returns),
        roi_rate: `${results.roiRate}%`,
        contact_email: this.COMPANY_INFO.email,
        custom_message: customMessage || this.generateCustomMessage(calculatorType),
        attachment: pdfBase64,
        attachment_name: `${this.COMPANY_INFO.name.toLowerCase().replace(/\s+/g, '-')}-${calculatorType.toLowerCase()}-calculator-results.pdf`,
        user_name: '',
        current_date: '',
        input_summary: ''
      };

      // Debug logging (remove in production)
      console.log('Sending email with configuration:', {
        serviceId: this.config.serviceId.substring(0, 8) + '...',
        templateId: this.config.templateId.substring(0, 8) + '...',
        publicKey: this.config.publicKey.substring(0, 8) + '...',
        recipient: trimmedEmail,
        calculatorType,
        hasAttachment: !!pdfBase64
      });

      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams,
        this.config.publicKey
      );

      console.log('EmailJS Response:', {
        status: response.status,
        text: response.text
      });

      if (response.status === 200) {
        return {
          success: true,
          message: `Email sent successfully to ${trimmedEmail}!`
        };
      } else {
        throw new Error(`Email service returned status: ${response.status} - ${response.text}`);
      }

    } catch (error: unknown) {
      console.error('Email sending failed:', error);
      
      // Enhanced error handling with specific error types
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        
        if (errorMessage.includes('recipients address is empty') || errorMessage.includes('422')) {
          return {
            success: false,
            message: 'Email configuration error. Please verify the recipient address or contact support.'
          };
        }
        
        if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          return {
            success: false,
            message: 'Network error. Please check your internet connection and try again.'
          };
        }
        
        if (errorMessage.includes('403') || errorMessage.includes('unauthorized')) {
          return {
            success: false,
            message: 'Email service authorization failed. Please contact support.'
          };
        }

        return {
          success: false,
          message: `Failed to send email: ${error.message}. Please try again or contact support.`
        };
      }
      
      return {
        success: false,
        message: 'An unexpected error occurred while sending the email. Please try again or contact support.'
      };
    }
  }

  public async sendWithPDF(
    userEmail: string,
    calculatorType: string,
    results: {
      totalAmount: number;
      contributions: number;
      returns: number;
      roiRate: number;
    },
    pdfBase64: string,
    customMessage?: string
  ): Promise<EmailResult> {
    return this.sendCalculationResults(userEmail, calculatorType, results, pdfBase64, customMessage);
  }

  // Test email functionality
  public async testEmailConnection(): Promise<EmailResult> {
    if (!this.config.serviceId || !this.config.templateId || !this.config.publicKey) {
      return {
        success: false,
        message: 'Email configuration is incomplete'
      };
    }

    try {
      // Send a minimal test email
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        {
          to_email: 'test@example.com',
          from_name: this.COMPANY_INFO.name,
          calculator_type: 'Test',
          total_amount: '$0',
          contributions: '$0',
          returns: '$0',
          roi_rate: '0%',
          custom_message: 'This is a test email',
          contact_email: this.COMPANY_INFO.email
        },
        this.config.publicKey
      );

      return {
        success: response.status === 200,
        message: response.status === 200 ? 'Email service is working correctly' : 'Email service test failed'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Email service test failed'
      };
    }
  }
}

export const emailService = new EmailService();
