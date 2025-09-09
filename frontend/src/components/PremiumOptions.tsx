import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Calendar, 
  Shield, 
  DollarSign,
  Check,
  ArrowRight,
  Heart,
  AlertTriangle
} from "lucide-react";
import type { PremiumOption } from "../types";

const API_URL = "https://devweb.desttravel.com/api/visitorquote/premiumoptions";
const AUTH_HEADER = "Basic c2hpa2hhLnNoYXJtYTpjLUc2TDlEOW8hUSo=";

const defaultParams = {
  applicationDate: new Date().toISOString().slice(0, 10),
  tripDays: 365,
  age: 25,
  familyPlan: false,
  language: "EN",
  destination: "Worldwide",
  preExistingConditions: false,
  tripCost: 5000,
  coverageType: "Enhanced",
  medicalHistory: "Stable",
  smoker: false,
  highRiskActivities: false,
  stabilityPeriod: "365+" // New parameter for PDF rates
};

// Enhanced fallback rate data (Excel) - keeping original structure
const fallbackRateData = {
  ageRanges: [
    { min: 0, max: 25, key: "up25" },
    { min: 26, max: 34, key: "26-34" },
    { min: 35, max: 39, key: "35-39" },
    { min: 40, max: 54, key: "40-54" },
    { min: 55, max: 59, key: "55-59" },
    { min: 60, max: 64, key: "60-64" },
    { min: 65, max: 69, key: "65-69" },
    { min: 70, max: 74, key: "70-74" },
    { min: 75, max: 79, key: "75-79" },
    { min: 80, max: 85, key: "80-85" },
    { min: 86, max: 120, key: "86+" }
  ],
  
  enhancedRates: {
    "Deductible0": {
      15000: { "up25": 2.58, "26-34": 2.79, "35-39": 2.91, "40-54": 3.09, "55-59": 3.47, "60-64": 4.35, "65-69": 5.08, "70-74": 7.51, "75-79": 8.9, "80-85": 13.29, "86+": 15.0 },
      25000: { "up25": 2.75, "26-34": 2.98, "35-39": 3.03, "40-54": 3.52, "55-59": 3.7, "60-64": 4.8, "65-69": 5.66, "70-74": 8.32, "75-79": 10.17, "80-85": 15.53, "86+": 18.0 },
      50000: { "up25": 3.09, "26-34": 3.35, "35-39": 3.37, "40-54": 4.01, "55-59": 4.3, "60-64": 5.84, "65-69": 6.67, "70-74": 10.2, "75-79": 13.39, "80-85": 18.27, "86+": 22.0 },
      100000: { "up25": 4.13, "26-34": 4.43, "35-39": 4.72, "40-54": 5.78, "55-59": 6.3, "60-64": 7.51, "65-69": 8.93, "70-74": 12.83, "75-79": 15.95, "80-85": 21.42, "86+": 25.0 },
      150000: { "up25": 4.83, "26-34": 5.39, "35-39": 5.62, "40-54": 6.91, "55-59": 7.57, "60-64": 8.9, "65-69": 10.28, "70-74": 14.33, "75-79": 17.7, "80-85": 27.65, "86+": 32.0 },
      200000: { "up25": 6.26, "26-34": 6.94, "35-39": 7.1, "40-54": 8.62, "55-59": 9.19, "60-64": 9.94, "65-69": 11.77, "70-74": 19.01, "75-79": 21.6, "80-85": 34.78, "86+": 40.0 }
    }
  }
};

