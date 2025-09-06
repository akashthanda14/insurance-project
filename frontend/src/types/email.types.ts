// types/email.types.ts
export interface EmailTemplateParams {
  to_email: string;
  from_name: string;
  total_saved: string;
  total_contributions: string;
  total_return: string;
  roi_rate: string;
  advisor_link: string;
  attachment?: string;
  attachment_name?: string;
}

export interface EmailStatus {
  message: string;
  type: 'success' | 'error' | 'loading' | '';
}
