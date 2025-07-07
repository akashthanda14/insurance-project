// types/paymentSchedule.ts
export interface PaymentSchedule {
  ScheduleId: number;
  PolicyId: number;
  SeqNo: number;
  PaymentType: string;
  ScheduleDate: string;
  PaymentAmount: number;
  PaymentStatus: string;
  CreateDate: string | null;
  UpdateDate: string | null;
  LastUserID: string | null;
  MonerisTokenId: string | null;
  CardHolder: string | null;
  PaymentResponseCode: string | null;
  Notice: number;
  PaidToDate: string | null;
  NotifiedData: string | null;
  CardNo: string | null;
  CardExpiryMonth: string | null;
  CardExpiryYear: string | null;
  CardType: string | null;
  OldMonerisTokenId: string | null;
  WaiveProcessingFee: boolean;
}

export interface PremiumOptionsRequest {
  totalPremium: number;
  firstPaymentDate: string;
  startDate: string;
  endDate: string;
  paymentType: 'M' | 'A'; // M = Monthly, A = Annual
}

export interface ApiResponse {
  paymentSchedules: PaymentSchedule[];
  status: number;
  message?: string;
}

export interface PremiumSummary {
  totalPremium: number;
  monthlyCharge: number;
  depositAmount: number;
  subsequentAmount: number;
  totalPayments: number;
}
