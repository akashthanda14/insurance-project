import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator,
  GraduationCap,
  DollarSign,
  Calendar,
  MapPin,
  ArrowRight,
  Info,
  Download,
  ChevronDown,
  Mail,
  Percent,
  X,
  Users,
  BookOpen
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

export const RESPCalculator: React.FC = () => {
  // Form state - optimized with proper typing
  const [childAge, setChildAge] = useState<number>(0);
  const [contributionAmount, setContributionAmount] = useState<number>(200);
  const [postalCode, setPostalCode] = useState<string>('');
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);
  const [numChildren, setNumChildren] = useState<number>(1);
  
  // ROI state - added from RRSP
  const [customROI, setCustomROI] = useState<number>(5);
  
  // Email state - added from RRSP
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Results
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [yourContributions, setYourContributions] = useState<number>(0);
  const [govGrants, setGovGrants] = useState<number>(0);
  const [interestGenerated, setInterestGenerated] = useState<number>(0);

  // Use calculator services hook - added from RRSP
  const { emailStatus, isLoading, sendEmail, clearEmailStatus } = useCalculatorServices();

  // Canadian RESP Constants 2025 - memoized for performance
  const constants = useMemo(() => ({
    MAX_CHILD_AGE: 17,
    LIFETIME_CONTRIBUTION_LIMIT: 50000,
    CESG_RATE: 0.20,
    MAX_ANNUAL_GRANT: 500,
    MAX_LIFETIME_GRANT: 7200,
    MAX_QUALIFYING_CONTRIBUTION: 2500, // Annual amount that qualifies for full CESG
    MONTHS_IN_YEAR: 12,
    MIN_ROI: 3,
    MAX_ROI: 30
  }), []);

  // Use calculator services hook
  const validatePostalCode = useCallback((code: string): boolean => {
    if (!code.trim()) return true;
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalRegex.test(code.trim());
  }, []);

  // RESP Future Value Calculation - Enhanced with custom ROI
  useEffect(() => {
    const calculateResults = () => {
      if (childAge < 0 || childAge > constants.MAX_CHILD_AGE || contributionAmount <= 0) {
        setTotalSaved(0);
        setYourContributions(0);
        setGovGrants(0);
        setInterestGenerated(0);
        return;
      }

      const yearsToContribute = constants.MAX_CHILD_AGE - childAge;
      if (yearsToContribute <= 0) {
        setTotalSaved(0);
        setYourContributions(0);
        setGovGrants(0);
        setInterestGenerated(0);
        return;
      }

      // Calculate total contributions
      const monthlyContributions = contributionAmount;
      const totalMonths = yearsToContribute * constants.MONTHS_IN_YEAR;
      const totalContributions = monthlyContributions * totalMonths;

      // Calculate government grants (CESG)
      const annualContributions = monthlyContributions * constants.MONTHS_IN_YEAR;
      const qualifyingAnnualContribution = Math.min(annualContributions, constants.MAX_QUALIFYING_CONTRIBUTION);
      const annualGrant = Math.min(qualifyingAnnualContribution * constants.CESG_RATE, constants.MAX_ANNUAL_GRANT);
      const totalGrants = Math.min(annualGrant * yearsToContribute, constants.MAX_LIFETIME_GRANT);

      // Future value calculation with compound interest using custom ROI
      const monthlyRate = (customROI / 100) / constants.MONTHS_IN_YEAR;
      let futureValueContributions = 0;
      let futureValueGrants = 0;

      // Calculate future value of monthly contributions
      for (let month = 1; month <= totalMonths; month++) {
        const monthsRemaining = totalMonths - month;
        futureValueContributions += monthlyContributions * Math.pow(1 + monthlyRate, monthsRemaining);
      }

      // Calculate future value of annual grants (assuming they're deposited mid-year)
      for (let year = 1; year <= yearsToContribute; year++) {
        const monthsRemaining = (yearsToContribute - year) * constants.MONTHS_IN_YEAR + 6; // Mid-year
        futureValueGrants += annualGrant * Math.pow(1 + monthlyRate, monthsRemaining);
      }

      const totalFutureValue = futureValueContributions + futureValueGrants;
      const interestEarned = totalFutureValue - totalContributions - totalGrants;

      setTotalSaved(totalFutureValue);
      setYourContributions(totalContributions);
      setGovGrants(totalGrants);
      setInterestGenerated(interestEarned);
    };

    const debounceTimer = setTimeout(calculateResults, 100);
    return () => clearTimeout(debounceTimer);
  }, [childAge, contributionAmount, customROI, constants]);

  // Memoized formatting functions
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
    return Math.min((yourContributions / totalSaved) * 100, 100);
  }, [totalSaved, yourContributions]);

  const yearsToContribute = useMemo(() => Math.max(constants.MAX_CHILD_AGE - childAge, 0), [constants.MAX_CHILD_AGE, childAge]);

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

  // Email Handler - added from RRSP
  const handleSendEmail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const results = {
      totalAmount: totalSaved,
      contributions: yourContributions,
      returns: interestGenerated,
      govGrants: govGrants,
      roiRate: customROI
    };

    const inputs = {
      childAge,
      yearsToContribute,
      contributionAmount,
      numChildren,
      customROI,
      postalCode: postalCode || 'Not provided'
    };

    await sendEmail(userEmail, 'RESP', results, inputs, true);
    
    if (emailStatus.type === 'success') {
      setShowEmailModal(false);
      setUserEmail('');
      setFormErrors({});
    }
  }, [validateForm, totalSaved, yourContributions, interestGenerated, govGrants, customROI, childAge, yearsToContribute, contributionAmount, numChildren, postalCode, userEmail, sendEmail, emailStatus.type]);

  // Modal handlers - added from RRSP
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter','sans-serif']">
      <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Header - Enhanced */}
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
            <GraduationCap className="text-white" size={32} />
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#305399] mb-2">Investor Insurance</h3>
            <p className="text-sm text-gray-600">Your Financial Planning Partner</p>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
            RESP Calculator
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg max-w-3xl mx-auto mb-4">
            <div className="flex items-start">
              <Calculator className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700 text-left leading-relaxed">
                Use the RESP calculator to calculate the total return on a{' '}
                <motion.a 
                  href="#" 
                  className="text-blue-600 underline hover:text-blue-800"
                  whileHover={{ scale: 1.02 }}
                >
                  registered education savings plan
                </motion.a>
                . You'll get the amount you'll have saved when your child begins post-secondary studies, including government grants and investment growth.
              </p>
            </div>
          </div>
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
              {/* Child Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Child Information
                </h3>
                
                {/* Child's Age */}
                <OptimizedRangeInput
                  label="Child's Age"
                  icon={<Calendar className="mr-3 text-[#305399]" size={20} />}
                  value={childAge}
                  onChange={setChildAge}
                  min={0}
                  max={constants.MAX_CHILD_AGE}
                  unit=" years"
                  additionalInfo={`You have ${yearsToContribute} years to contribute. Maximum age for RESP contributions is 17 years.`}
                />

                {/* Number of Children */}
                <OptimizedRangeInput
                  label="Number of Children"
                  icon={<Users className="mr-3 text-[#305399]" size={20} />}
                  value={numChildren}
                  onChange={setNumChildren}
                  min={1}
                  max={5}
                  unit=" child"
                  additionalInfo="This calculator shows projections for one child. Each child has their own $50,000 lifetime contribution limit."
                />
              </div>

              {/* Investment Parameters Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Investment Parameters
                </h3>
                
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
                    additionalInfo="Conservative: 3-5%, Moderate: 5-8%, Aggressive: 8-12%. RESP investments grow tax-free until withdrawal."
                  />
                </div>
              </div>

              {/* Contribution Details Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Contribution Details
                </h3>
                
                {/* Contribution Amount */}
                <OptimizedRangeInput
                  label="Monthly Contribution Amount"
                  icon={<DollarSign className="mr-3 text-[#305399]" size={20} />}
                  value={contributionAmount}
                  onChange={setContributionAmount}
                  min={0}
                  max={2000}
                  step={25}
                  formatValue={formatCurrency}
                  additionalInfo={`Annual total: ${formatCurrency(contributionAmount * 12)}. To maximize government grants, contribute ${formatCurrency(constants.MAX_QUALIFYING_CONTRIBUTION / 12)} monthly.`}
                />

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

                {/* Government Grant Information */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <BookOpen className="mr-2" size={18} />
                    Government Grant Projection
                  </h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Annual grant on your contributions: {formatCurrency(Math.min((contributionAmount * 12) * constants.CESG_RATE, constants.MAX_ANNUAL_GRANT))}</p>
                    <p>• Total grants over {yearsToContribute} years: {formatCurrency(Math.min(Math.min((contributionAmount * 12) * constants.CESG_RATE, constants.MAX_ANNUAL_GRANT) * yearsToContribute, constants.MAX_LIFETIME_GRANT))}</p>
                  </div>
                </div>

                {/* Assumptions - Enhanced */}
                <motion.div className="border-t border-gray-200 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAssumptions(!showAssumptions)}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    <ChevronDown 
                      className={`mr-2 transform transition-transform ${showAssumptions ? 'rotate-180' : ''}`} 
                      size={16} 
                    />
                    Calculation Assumptions
                  </button>
                  
                  <AnimatePresence>
                    {showAssumptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600"
                      >
                        <ul className="space-y-2">
                          <li>• Annual rate of return: {customROI}% (adjustable)</li>
                          <li>• Canada Education Savings Grant (CESG): 20% on first $2,500 annually</li>
                          <li>• Maximum annual grant: $500 per child</li>
                          <li>• Maximum lifetime grant: $7,200 per child</li>
                          <li>• Lifetime contribution limit: $50,000 per child</li>
                          <li>• Contributions are made monthly</li>
                          <li>• Government grants are deposited annually mid-year</li>
                          <li>• Tax-free growth on all investments and grants</li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
            {/* Total Saved */}
            <div className="text-center mb-8">
              <motion.p 
                className="text-gray-600 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                With an RESP, you'll save
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
                Ready when your child turns 18 • Using {customROI}% annual return
              </div>
            </div>

            {/* Enhanced Progress Visualization */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="contributionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#305399" />
                    <stop offset="100%" stopColor="#4a6fad" />
                  </linearGradient>
                  <linearGradient id="grantGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                {/* Contributions */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#contributionGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * getProgressPercentage / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * getProgressPercentage / 100) }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                {/* Government Grants */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#grantGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * ((govGrants / totalSaved) * 100) / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * ((govGrants / totalSaved) * 100) / 100) }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                {/* Interest Growth */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#growthGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * ((interestGenerated / totalSaved) * 100) / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * ((interestGenerated / totalSaved) * 100) / 100) }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{yearsToContribute}</div>
                  <div className="text-xs text-gray-500">years</div>
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
                <span className="font-bold text-[#305399]">{formatCurrency(yourContributions)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-100/50 to-transparent rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">Government Grants</span>
                </div>
                <span className="font-bold text-green-500">{formatCurrency(govGrants)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100/50 to-transparent rounded-lg">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 font-medium">Investment Growth</span>
                </div>
                <span className="font-bold text-blue-500">{formatCurrency(interestGenerated)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                <span className="text-gray-800">Total Education Fund</span>
                <span className="text-gray-800">{formatCurrency(totalSaved)}</span>
              </div>
            </div>

            {/* Action Buttons - Enhanced */}
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
                className="w-full bg-[#305399] text-white font-bold py-4 rounded-xl hover:bg-[#253A66] transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Open an RESP online
                <ArrowRight size={20} />
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
                  <p>This calculation is for informational purposes only. Actual results may vary based on market conditions, fees, and investment choices. RESP withdrawals are taxed in the student's hands, typically at a lower rate.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info - Enhanced */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8 rounded-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-[#305399]" size={24} />
                  2025 RESP Benefits
                </h3>
                <ul className="text-gray-600 leading-relaxed space-y-2 text-sm">
                  <li>• <span className="font-bold text-green-600">Canada Education Savings Grant (CESG)</span>: 20% on first $2,500 annually</li>
                  <li>• <span className="font-bold text-green-600">Maximum annual grant</span>: $500 per child</li>
                  <li>• <span className="font-bold text-green-600">Lifetime grant limit</span>: $7,200 per child</li>
                  <li>• <span className="font-bold text-green-600">Lifetime contribution limit</span>: $50,000 per child</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="mr-2 text-[#305399]" size={24} />
                  Additional Benefits
                </h3>
                <ul className="text-gray-600 leading-relaxed space-y-2 text-sm">
                  <li>• <strong>Tax-free growth</strong> on all investments</li>
                  <li>• <strong>Flexible withdrawals</strong> for qualifying education expenses</li>
                  <li>• <strong>Canada Learning Bond</strong> up to $2,000 for eligible families</li>
                  <li>• <strong>Provincial grants</strong> available in some provinces</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Modal - Added from RRSP */}
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

export default RESPCalculator;
