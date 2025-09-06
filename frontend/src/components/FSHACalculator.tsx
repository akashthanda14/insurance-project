import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Home,
  ArrowRight,
  Info,
  MapPin,
  Users,
  HelpCircle,
  Mail,
  Percent,
  X,
  AlertCircle
} from "lucide-react";
import { useCalculatorServices } from '../hooks/useCalculatorServices';

interface FormErrors {
  email?: string;
  postalCode?: string;
  general?: string;
}

// Optimized Range Input Component
const OptimizedRangeInput = React.memo(({ 
  label, 
  icon, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  unit = '', 
  additionalInfo = '',
  formatValue,
  disabled = false
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  additionalInfo?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const progressPercentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const handleSliderChange = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    if (clampedValue !== value) {
      onChange(clampedValue);
    }
  }, [onChange, min, max, value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      handleSliderChange(newValue);
    }
  }, [handleSliderChange]);

  const handleInputStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleInputEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const displayValue = useMemo(() => {
    return formatValue ? formatValue(value) : `${value}${unit}`;
  }, [value, unit, formatValue]);

  return (
    <motion.div 
      className="space-y-3"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
        {icon}
        <span className="flex-1">{label}</span>
        <span className={`font-bold text-[#305399] text-lg ${isDragging ? 'scale-110 transition-transform' : ''}`}>
          {displayValue}
        </span>
      </label>
      
      <div className="relative group">
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#305399] to-[#4a6fad] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          onMouseDown={handleInputStart}
          onMouseUp={handleInputEnd}
          onTouchStart={handleInputStart}
          onTouchEnd={handleInputEnd}
          disabled={disabled}
          className={`
            absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer
            focus:outline-none focus:ring-0
            ${disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{ 
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none'
          }}
        />
        
        <div 
          className={`
            absolute top-1/2 w-6 h-6 bg-white border-3 border-[#305399] rounded-full shadow-lg 
            transform -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150
            ${isDragging ? 'scale-125 shadow-xl border-[#254080]' : 'group-hover:scale-110'}
            ${disabled ? 'bg-gray-300 border-gray-400' : ''}
          `}
          style={{ left: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
        <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
      </div>
      
      {additionalInfo && (
        <motion.p 
          className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {additionalInfo}
        </motion.p>
      )}
    </motion.div>
  );
});

export const FHSACalculator: React.FC = () => {
  // Form state - properly typed
  const [eligibility, setEligibility] = useState<string>('');
  const [ownedHome, setOwnedHome] = useState<'Yes' | 'No'>('No');
  const [postalCode, setPostalCode] = useState<string>('');
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [annualIncome, setAnnualIncome] = useState<number>(60000);
  
  // FHSA specific fields
  const [purchaseTimeframe, setPurchaseTimeframe] = useState<number>(5); // years from now
  const [existingFHSA, setExistingFHSA] = useState<number>(0);
  const [yearsSinceOpened, setYearsSinceOpened] = useState<number>(0);
  const [previousContributions, setPreviousContributions] = useState<number>(0);
  
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [contributionAmount, setContributionAmount] = useState<number>(300);
  const [oneTimeContribution, setOneTimeContribution] = useState<'Yes' | 'No'>('No');
  const [oneTimeAmount, setOneTimeAmount] = useState<number>(0);

  // ROI state
  const [customROI, setCustomROI] = useState<number>(5);
  
  // Email state
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Results
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalGrowth, setTotalGrowth] = useState<number>(0);
  const [taxSavings, setTaxSavings] = useState<number>(0);
  const [availableContributionRoom, setAvailableContributionRoom] = useState<number>(0);

  // Use calculator services hook
  const { emailStatus, isLoading, sendEmail, clearEmailStatus } = useCalculatorServices();

  // Canadian FHSA Constants 2025
  const constants = useMemo(() => ({
    FHSA_ANNUAL_LIMIT: 8000,
    FHSA_LIFETIME_LIMIT: 40000,
    FHSA_MAX_CARRYFORWARD: 8000,
    FHSA_MAX_YEARS: 15,
    MIN_ROI: 3,
    MAX_ROI: 30,
    AVERAGE_TAX_RATE: 0.25 // 25% average tax rate for deduction benefit
  }), []);

  const frequencyOptions = useMemo(() => [
    { value: 'Annually', label: 'Annually', periods: 1 },
    { value: 'Monthly', label: 'Monthly', periods: 12 },
    { value: 'Every two weeks', label: 'Every two weeks', periods: 26 },
    { value: 'Weekly', label: 'Weekly', periods: 52 }
  ], []);

  // Calculate available contribution room based on FHSA rules
  const calculateContributionRoom = useCallback(() => {
    const currentYearRoom = constants.FHSA_ANNUAL_LIMIT;
    const lifetimeUsed = previousContributions + existingFHSA;
    const lifetimeRemaining = constants.FHSA_LIFETIME_LIMIT - lifetimeUsed;
    
    // Carryforward room (simplified - assumes one year of unused room)
    const potentialCarryforward = Math.min(constants.FHSA_MAX_CARRYFORWARD, lifetimeRemaining - currentYearRoom);
    const maxThisYear = Math.min(
      currentYearRoom + Math.max(0, potentialCarryforward),
      lifetimeRemaining
    );
    
    return {
      thisYear: Math.max(0, maxThisYear),
      lifetime: Math.max(0, lifetimeRemaining)
    };
  }, [constants, previousContributions, existingFHSA]);

  const getPeriodsPerYear = useCallback(() => {
    return frequencyOptions.find(opt => opt.value === frequency)?.periods || 12;
  }, [frequency, frequencyOptions]);

  // FHSA calculation with proper tax benefits
  useEffect(() => {
    const calculateResults = () => {
      if (purchaseTimeframe <= 0) {
        setTotalSaved(0);
        setTotalContributions(0);
        setTotalGrowth(0);
        setTaxSavings(0);
        return;
      }

      const contributionRoom = calculateContributionRoom();
      setAvailableContributionRoom(contributionRoom.thisYear);

      const periodsPerYear = getPeriodsPerYear();
      const totalPeriods = purchaseTimeframe * periodsPerYear;
      const returnRate = customROI / 100;
      const periodRate = returnRate / periodsPerYear;

      // Calculate actual contributions considering limits
      const annualContributions = contributionAmount * periodsPerYear;
      const maxAnnualAllowed = Math.min(constants.FHSA_ANNUAL_LIMIT, contributionRoom.lifetime / purchaseTimeframe);
      const actualAnnualContributions = Math.min(annualContributions, maxAnnualAllowed);
      const actualPeriodicContributions = actualAnnualContributions / periodsPerYear;

      // Initial amount including existing FHSA and one-time contribution
      const initialAmount = existingFHSA + (oneTimeContribution === 'Yes' ? Math.min(oneTimeAmount, contributionRoom.thisYear) : 0);
      
      // Future Value calculation with compound growth
      let futureValue = initialAmount;
      let totalContributionsMade = initialAmount;

      // Compound growth calculation period by period
      for (let i = 0; i < totalPeriods; i++) {
        futureValue = futureValue * (1 + periodRate) + actualPeriodicContributions;
        totalContributionsMade += actualPeriodicContributions;
      }

      // Ensure we don't exceed lifetime limit
      const lifetimeUsed = previousContributions + totalContributionsMade;
      if (lifetimeUsed > constants.FHSA_LIFETIME_LIMIT) {
        const excessContributions = lifetimeUsed - constants.FHSA_LIFETIME_LIMIT;
        totalContributionsMade -= excessContributions;
        futureValue -= excessContributions * Math.pow(1 + periodRate, totalPeriods / 2); // Approximate adjustment
      }

      const totalGrowthAmount = futureValue - totalContributionsMade;
      const newContributions = totalContributionsMade - existingFHSA;
      const taxSavingsAmount = newContributions * constants.AVERAGE_TAX_RATE;

      setTotalSaved(Math.max(0, futureValue));
      setTotalContributions(Math.max(0, totalContributionsMade));
      setTotalGrowth(Math.max(0, totalGrowthAmount));
      setTaxSavings(Math.max(0, taxSavingsAmount));
    };

    const debounceTimer = setTimeout(calculateResults, 100);
    return () => clearTimeout(debounceTimer);
  }, [
    purchaseTimeframe, contributionAmount, frequency, existingFHSA, 
    oneTimeContribution, oneTimeAmount, customROI, previousContributions,
    constants, calculateContributionRoom, getPeriodsPerYear
  ]);

  // Validation and formatting functions
  const validatePostalCode = useCallback((code: string): boolean => {
    if (!code.trim()) return true;
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalRegex.test(code.trim());
  }, []);

  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  const getProgressPercentage = useMemo(() => {
    if (totalSaved === 0) return 0;
    return Math.min((totalContributions / totalSaved) * 100, 100);
  }, [totalSaved, totalContributions]);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    
    if (!userEmail) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(userEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [userEmail, validateEmail]);

  // Event handlers
  const handlePostalCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setPostalCode(value);
    
    if (formErrors.postalCode) {
      setFormErrors(prev => ({ ...prev, postalCode: undefined }));
    }
    
    if (value && !validatePostalCode(value)) {
      setFormErrors(prev => ({ ...prev, postalCode: 'Please enter a valid Canadian postal code (e.g., K1A 0A6)' }));
    }
  }, [formErrors.postalCode, validatePostalCode]);

  const handleEmailInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: undefined }));
    }
  }, [formErrors.email]);

  // Email handler
  const handleSendEmail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const results = {
      totalAmount: totalSaved,
      contributions: totalContributions,
      returns: totalGrowth,
      roiRate: customROI,
      taxSavings: taxSavings,
      availableRoom: availableContributionRoom
    };

    const inputs = {
      eligibility,
      ownedHome,
      currentAge,
      annualIncome,
      purchaseTimeframe,
      existingFHSA,
      yearsSinceOpened,
      previousContributions,
      contributionFrequency: frequency,
      contributionAmount,
      oneTimeContribution,
      oneTimeAmount: oneTimeContribution === 'Yes' ? oneTimeAmount : 0,
      customROI,
      postalCode: postalCode || 'Not provided'
    };

    await sendEmail(userEmail, 'FHSA', results, inputs, true);
    
    if (emailStatus.type === 'success') {
      setShowEmailModal(false);
      setUserEmail('');
      setFormErrors({});
    }
  }, [validateForm, totalSaved, totalContributions, totalGrowth, customROI, taxSavings, availableContributionRoom, eligibility, ownedHome, currentAge, annualIncome, purchaseTimeframe, existingFHSA, yearsSinceOpened, previousContributions, frequency, contributionAmount, oneTimeContribution, oneTimeAmount, postalCode, userEmail, sendEmail, emailStatus.type]);

  // Modal handlers
  const openEmailModal = useCallback(() => {
    setShowEmailModal(true);
    clearEmailStatus();
  }, [clearEmailStatus]);

  const closeEmailModal = useCallback(() => {
    setShowEmailModal(false);
    setUserEmail('');
    setFormErrors({});
    clearEmailStatus();
  }, [clearEmailStatus]);

  // Check eligibility based on inputs
  const isEligible = useMemo(() => {
    return currentAge >= 18 && currentAge <= 71 && ownedHome === 'No';
  }, [currentAge, ownedHome]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter','sans-serif']">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <motion.header
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-[#305399] to-[#4a6fad] p-4 rounded-full mb-4 shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="text-white" size={32} />
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#305399] mb-2">Investor Insurance</h3>
            <p className="text-sm text-gray-600">Your Financial Planning Partner</p>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-2">
            FHSA Calculator
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            Calculate how much you can save in your First Home Savings Account (FHSA) for purchasing your first home in Canada.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg max-w-2xl mx-auto mb-4">
            <p className="text-sm text-gray-700">
              An FHSA combines the best of RRSPs and TFSAs - contributions are tax-deductible and qualifying withdrawals are tax-free! 🏠💰
            </p>
          </div>
          
          <motion.a 
            href="#" 
            className="text-blue-600 hover:text-blue-800 underline text-sm inline-flex items-center transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Info size={16} className="mr-1" />
            Learn about FHSA Eligibility
          </motion.a>
        </motion.header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Form */}
          <motion.div
            className="xl:col-span-2 bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Eligibility Check */}
              {!isEligible && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <AlertCircle className="text-red-500 mr-2 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-red-800 font-semibold">Eligibility Issue</p>
                      <p className="text-red-700 text-sm">
                        Based on your inputs, you may not be eligible for an FHSA. You must be 18-71 years old and a first-time home buyer.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                
                <OptimizedRangeInput
                  label="Current Age"
                  icon={<Calendar className="mr-3 text-[#305399]" size={20} />}
                  value={currentAge}
                  onChange={setCurrentAge}
                  min={18}
                  max={71}
                  unit=" years"
                />

                <OptimizedRangeInput
                  label="Annual Income"
                  icon={<TrendingUp className="mr-3 text-[#305399]" size={20} />}
                  value={annualIncome}
                  onChange={setAnnualIncome}
                  min={30000}
                  max={150000}
                  step={1000}
                  formatValue={formatCurrency}
                  additionalInfo="Used to calculate tax deduction benefits"
                />

                {/* Home Ownership Question */}
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <Users className="mr-3 text-[#305399]" size={20} />
                    Have you or your spouse owned a home in the last 4 years?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Yes', 'No'].map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => setOwnedHome(option as 'Yes' | 'No')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          ownedHome === option
                            ? 'bg-[#305399] text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Postal Code */}
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <MapPin className="mr-3 text-[#305399]" size={20} />
                    Canadian Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    maxLength={7}
                    className={`w-full px-4 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 bg-white ${
                      formErrors.postalCode
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-gray-300 focus:ring-[#305399]/20 focus:border-[#305399]'
                    }`}
                    placeholder="K1A 0A6"
                  />
                  {formErrors.postalCode && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm flex items-center"
                    >
                      <X size={16} className="mr-1" />
                      {formErrors.postalCode}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Investment Parameters */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Investment Parameters
                </h3>
                
                <OptimizedRangeInput
                  label="Home Purchase Timeframe"
                  icon={<Home className="mr-3 text-[#305399]" size={20} />}
                  value={purchaseTimeframe}
                  onChange={setPurchaseTimeframe}
                  min={1}
                  max={15}
                  unit=" years"
                  additionalInfo="How many years from now do you plan to buy your first home?"
                />

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <OptimizedRangeInput
                    label="Expected Annual Return (ROI)"
                    icon={<Percent className="mr-3 text-[#305399]" size={20} />}
                    value={customROI}
                    onChange={setCustomROI}
                    min={constants.MIN_ROI}
                    max={constants.MAX_ROI}
                    step={0.1}
                    unit="%"
                    additionalInfo="Conservative: 3-5%, Moderate: 5-8%, Aggressive: 8-12%. Consider your risk tolerance and investment timeline."
                  />
                </div>
              </div>

              {/* FHSA Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  FHSA Details
                </h3>
                
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <Home className="mr-3 text-[#305399]" size={20} />
                    Current FHSA Balance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <input
                      type="number"
                      value={existingFHSA === 0 ? '' : existingFHSA}
                      onChange={(e) => {
                        const value = e.target.value;
                        setExistingFHSA(value === '' ? 0 : Math.max(0, Number(value)));
                      }}
                      min="0"
                      max={constants.FHSA_LIFETIME_LIMIT}
                      step="100"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#305399]/20 focus:border-[#305399] transition-all duration-200 bg-white"
                      placeholder="Current balance in your FHSA"
                    />
                  </div>
                </motion.div>

                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <Calculator className="mr-3 text-[#305399]" size={20} />
                    Previous FHSA Contributions (Total)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <input
                      type="number"
                      value={previousContributions === 0 ? '' : previousContributions}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPreviousContributions(value === '' ? 0 : Math.max(0, Math.min(constants.FHSA_LIFETIME_LIMIT, Number(value))));
                      }}
                      min="0"
                      max={constants.FHSA_LIFETIME_LIMIT}
                      step="100"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#305399]/20 focus:border-[#305399] transition-all duration-200 bg-white"
                      placeholder="Total contributed to FHSA so far"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Remaining lifetime room: {formatCurrency(constants.FHSA_LIFETIME_LIMIT - previousContributions - existingFHSA)}
                  </p>
                </motion.div>

                <OptimizedRangeInput
                  label="Regular Contribution Amount"
                  icon={<DollarSign className="mr-3 text-[#305399]" size={20} />}
                  value={contributionAmount}
                  onChange={setContributionAmount}
                  min={0}
                  max={800}
                  step={25}
                  formatValue={formatCurrency}
                  additionalInfo={`Annual total: ${formatCurrency(contributionAmount * getPeriodsPerYear())} (Max allowed: ${formatCurrency(constants.FHSA_ANNUAL_LIMIT)})`}
                />

                {/* Frequency Selection */}
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <Calculator className="mr-3 text-[#305399]" size={20} />
                    Contribution Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {frequencyOptions.map((option) => (
                      <motion.label 
                        key={option.value} 
                        className={`flex items-center cursor-pointer p-4 rounded-xl transition-all duration-200 border-2 ${
                          frequency === option.value 
                            ? 'border-[#305399] bg-blue-50 shadow-md' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={option.value}
                          checked={frequency === option.value}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-4 h-4 text-[#305399] border-2 focus:ring-[#305399]"
                        />
                        <span className={`ml-3 font-medium ${
                          frequency === option.value ? 'text-[#305399]' : 'text-gray-700'
                        }`}>
                          {option.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* One-time Contribution */}
                <motion.div className="space-y-3">
                  <label className="text-lg font-semibold text-gray-700">
                    Add a one-time contribution this year?
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {['Yes', 'No'].map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => setOneTimeContribution(option as 'Yes' | 'No')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          oneTimeContribution === option
                            ? 'bg-[#305399] text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {oneTimeContribution === 'Yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                          <input
                            type="number"
                            value={oneTimeAmount === 0 ? '' : oneTimeAmount}
                            onChange={(e) => {
                              const value = e.target.value;
                              const maxAllowed = Math.min(constants.FHSA_ANNUAL_LIMIT, availableContributionRoom || constants.FHSA_ANNUAL_LIMIT);
                              setOneTimeAmount(value === '' ? 0 : Math.max(0, Math.min(maxAllowed, Number(value))));
                            }}
                            min="0"
                            max={constants.FHSA_ANNUAL_LIMIT}
                            step="100"
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#305399]/20 focus:border-[#305399] transition-all duration-200 bg-white"
                            placeholder="One-time contribution amount"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </form>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Total Saved */}
            <div className="text-center mb-8">
              <motion.p 
                className="text-gray-600 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your FHSA at Purchase Time
              </motion.p>
              <motion.div 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#305399] to-[#4a6fad] bg-clip-text text-transparent"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {formatCurrency(totalSaved)}
              </motion.div>
              <div className="text-sm text-gray-500 mt-2">
                Ready for your first home in {purchaseTimeframe} years
              </div>
            </div>

            {/* Enhanced Progress Visualization */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#305399" />
                    <stop offset="100%" stopColor="#4a6fad" />
                  </linearGradient>
                  <linearGradient id="returnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * getProgressPercentage / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * getProgressPercentage / 100) }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#returnGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * (100 - getProgressPercentage) / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * (100 - getProgressPercentage) / 100) }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{customROI}%</div>
                  <div className="text-xs text-gray-500">return</div>
                </div>
              </div>
            </div>

            {/* Breakdown - Enhanced */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#305399]/10 to-transparent rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-[#305399] to-[#4a6fad] rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">Your Contributions</span>
                </div>
                <span className="font-bold text-[#305399]">{formatCurrency(totalContributions)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100/50 to-transparent rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">Investment Growth</span>
                </div>
                <span className="font-bold text-blue-500">{formatCurrency(totalGrowth)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-100/50 to-transparent rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">Tax Deduction Benefit</span>
                </div>
                <span className="font-bold text-green-600">{formatCurrency(taxSavings)}</span>
              </div>
            </div>

            {/* Contribution Room Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-amber-800 mb-2">Available Contribution Room</h4>
              <p className="text-sm text-amber-700">
                This year: {formatCurrency(availableContributionRoom)}<br/>
                Lifetime remaining: {formatCurrency(constants.FHSA_LIFETIME_LIMIT - previousContributions - existingFHSA)}
              </p>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                <span className="text-gray-800">Total for Down Payment</span>
                <span className="text-gray-800">{formatCurrency(totalSaved)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-auto">
              <motion.button
                onClick={openEmailModal}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <Mail size={20} />
                Email Results
              </motion.button>
              
              <motion.button
                className="w-full border-2 border-[#305399] text-[#305399] font-bold py-4 rounded-xl hover:bg-[#305399] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Find Financial Advisor
                <ArrowRight size={20} />
              </motion.button>
            </div>

            {/* Enhanced Disclaimer */}
            <div className="text-xs text-gray-500 mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <Info className="text-amber-600 mr-2 flex-shrink-0" size={14} />
                <div>
                  <p className="font-semibold text-amber-800 mb-1">Important Disclaimer</p>
                  <p>This calculation is for informational purposes only. FHSA rules are complex - consult a financial advisor for personalized advice. Tax benefits shown are estimates.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 p-8 rounded-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Home className="mr-2 text-[#305399]" size={24} />
                  2025 FHSA Rules
                </h3>
                <ul className="text-gray-600 leading-relaxed space-y-2 text-sm">
                  <li>• Annual limit: <span className="font-bold text-orange-600">${constants.FHSA_ANNUAL_LIMIT.toLocaleString()}</span></li>
                  <li>• Lifetime limit: <span className="font-bold text-orange-600">${constants.FHSA_LIFETIME_LIMIT.toLocaleString()}</span></li>
                  <li>• Up to ${constants.FHSA_MAX_CARRYFORWARD.toLocaleString()} carryforward per year</li>
                  <li>• Maximum {constants.FHSA_MAX_YEARS} years to use</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-[#305399]" size={24} />
                  FHSA Benefits
                </h3>
                <ul className="text-gray-600 leading-relaxed space-y-2 text-sm">
                  <li>• <strong>Tax deductible</strong> contributions (like RRSP)</li>
                  <li>• <strong>Tax-free</strong> growth on investments</li>
                  <li>• <strong>Tax-free</strong> withdrawals for qualifying home purchase</li>
                  <li>• Can transfer unused funds to RRSP/RRIF</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Mail className="mr-2 text-[#305399]" size={24} />
                  Email Results
                </h3>
                <motion.button
                  onClick={closeEmailModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={handleEmailInputChange}
                    placeholder="Enter your email address"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                      formErrors.email 
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-[#305399] focus:border-[#305399]'
                    }`}
                    required
                    disabled={isLoading}
                  />
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={closeEmailModal}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isLoading || !userEmail}
                    className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                      isLoading || !userEmail
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#305399] to-[#4a6fad] text-white hover:from-[#254080] hover:to-[#3d5a94] shadow-lg'
                    }`}
                    whileHover={!isLoading && userEmail ? { scale: 1.02 } : {}}
                    whileTap={!isLoading && userEmail ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Email'
                    )}
                  </motion.button>
                </div>

                {emailStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      emailStatus.type === 'success' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : emailStatus.type === 'error'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        {emailStatus.type === 'success' ? '✅' : emailStatus.type === 'error' ? '❌' : 'ℹ️'}
                      </div>
                      <div className="text-sm">{emailStatus.message}</div>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default FHSACalculator;
