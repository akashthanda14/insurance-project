import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  PiggyBank,
  ArrowRight,
  Info,
  MapPin,
  Target,
  HelpCircle,
  BarChart3,
  Mail,
  Percent,
  X
} from "lucide-react";
import { useCalculatorServices } from '../hooks/useCalculatorServices';

interface FormErrors {
  email?: string;
  postalCode?: string;
  general?: string;
}

// A simple switch component for the quick/detailed toggle
const Switch = ({ checked, onChange }: { checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#305399]"></div>
  </label>
);


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
  disabled = false,
  allowManualInput = true
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
  allowManualInput?: boolean;
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [inputVal, setInputVal] = useState(String(value));

  const toggleManual = () => setIsManual(p => !p);

  // Sync input value with prop value when not in manual mode
  useEffect(() => {
    if (!isManual) {
      setInputVal(String(value));
    }
  }, [value, isManual]);
  
  // Calculate progress percentage for visual feedback
  const progressPercentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  // Handle all slider events for smooth operation
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

  // Format display value
  const displayValue = useMemo(() => {
    return formatValue ? formatValue(value) : `${value}${unit}`;
  }, [value, unit, formatValue]);

  // Dynamic slider track styling
  const sliderStyle = useMemo(() => ({
    background: `linear-gradient(to right, #305399 0%, #305399 ${progressPercentage}%, #e5e7eb ${progressPercentage}%, #e5e7eb 100%)`,
  }), [progressPercentage]);

  return (
    <motion.div 
      className="space-y-3"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
        {icon}
        <span className="flex-1">{label}</span>
        {isManual ? (
          <input
            type="number"
            step={step}
            min={min}
            max={max}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onBlur={() => { const n = parseFloat(inputVal); if (!isNaN(n)) onChange(n); }}
            className="w-28 text-right border-b border-gray-300 focus:outline-none focus:border-[#305399]"
          />
        ) : (
          <span className={`font-bold text-[#305399] text-lg ${isDragging ? 'scale-110 transition-transform' : ''}`}>
            {displayValue}
          </span>
        )}
        {allowManualInput &&
          <button
            type="button"
            onClick={toggleManual}
            className="ml-2 text-sm text-[#305399] hover:underline"
          >
            {isManual ? 'Done' : 'Edit'}
          </button>}
      </label>
      
      <div className="relative group">
        {/* Custom slider track */}
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#305399] to-[#4a6fad] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Actual input slider (invisible but functional) */}
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
        
        {/* Custom thumb */}
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
      
      {/* Min/Max labels */}
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

export const TFSACalculator: React.FC = () => {
  // Form state - optimized with proper typing
  const [postalCode, setPostalCode] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<number>(50000);
  const [timeHorizon, setTimeHorizon] = useState<number>(10);
  const [knowProjectAmount, setKnowProjectAmount] = useState<string>('No');
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [contributionAmount, setContributionAmount] = useState<number>(200);
  const [initialContribution, setInitialContribution] = useState<number>(0);
  
  // ROI state - simplified to just slider (same as RRSP)
  const [customROI, setCustomROI] = useState<number>(5);
  
  // Email state
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // UI state
  const [quick, setQuick] = useState(true);

  // Results
  const [tfsaAmount, setTfsaAmount] = useState<number>(0);
  const [nonRegisteredAmount, setNonRegisteredAmount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalGrowth, setTotalGrowth] = useState<number>(0);
  const [taxSheltered, setTaxSheltered] = useState<number>(0);

  // Use calculator services hook
  const { emailStatus, isLoading, sendEmail, clearEmailStatus } = useCalculatorServices();

  // Canadian TFSA Constants 2025 - memoized for performance
  const constants = useMemo(() => ({
    TFSA_CONTRIBUTION_LIMIT_2025: 7000,
    TFSA_TOTAL_ROOM_2025: 95000,
    MARGINAL_TAX_RATE: 0.30,
    MIN_ROI: 3,
    MAX_ROI: 30
  }), []);

  const frequencyOptions = useMemo(() => [
    { value: 'Annually', label: 'Annually', periods: 1 },
    { value: 'Monthly', label: 'Monthly', periods: 12 },
    { value: 'Every two weeks', label: 'Every two weeks', periods: 26 },
    { value: 'Weekly', label: 'Weekly', periods: 52 }
  ], []);

  // Memoized calculation functions for performance
  const getPeriodsPerYear = useCallback(() => {
    return frequencyOptions.find(opt => opt.value === frequency)?.periods || 12;
  }, [frequency, frequencyOptions]);

  // Canadian postal code validation
  const validatePostalCode = useCallback((code: string): boolean => {
    if (!code.trim()) return true;
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalRegex.test(code.trim());
  }, []);
  
  // Load state from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('tfsaState');
    if (saved) {
      const s = JSON.parse(saved);
      if (s.postalCode !== undefined) setPostalCode(s.postalCode);
      if (s.annualIncome !== undefined) setAnnualIncome(s.annualIncome);
      if (s.timeHorizon !== undefined) setTimeHorizon(s.timeHorizon);
      if (s.frequency !== undefined) setFrequency(s.frequency);
      if (s.contributionAmount !== undefined) setContributionAmount(s.contributionAmount);
      if (s.initialContribution !== undefined) setInitialContribution(s.initialContribution);
      if (s.customROI !== undefined) setCustomROI(s.customROI);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      postalCode,
      annualIncome,
      timeHorizon,
      frequency,
      contributionAmount,
      initialContribution,
      customROI
    };
    localStorage.setItem('tfsaState', JSON.stringify(state));
  }, [postalCode, annualIncome, timeHorizon, frequency, contributionAmount, initialContribution, customROI]);


  // TFSA vs Non-Registered Account Calculation - Enhanced with custom ROI
  useEffect(() => {
    const calculateResults = () => {
      if (timeHorizon <= 0) {
        setTfsaAmount(0);
        setNonRegisteredAmount(0);
        setTotalContributions(0);
        setTotalGrowth(0);
        setTaxSheltered(0);
        return;
      }

      const periods = getPeriodsPerYear();
      const totalPeriods = timeHorizon * periods;
      const returnRate = customROI / 100; // Use custom ROI instead of fixed rate
      const periodRate = returnRate / periods;
      const nonRegPeriodRate = (returnRate * (1 - constants.MARGINAL_TAX_RATE)) / periods;

      // Total contributions over time
      const totalContrib = initialContribution + (contributionAmount * totalPeriods);
      
      // TFSA Future Value (tax-free growth)
      const tfsaFutureValue = initialContribution * Math.pow(1 + periodRate, totalPeriods) +
        contributionAmount * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate);

      // Non-registered account (taxable growth)
      const nonRegFutureValue = initialContribution * Math.pow(1 + nonRegPeriodRate, totalPeriods) +
        contributionAmount * ((Math.pow(1 + nonRegPeriodRate, totalPeriods) - 1) / nonRegPeriodRate);

      // Tax savings calculation
      const tfsaGrowth = tfsaFutureValue - totalContrib;
      const nonRegGrowth = nonRegFutureValue - totalContrib;
      const taxSheltered = tfsaGrowth - nonRegGrowth;

      setTfsaAmount(tfsaFutureValue);
      setNonRegisteredAmount(nonRegFutureValue);
      setTotalContributions(totalContrib);
      setTotalGrowth(tfsaGrowth);
      setTaxSheltered(taxSheltered);
    };

    const debounceTimer = setTimeout(calculateResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [timeHorizon, contributionAmount, frequency, initialContribution, customROI, getPeriodsPerYear, constants.MARGINAL_TAX_RATE]);

  // Memoized formatting functions
  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  const formatNumber = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-CA').format(value);
  }, []);

  const getProgressPercentage = useMemo(() => {
    if (tfsaAmount === 0) return 0;
    return Math.min((totalContributions / tfsaAmount) * 100, 100);
  }, [tfsaAmount, totalContributions]);

  // Validation functions
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

  // Event handlers - optimized with useCallback
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

  // Email Handler
  const handleSendEmail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const results = {
      totalAmount: tfsaAmount,
      contributions: totalContributions,
      returns: totalGrowth,
      roiRate: customROI,
      taxSheltered: taxSheltered
    };

    const inputs = {
      timeHorizon,
      contributionFrequency: frequency,
      contributionAmount,
      initialContribution,
      customROI,
      postalCode: postalCode || 'Not provided',
      annualIncome
    };

    await sendEmail(userEmail, 'TFSA', results, inputs, true);
    
    if (emailStatus.type === 'success') {
      setShowEmailModal(false);
      setUserEmail('');
      setFormErrors({});
    }
  }, [validateForm, tfsaAmount, totalContributions, totalGrowth, customROI, taxSheltered, timeHorizon, frequency, contributionAmount, initialContribution, postalCode, annualIncome, userEmail, sendEmail, emailStatus.type]);

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

  const getChartHeight = useCallback((amount: number, maxAmount: number) => {
    return Math.max((amount / maxAmount) * 200, 10);
  }, []);

  const maxAmount = useMemo(() => Math.max(tfsaAmount, nonRegisteredAmount), [tfsaAmount, nonRegisteredAmount]);

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
            <Target className="text-white" size={32} />
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#305399] mb-2">Investor Insurance</h3>
            <p className="text-sm text-gray-600">Your Financial Planning Partner</p>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-2">
            TFSA Calculator
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
            Calculate how much you need to save in a tax-free savings account (TFSA) to reach your goals. 
            You'll get an illustration of savings growth and a comparison of returns between investing in a TFSA and investing in a non-registered account.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Form - Enhanced */}
          <motion.div
            className="xl:col-span-2 bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              {/* Quick / Detailed Toggle */}
              <div className="flex items-center mb-6">
                <span className="mr-3 font-medium text-gray-700">Quick setup</span>
                <Switch checked={!quick} onChange={e => setQuick(!e.target.checked)} />
                <span className="ml-3 font-medium text-gray-700">Detailed</span>
              </div>
              
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                
                {/* Annual Income */}
                {!quick && (
                  <OptimizedRangeInput
                    label="Annual Income"
                    icon={<TrendingUp className="mr-3 text-[#305399]" size={20} />}
                    value={annualIncome}
                    onChange={setAnnualIncome}
                    min={20000}
                    max={200000}
                    step={1000}
                    formatValue={formatCurrency}
                    additionalInfo="Used for tax calculation purposes"
                  />
                )}

                {/* Postal Code with Enhanced Validation */}
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

              {/* Investment Parameters Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Investment Parameters
                </h3>
                
                {/* Time Horizon */}
                <OptimizedRangeInput
                  label="Time Horizon for Your Project"
                  icon={<Calendar className="mr-3 text-[#305399]" size={20} />}
                  value={timeHorizon}
                  onChange={setTimeHorizon}
                  min={1}
                  max={40}
                  unit=" years"
                  additionalInfo={`Investment period: ${timeHorizon} years`}
                />

                {/* ROI Section - Enhanced with gradient background */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <OptimizedRangeInput
                    label="Annual Return Rate (ROI)"
                    icon={<Percent className="mr-3 text-[#305399]" size={20} />}
                    value={customROI}
                    onChange={setCustomROI}
                    min={constants.MIN_ROI}
                    max={constants.MAX_ROI}
                    step={0.1}
                    unit="%"
                    additionalInfo="Historical market returns typically range from 3% to 12%. Conservative estimate: 3-5%, Moderate: 5-8%, Aggressive: 8-12%"
                  />
                </div>
              </div>

              {/* Contribution Details Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Contribution Details
                </h3>

                {/* Project Amount Knowledge */}
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <HelpCircle className="mr-3 text-[#305399]" size={20} />
                    Do you know the amount you need for your project?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Yes', 'No'].map((option) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => setKnowProjectAmount(option)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          knowProjectAmount === option
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

                {/* Regular Contribution Amount */}
                <OptimizedRangeInput
                  label="Amount of Your Contribution"
                  icon={<DollarSign className="mr-3 text-[#305399]" size={20} />}
                  value={contributionAmount}
                  onChange={setContributionAmount}
                  min={0}
                  max={1000}
                  step={25}
                  formatValue={formatCurrency}
                  additionalInfo={`Annual total: ${formatCurrency(contributionAmount * getPeriodsPerYear())}`}
                />

                {/* Frequency Selection */}
                <motion.div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-700">
                    <Calculator className="mr-3 text-[#305399]" size={20} />
                    Frequency of Contributions
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

                {/* Initial Contribution */}
                <OptimizedRangeInput
                  label="Contribution You Wish to Make Right Now"
                  icon={<PiggyBank className="mr-3 text-[#305399]" size={20} />}
                  value={initialContribution}
                  onChange={setInitialContribution}
                  min={0}
                  max={10000}
                  step={100}
                  formatValue={formatCurrency}
                />
              </div>
            </form>
          </motion.div>

          {/* Results Panel - Enhanced */}
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.p 
                className="text-gray-600 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your TFSA Savings Results
              </motion.p>
              <motion.div 
                className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#305399] to-[#4a6fad] bg-clip-text text-transparent"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {formatCurrency(tfsaAmount)}
              </motion.div>
              <div className="text-sm text-gray-500 mt-2">
                Using {customROI}% annual return over {timeHorizon} years
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
                  <div className="text-2xl font-bold text-gray-800">{timeHorizon}</div>
                  <div className="text-xs text-gray-500">years</div>
                </div>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="mb-6">
              <div className="flex justify-center items-end space-x-8 mb-4" style={{ height: '220px' }}>
                {/* TFSA Bar */}
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <motion.div
                    className="bg-[#305399] rounded-t-lg flex items-end justify-center text-white text-xs font-bold relative"
                    style={{ 
                      width: '60px', 
                      height: `${getChartHeight(tfsaAmount, maxAmount)}px`,
                      minHeight: '40px'
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${getChartHeight(tfsaAmount, maxAmount)}px` }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <div className="absolute -top-6 text-[#305399] text-xs font-bold whitespace-nowrap">
                      {formatCurrency(tfsaAmount)}
                    </div>
                  </motion.div>
                  <div className="text-xs text-gray-600 mt-2 text-center">TFSA</div>
                </motion.div>

                {/* Non-registered Bar */}
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  <motion.div
                    className="bg-[#60a5fa] rounded-t-lg flex items-end justify-center text-white text-xs font-bold relative"
                    style={{ 
                      width: '60px', 
                      height: `${getChartHeight(nonRegisteredAmount, maxAmount)}px`,
                      minHeight: '40px'
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${getChartHeight(nonRegisteredAmount, maxAmount)}px` }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    <div className="absolute -top-6 text-[#60a5fa] text-xs font-bold whitespace-nowrap">
                      {formatCurrency(nonRegisteredAmount)}
                    </div>
                  </motion.div>
                  <div className="text-xs text-gray-600 mt-2 text-center">Non-registered</div>
                </motion.div>
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
                  <span className="text-gray-700 font-medium">Tax Savings Advantage</span>
                </div>
                <span className="font-bold text-green-600">{formatCurrency(Math.max(taxSheltered, 0))}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                <span className="text-gray-800">Total TFSA Value</span>
                <span className="text-gray-800">{formatCurrency(tfsaAmount)}</span>
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
                  <p>This calculation is for informational purposes only. Actual results may vary based on market conditions, fees, and investment choices. Please consult a financial advisor for personalized advice.</p>
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-8 rounded-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <PiggyBank className="mr-2 text-[#305399]" size={24} />
                  2025 TFSA Limits
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The annual TFSA contribution limit for 2025 is <span className="font-bold text-[#305399]">${constants.TFSA_CONTRIBUTION_LIMIT_2025.toLocaleString()}</span>.
                </p>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Total TFSA contribution room since 2009: <span className="font-bold text-[#305399]">${constants.TFSA_TOTAL_ROOM_2025.toLocaleString()}</span>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-[#305399]" size={24} />
                  Investment Growth
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your TFSA investments grow tax-free. Historical market returns have averaged 5-7% annually over long periods, but individual results may vary. The tax savings advantage becomes more significant over time.
                </p>
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
                        {emailStatus.type === 'success' ? 'Ã¢Å“â€¦' : emailStatus.type === 'error' ? 'Ã¢ÂÅ’' : 'Ã¢â€žÂ¹Ã¯Â¸Â'}
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

export default TFSACalculator;