// NEW: PDF Rate Data Structure (from the PDF)
const pdfRateData = {
  // Age ranges from PDF
  ageRanges: [
    { min: 0, max: 25, key: "0-25" },
    { min: 26, max: 40, key: "26-40" },
    { min: 41, max: 60, key: "41-60" },
    { min: 61, max: 64, key: "61-64" },
    { min: 65, max: 65, key: "65" },
    { min: 66, max: 69, key: "66-69" },
    { min: 70, max: 70, key: "70" },
    { min: 71, max: 74, key: "71-74" },
    { min: 75, max: 75, key: "75" },
    { min: 76, max: 79, key: "76-79" },
    { min: 80, max: 80, key: "80" },
    { min: 81, max: 84, key: "81-84" },
    { min: 85, max: 85, key: "85" },
    { min: 86, max: 89, key: "86-89" }
  ],

  // Daily Rate Table 1 – No PreEx coverage (from PDF)
  noPreExRates: {
    "Deductible0": {
      10000: { "0-25": 1.22, "26-40": 1.38, "41-60": 1.53, "61-64": 1.97, "65": 2.25, "66-69": 2.25, "70": 3.55, "71-74": 3.55, "75": 4.34, "76-79": 4.34, "80": 6.35, "81-84": 6.35, "85": 6.35, "86-89": 9.79 },
      25000: { "0-25": 1.58, "26-40": 1.72, "41-60": 2.03, "61-64": 2.80, "65": 3.14, "66-69": 3.14, "70": 4.38, "71-74": 4.38, "75": 5.17, "76-79": 5.17, "80": 9.39, "81-84": 9.39, "85": 9.39, "86-89": 15.23 },
      50000: { "0-25": 1.72, "26-40": 1.88, "41-60": 2.32, "61-64": 3.37, "65": 3.74, "66-69": 3.74, "70": 6.28, "71-74": 6.28, "75": 7.29, "76-79": 7.29, "80": 10.10, "81-84": 10.10, "85": 10.10, "86-89": 16.44 },
      100000: { "0-25": 2.32, "26-40": 2.70, "41-60": 3.07, "61-64": 4.00, "65": 4.53, "66-69": 5.09, "70": 6.30, "71-74": 7.00, "75": 8.17, "76-79": 8.73, "80": 10.50, "81-84": 13.32, "85": 16.11, "86-89": 19.49 },
      150000: { "0-25": 2.77, "26-40": 3.14, "41-60": 4.12, "61-64": 4.79, "65": 5.53, "66-69": 5.53, "70": 9.17, "71-74": 9.17, "75": 10.48, "76-79": 10.48, "80": null, "81-84": null, "85": null, "86-89": null },
      200000: { "0-25": 4.25, "26-40": 4.61, "41-60": 5.85, "61-64": 6.52, "65": 7.73, "66-69": 7.73, "70": 12.50, "71-74": 12.50, "75": 14.45, "76-79": 14.45, "80": null, "81-84": null, "85": null, "86-89": null }
    },
    "Deductible100": {
      // Apply 5% discount from $0 deductible as per PDF
    },
    "Deductible250": {
      // Apply 10% discount from $0 deductible
    },
    "Deductible500": {
      // Apply 15% discount from $0 deductible  
    },
    "Deductible1000": {
      // Apply 20% discount from $0 deductible
    },
    "Deductible5000": {
      // Apply 30% discount from $0 deductible
    },
    "Deductible10000": {
      // Apply 40% discount from $0 deductible
    }
  },

  // Rate Table 2 - 365 days stable (with pre-existing conditions)
  preExRates365: {
    "Deductible0": {
      10000: { "0-25": 1.63, "26-40": 1.84, "41-60": 2.05, "61-64": 2.64, "65": 2.99, "66-69": 2.99, "70": 4.74, "71-74": 4.74, "75": 5.79, "76-79": 5.79, "80": null, "81-84": null, "85": null, "86-89": null },
      25000: { "0-25": 2.10, "26-40": 2.30, "41-60": 2.70, "61-64": 3.74, "65": 4.19, "66-69": 4.19, "70": 5.84, "71-74": 5.84, "75": 6.89, "76-79": 6.89, "80": null, "81-84": null, "85": null, "86-89": null },
      50000: { "0-25": 2.30, "26-40": 2.51, "41-60": 3.10, "61-64": 4.49, "65": 4.99, "66-69": 4.99, "70": 8.37, "71-74": 8.37, "75": 9.71, "76-79": 9.71, "80": null, "81-84": null, "85": null, "86-89": null },
      100000: { "0-25": 3.10, "26-40": 3.41, "41-60": 3.87, "61-64": 5.33, "65": 6.04, "66-69": 6.79, "70": 8.40, "71-74": 9.33, "75": 10.89, "76-79": 11.63, "80": null, "81-84": null, "85": null, "86-89": null },
      150000: { "0-25": 3.70, "26-40": 4.19, "41-60": 5.49, "61-64": 6.38, "65": 7.38, "66-69": 7.38, "70": 12.22, "71-74": 12.22, "75": 13.98, "76-79": 13.98, "80": null, "81-84": null, "85": null, "86-89": null },
      200000: { "0-25": 5.67, "26-40": 6.14, "41-60": 7.80, "61-64": 8.69, "65": 10.30, "66-69": 10.30, "70": 16.66, "71-74": 16.66, "75": 19.27, "76-79": 19.27, "80": null, "81-84": null, "85": null, "86-89": null }
    }
  }
};

