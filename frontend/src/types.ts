// types.ts
export interface PremiumOption {
  SumInsured: number;
  ScheduleNo: number;
  TripDays: number;
  DailyRate: number;
  Rate: number;
  Company?: string; // Optional company identifier
  Deductible0: number;
  Deductible100: number; // Added missing deductible option
  Deductible250: number;
  Deductible500: number;
  Deductible1000: number;
  Deductible2500: number;
  Deductible5000: number;
  Deductible10000: number;
}