// Stability period options (for PDF rates)
const stabilityPeriodOptions = [
  { value: "365+", label: "Stable 365+ days", multiplier: 1.0 },
  { value: "180-365", label: "Stable 180-365 days", multiplier: 1.11 }, // 11% higher
  { value: "90-180", label: "Stable 90-180 days", multiplier: 1.25 }    // 25% higher
];

// Move static data outside component to prevent re-creation on every render
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 2,
});

// Enhanced deductible options to match both Excel and PDF
interface DeductibleOption {
  label: string;
  value: keyof PremiumOption;
  amount: string;
  popular?: boolean;
  pdfDiscount?: number; // Discount percentage from PDF
}

const deductibleOptions: DeductibleOption[] = [
  { label: "$0", value: "Deductible0", amount: "$0", popular: true, pdfDiscount: 0 },
  { label: "$100", value: "Deductible100", amount: "$100", pdfDiscount: 5 },
  { label: "$250", value: "Deductible250", amount: "$250", pdfDiscount: 10 },
  { label: "$500", value: "Deductible500", amount: "$500", pdfDiscount: 15 },
  { label: "$1,000", value: "Deductible1000", amount: "$1,000", pdfDiscount: 20 },
  { label: "$5,000", value: "Deductible5000", amount: "$5,000", pdfDiscount: 30 },
  { label: "$10,000", value: "Deductible10000", amount: "$10,000", pdfDiscount: 40 },
];

// Coverage amount options
interface CoverageOption {
  label: string;
  value: number;
  popular?: boolean;
}

const coverageOptions: CoverageOption[] = [
  { label: "$10,000", value: 10000 },
  { label: "$15,000", value: 15000 },
  { label: "$25,000", value: 25000 },
  { label: "$30,000", value: 30000 },
  { label: "$40,000", value: 40000 },
  { label: "$50,000", value: 50000, popular: true },
  { label: "$75,000", value: 75000 },
  { label: "$100,000", value: 100000, popular: true },
  { label: "$125,000", value: 125000 },
  { label: "$150,000", value: 150000 },
  { label: "$175,000", value: 175000 },
  { label: "$200,000", value: 200000 },
  { label: "$250,000", value: 250000 },
  { label: "$300,000", value: 300000 },
  { label: "$400,000", value: 400000 },
  { label: "$500,000", value: 500000 },
];

export const PremiumOptions: React.FC = () => {
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<PremiumOption[] | null>(null);
  const [excelData, setExcelData] = useState<PremiumOption[] | null>(null);
  const [pdfData, setPdfData] = useState<PremiumOption[] | null>(null);
  const [selectedDeductible, setSelectedDeductible] = useState<keyof PremiumOption>("Deductible0");
  const [selectedCoverage, setSelectedCoverage] = useState<number>(100000);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [showDataSource, setShowDataSource] = useState<'excel' | 'pdf' | 'both'>('both');
  const [quotesRequested, setQuotesRequested] = useState(false);

  // Memoize form change handler to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : 
               type === "number" ? Number(value) : value,
    }));
  }, []);

  // Helper function to get PDF age bracket
  const getPdfAgeBracket = (age: number): string => {
    const bracket = pdfRateData.ageRanges.find(range => age >= range.min && age <= range.max);
    return bracket ? bracket.key : "86-89";
  };

  // Helper function to get Excel age bracket
  const getExcelAgeBracket = (age: number): string => {
    const bracket = fallbackRateData.ageRanges.find(range => age >= range.min && age <= range.max);
    return bracket ? bracket.key : "86+";
  };

  // Calculate PDF-based premiums
  const calculatePdfPremiums = (
    age: number,
    tripDays: number,
    preExisting: boolean,
    stabilityPeriod: string
  ): PremiumOption[] => {
    const ageBracket = getPdfAgeBracket(age);
    const coverageAmounts = [10000, 25000, 50000, 100000, 150000, 200000];
    
    // Select rate table based on pre-existing conditions
    const rateTable = preExisting ? pdfRateData.preExRates365 : pdfRateData.noPreExRates;
    
    // Get stability period multiplier
    const stabilityOption = stabilityPeriodOptions.find(s => s.value === stabilityPeriod);
    const stabilityMultiplier = stabilityOption?.multiplier || 1.0;

    return coverageAmounts.map((coverage, index) => {
      const scheduleNo = index + 1;
      const baseRate = rateTable.Deductible0?.[coverage]?.[ageBracket];
      
      // Skip if rate is null (not available for this age/coverage)
      if (baseRate === null || baseRate === undefined) {
        return null;
      }

      const adjustedRate = baseRate * stabilityMultiplier;
      
      // Calculate all deductible amounts with PDF discounts
      const premiumData: PremiumOption = {
        SumInsured: coverage,
        ScheduleNo: scheduleNo,
        TripDays: tripDays,
        Rate: adjustedRate,
        DailyRate: adjustedRate,
        Company: "HMC", // HMC Company (PDF provider)
        // Initialize all deductible options
        Deductible0: adjustedRate * tripDays,
        Deductible100: adjustedRate * tripDays,
        Deductible250: adjustedRate * tripDays,
        Deductible500: adjustedRate * tripDays,
        Deductible1000: adjustedRate * tripDays,
        Deductible2500: adjustedRate * tripDays,
        Deductible5000: adjustedRate * tripDays,
        Deductible10000: adjustedRate * tripDays
      };

      // Calculate premiums for each deductible option with discounts
      deductibleOptions.forEach(option => {
        const discount = option.pdfDiscount || 0;
        const discountedRate = adjustedRate * (1 - discount / 100);
        const finalRate = discountedRate * tripDays;
        
        // Explicitly assign to each property
        switch (option.value) {
          case 'Deductible0':
            premiumData.Deductible0 = finalRate;
            break;
          case 'Deductible100':
            premiumData.Deductible100 = finalRate;
            break;
          case 'Deductible250':
            premiumData.Deductible250 = finalRate;
            break;
          case 'Deductible500':
            premiumData.Deductible500 = finalRate;
            break;
          case 'Deductible1000':
            premiumData.Deductible1000 = finalRate;
            break;
          case 'Deductible2500':
            premiumData.Deductible2500 = finalRate;
            break;
          case 'Deductible5000':
            premiumData.Deductible5000 = finalRate;
            break;
          case 'Deductible10000':
            premiumData.Deductible10000 = finalRate;
            break;
        }
      });

      return premiumData;
    }).filter(Boolean) as PremiumOption[];
  };

  // Enhanced Excel calculation (keeping existing logic)
  const calculateExcelPremiums = (
    age: number, 
    tripDays: number, 
    coverageType: string,
    destination: string,
    preExisting: boolean,
    medicalHistory: string,
    smoker: boolean,
    highRisk: boolean,
    tripCost: number
  ): PremiumOption[] => {
    const ageBracket = getExcelAgeBracket(age);
    const coverageAmounts = [15000, 25000, 50000, 100000, 150000, 200000];
    
    // Select rate table based on coverage type
    let rateTable = fallbackRateData.enhancedRates; // Simplified for this example
    
    // Apply risk multipliers (existing logic)
    let riskMultiplier = 1.0;
    // ... existing risk calculation logic ...
    
    return coverageAmounts.map((coverage, index) => {
      const scheduleNo = index + 1;
      const baseRate = rateTable.Deductible0?.[coverage]?.[ageBracket] || 5.0;
      const adjustedRate = baseRate * riskMultiplier;
      const dailyRate = adjustedRate / 365;
      
      const premiumData: PremiumOption = {
        SumInsured: coverage,
        ScheduleNo: scheduleNo,
        TripDays: tripDays,
        Rate: adjustedRate,
        DailyRate: dailyRate,
        Company: "21st Century Insurance", // 21st Century Insurance (Excel provider)
        // Initialize all deductible options with base rate
        Deductible0: adjustedRate * tripDays,
        Deductible100: adjustedRate * tripDays,
        Deductible250: adjustedRate * tripDays,
        Deductible500: adjustedRate * tripDays,
        Deductible1000: adjustedRate * tripDays,
        Deductible2500: adjustedRate * tripDays,
        Deductible5000: adjustedRate * tripDays,
        Deductible10000: adjustedRate * tripDays
      };

      // Calculate specific rates for each deductible if available in rateTable
      deductibleOptions.forEach(option => {
        const deductibleKey = option.value as keyof typeof rateTable;
        const deductibleRate = rateTable[deductibleKey]?.[coverage]?.[ageBracket];
        if (deductibleRate) {
          const finalRate = deductibleRate * riskMultiplier * tripDays;
          // Explicitly assign to each property
          switch (option.value) {
            case 'Deductible0':
              premiumData.Deductible0 = finalRate;
              break;
            case 'Deductible100':
              premiumData.Deductible100 = finalRate;
              break;
            case 'Deductible250':
              premiumData.Deductible250 = finalRate;
              break;
            case 'Deductible500':
              premiumData.Deductible500 = finalRate;
              break;
            case 'Deductible1000':
              premiumData.Deductible1000 = finalRate;
              break;
            case 'Deductible2500':
              premiumData.Deductible2500 = finalRate;
              break;
            case 'Deductible5000':
              premiumData.Deductible5000 = finalRate;
              break;
            case 'Deductible10000':
              premiumData.Deductible10000 = finalRate;
              break;
          }
        }
      });

      return premiumData;
    });
  };

  // Memoize fetch premiums function to prevent unnecessary re-creation
  const fetchPremiums = useCallback(async () => {
    setLoading(true);
    setQuotesRequested(true);
    setApiData(null);
    setExcelData(null);
    setPdfData(null);
    setApiSuccess(false);
    
    try {
      // Try API first (existing logic)
      const url = `${API_URL}?applicationDate=${params.applicationDate}&tripDays=${params.tripDays}&age=${params.age}&familyPlan=${params.familyPlan}`;
      const res = await fetch(url, {
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
          "Accept-Language": params.language,
        },
      });
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const result: PremiumOption[] = await res.json();
      setApiData(result);
      setApiSuccess(true);
    } catch (apiError: any) {
      console.warn("API failed:", apiError.message);
    }
    
    // Calculate Excel data (existing logic)
    try {
      const calculatedExcelData = calculateExcelPremiums(
        params.age,
        params.tripDays,
        params.coverageType,
        params.destination,
        params.preExistingConditions,
        params.medicalHistory,
        params.smoker,
        params.highRiskActivities,
        params.tripCost
      );
      setExcelData(calculatedExcelData);
    } catch (calcError: any) {
      console.warn("Excel calculation failed:", calcError.message);
    }

    // Calculate PDF data (NEW)
    try {
      const calculatedPdfData = calculatePdfPremiums(
        params.age,
        params.tripDays,
        params.preExistingConditions,
        params.stabilityPeriod
      );
      setPdfData(calculatedPdfData);
    } catch (pdfError: any) {
      console.warn("PDF calculation failed:", pdfError.message);
    }
    
    setLoading(false);
  }, [params]); // Dependencies: params object

  // Use static currency formatter for better performance
  const formatCurrency = useCallback((amount: number) => {
    return CURRENCY_FORMATTER.format(amount);
  }, []);

  const getBestValue = (options: PremiumOption[]) => {
    if (!options.length) return null;
    return options.reduce((best, current) => {
      const currentValue = current[selectedDeductible];
      const bestValue = best[selectedDeductible];
      if (typeof currentValue === 'number' && typeof bestValue === 'number') {
        return currentValue < bestValue ? current : best;
      }
      return best;
    });
  };

  // Memoize helper function to safely get deductible value
  const getDeductibleValue = useCallback((row: PremiumOption, deductible: keyof PremiumOption): number => {
    const value = row[deductible];
    return typeof value === 'number' ? value : 0;
  }, []);

  // Memoize dropdown options rendering for better performance
  const coverageDropdownOptions = useMemo(() => 
    coverageOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )), []
  );

  const deductibleDropdownOptions = useMemo(() => 
    deductibleOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )), []
  );

  // Memoize display data calculation to avoid re-computation on every render
  const displayData = useMemo(() => {
    let combinedData: PremiumOption[] = [];
    
    if (showDataSource === 'both') {
      if (excelData) combinedData = [...combinedData, ...excelData];
      if (pdfData) combinedData = [...combinedData, ...pdfData];
    } else if (showDataSource === 'excel' && excelData) {
      combinedData = excelData;
    } else if (showDataSource === 'pdf' && pdfData) {
      combinedData = pdfData;
    }

    const baseData = apiData && apiSuccess ? apiData : combinedData;
    
    // Filter by selected coverage amount
    return baseData.filter(option => option.SumInsured === selectedCoverage);
  }, [apiData, apiSuccess, excelData, pdfData, showDataSource, selectedCoverage]);

  // Memoize best value calculation
  const bestValue = useMemo(() => {
    return displayData ? getBestValue(displayData) : null;
  }, [displayData, selectedDeductible]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Enhanced Header */}
        <motion.header
          className="text-center mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-[#305399] p-3 rounded-full mb-3 shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="text-white" size={24} />
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-2">
            Travel Insurance Quote
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Compare rates from multiple providers and get instant quotes
          </p>
        </motion.header>

        {/* Quote Form */}
        <motion.section
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPremiums();
            }}
            className="space-y-6"
          >
            {/* Trip Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <motion.div 
                className="md:col-span-2 space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Calendar className="mr-2 text-[#305399]" size={18} />
                  Departure Date
                </label>
                <input
                  type="date"
                  name="applicationDate"
                  value={params.applicationDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base lg:text-lg font-semibold text-gray-700">Trip Duration (Days)</label>
                <input
                  type="number"
                  name="tripDays"
                  value={params.tripDays}
                  min={1}
                  max={365}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-center font-bold text-[#305399]"
                />
              </motion.div>
            </div>

            {/* Traveler Information */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                <Shield className="mr-2 text-[#305399]" size={18} />
                Age of Traveller
              </label>
              <input
                type="number"
                name="age"
                value={params.age}
                min={0}
                max={120}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </motion.div>

            {/* Medical History */}
            <motion.fieldset 
              className="space-y-3"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <legend className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                <Heart className="mr-2 text-[#305399]" size={18} />
                Do you have pre-existing medical conditions?
              </legend>
              <div className="flex gap-6">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="preExistingConditions"
                      value={option}
                      checked={params.preExistingConditions === (option === 'Yes')}
                      onChange={(e) => setParams(prev => ({ ...prev, preExistingConditions: e.target.value === 'Yes' }))}
                      className="w-4 h-4 text-[#305399] bg-gray-100 border-gray-300 focus:ring-[#305399] focus:ring-2"
                      required
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-[#305399] transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </motion.fieldset>

            {/* Medical Stability Period - Only show if pre-existing conditions */}
            {params.preExistingConditions && (
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Calendar className="mr-2 text-[#305399]" size={18} />
                  How long have your medical conditions been stable?
                </label>
                <select
                  name="stabilityPeriod"
                  value={params.stabilityPeriod}
                  onChange={handleChange}
                  className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {stabilityPeriodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Coverage Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coverage Amount */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="flex items-center text-base font-semibold text-gray-700">
                  <DollarSign className="mr-2 text-[#305399]" size={16} />
                  Coverage Amount
                </label>
                <select
                  value={selectedCoverage}
                  onChange={(e) => setSelectedCoverage(Number(e.target.value))}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {coverageDropdownOptions}
                </select>
              </motion.div>

              {/* Deductible Amount */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base font-semibold text-gray-700">Deductible Amount</label>
                <select
                  value={selectedDeductible}
                  onChange={(e) => setSelectedDeductible(e.target.value as keyof PremiumOption)}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {deductibleDropdownOptions}
                </select>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div className="pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Calculating Quotes...
                  </>
                ) : (
                  <>
                    GET QUOTE
                    <ArrowRight size={24} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-sm text-gray-700">
                This quote is an estimate based on the information provided. Final rates may vary based on 
                medical underwriting and other factors. All quotes are subject to approval.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Results Section */}
        <AnimatePresence>
          {quotesRequested && (
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Selection Dropdowns - Always Visible When Quotes Requested */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Coverage Amount Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Coverage Amount</label>
                    <select
                      value={selectedCoverage}
                      onChange={(e) => setSelectedCoverage(Number(e.target.value))}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg bg-white text-gray-700 font-medium focus:border-[#305399] focus:ring-2 focus:ring-[#305399] focus:ring-opacity-20 outline-none transition-all duration-200"
                    >
                      {coverageDropdownOptions}
                    </select>
                  </div>

                  {/* Deductible Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Deductible Amount</label>
                    <select
                      value={selectedDeductible}
                      onChange={(e) => setSelectedDeductible(e.target.value as keyof PremiumOption)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg bg-white text-gray-700 font-medium focus:border-[#305399] focus:ring-2 focus:ring-[#305399] focus:ring-opacity-20 outline-none transition-all duration-200"
                    >
                      {deductibleDropdownOptions}
                    </select>
                  </div>
                </div>
              </div>

              {displayData && displayData.length > 0 ? (
                <>
                  {/* Results Header */}
                  <div className="bg-gradient-to-r from-[#305399] to-[#253A66] text-white rounded-2xl p-6 lg:p-8 shadow-xl">
                    <div className="flex items-center mb-4">
                      <DollarSign className="mr-3" size={32} />
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold">
                          Travel Insurance Comparison
                        </h2>
                        <p className="text-blue-100 mt-1">
                          {displayData.length} plans available • HMC vs 21st Century Insurance
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-blue-200 mt-2 flex items-center flex-wrap gap-4">
                      <span>📍 {params.destination}</span>
                      <span>📅 {params.tripDays} days</span>
                      <span>👤 Age {params.age}</span>
                      <span>🏥 Pre-existing: {params.preExistingConditions ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  {/* Plans Card View - Flex Layout */}
                  <div className="flex flex-wrap gap-6">
                    {displayData.map((row, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden flex-grow ${
                          displayData.length === 2 ? 'w-[calc(50%-12px)]' : 
                          displayData.length === 3 ? 'w-[calc(33.333%-16px)]' : 
                          displayData.length >= 4 ? 'w-[calc(25%-18px)]' : 
                          'w-full'
                        } ${
                          bestValue && row === bestValue ? 'border-green-400 bg-green-50' : 'border-gray-200'
                        } min-w-[280px]`}
                      >
                        {bestValue && row === bestValue && (
                          <div className="bg-green-500 text-white text-center py-2 px-4">
                            <div className="flex items-center justify-center">
                              <Check className="mr-2" size={16} />
                              <span className="font-bold text-xs">BEST VALUE</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          {/* Provider Logo and Name */}
                          <div className="text-center mb-6">
                            <img
                              src={
                                (row as any).Company === "HMC" 
                                  ? "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1757444355/hmc_1582703928_repnyg.png"
                                  : "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1757443367/2008_Colour_Logo_with_Globe_JPG_at1kt3.jpg"
                              }
                              alt={
                                (row as any).Company === "HMC" ? "HMC Insurance" : "21st Century Insurance"
                              }
                              className="w-20 h-20 mx-auto object-contain rounded shadow border border-gray-200 bg-white mb-3"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                              loading="lazy"
                            />
                            <h3 className="text-base font-bold text-gray-800">
                              {(row as any).Company === "HMC" ? "HMC Insurance" : "21st Century Insurance"}
                            </h3>
                          </div>

                          {/* Coverage Info */}
                          <div className="text-center mb-6">
                            <p className="text-xl font-bold text-gray-800">
                              {formatCurrency(row.SumInsured)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Plan S{row.ScheduleNo}
                            </p>
                          </div>

                          {/* Pricing Info */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#305399]">
                              {formatCurrency(getDeductibleValue(row, selectedDeductible))}
                            </div>
                            <p className="text-sm text-gray-600">
                              {deductibleOptions.find(opt => opt.value === selectedDeductible)?.label} deductible
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatCurrency(getDeductibleValue(row, selectedDeductible) / params.tripDays)} per day
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                /* No Plans Available Message */
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-orange-100 p-4 rounded-full mb-4">
                      <AlertTriangle className="text-orange-600" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      No Plans Available
                    </h3>
                    <p className="text-gray-600 mb-4 max-w-md">
                      Sorry, there are no insurance plans available for the selected coverage amount 
                      ({formatCurrency(selectedCoverage)}) and deductible 
                      ({deductibleOptions.find(opt => opt.value === selectedDeductible)?.label}) 
                      combination.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please try selecting different coverage or deductible options above.
                    </p>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Shield className="text-blue-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Emergency Medical</h3>
              <p className="text-sm text-gray-600">Comprehensive medical coverage for unexpected health emergencies abroad</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Heart className="text-red-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Trip Protection</h3>
              <p className="text-sm text-gray-600">Coverage for trip cancellation, interruption, and travel delays</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <DollarSign className="text-green-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Best Rates</h3>
              <p className="text-sm text-gray-600">Compare multiple providers to find the most competitive rates</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
