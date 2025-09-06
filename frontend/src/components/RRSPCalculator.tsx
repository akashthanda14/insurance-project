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
  Mail,
  Percent,
  X,
  Edit3,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  BarChart3,
  AlertTriangle,
  HelpCircle,
  Settings,
  Zap,
  Target
} from "lucide-react";
import { useCalculatorServices } from '../hooks/useCalculatorServices';

interface FormErrors {
  email?: string;
  postalCode?: string;
  general?: string;
}

interface ValidationStatus {
  type: 'valid' | 'warning' | 'error';
  message?: string;
}

interface Scenario {
  name: string;
  roi: number;
  color: string;
}

// Educational Tooltip Component
const EducationalTooltip = React.memo(({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button 
        type="button"
        className="text-blue-600 underline cursor-help inline-flex items-center"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby="tooltip"
      >
        {term}
        <HelpCircle size={12} className="ml-1" />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            id="tooltip"
            role="tooltip"
            className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {definition}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Enhanced Range Input with Full Accessibility
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
  allowManualInput = true,
  validationStatus,
  educationalContent
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
  validationStatus?: ValidationStatus;
  educationalContent?: { term: string; definition: string };
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const inputId = useRef(`input-${Math.random().toString(36).substr(2, 9)}`);
  const descriptionId = useRef(`desc-${Math.random().toString(36).substr(2, 9)}`);
  
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
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      handleSliderChange(newValue);
    }
  }, [handleSliderChange]);

  const handleInputStart = useCallback(() => setIsDragging(true), []);
  const handleInputEnd = useCallback(() => setIsDragging(false), []);

  const toggleManualInput = useCallback(() => {
    if (isManualInput) {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        handleSliderChange(numValue);
        setInputError('');
      } else {
        setInputError(`Value must be between ${min} and ${max}`);
        return;
      }
      setIsManualInput(false);
    } else {
      setInputValue(value.toString());
      setIsManualInput(true);
      setInputError('');
    }
  }, [isManualInput, inputValue, value, handleSliderChange, min, max]);

  const handleManualInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (newValue === '') {
      setInputError('');
    } else if (isNaN(numValue)) {
      setInputError('Please enter a valid number');
    } else if (numValue < min || numValue > max) {
      setInputError(`Value must be between ${min} and ${max}`);
    } else {
      setInputError('');
    }
  }, [min, max]);

  const handleManualInputSubmit = useCallback(() => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      handleSliderChange(numValue);
      setIsManualInput(false);
      setInputError('');
    }
  }, [inputValue, min, max, handleSliderChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isManualInput) {
        handleManualInputSubmit();
      } else {
        toggleManualInput();
      }
    } else if (e.key === 'Escape' && isManualInput) {
      setInputValue(value.toString());
      setIsManualInput(false);
      setInputError('');
    } else if (e.key === ' ' && !isManualInput) {
      e.preventDefault();
      toggleManualInput();
    }
  }, [isManualInput, handleManualInputSubmit, toggleManualInput, value]);

  const displayValue = useMemo(() => {
    return formatValue ? formatValue(value) : `${value}${unit}`;
  }, [value, unit, formatValue]);

  const getStatusColor = () => {
    if (validationStatus?.type === 'error') return 'border-red-300 focus:ring-red-500';
    if (validationStatus?.type === 'warning') return 'border-yellow-300 focus:ring-yellow-500';
    return 'border-gray-300 focus:ring-[#305399] focus:border-[#305399]';
  };

  return (
    <motion.div 
      className="space-y-3"
      whileHover={{ scale: 1.002 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <label 
        htmlFor={inputId.current}
        className="flex items-center text-base lg:text-lg font-semibold text-gray-700"
      >
        {icon}
        <span className="flex-1">
          {label}
          {educationalContent && (
            <span className="ml-2">
              <EducationalTooltip 
                term={educationalContent.term} 
                definition={educationalContent.definition} 
              />
            </span>
          )}
        </span>
        <div className="flex items-center space-x-2">
          {allowManualInput && !disabled && (
            <motion.button
              type="button"
              onClick={toggleManualInput}
              onKeyDown={handleKeyDown}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isManualInput 
                  ? 'bg-[#305399] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#305399]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isManualInput ? 'Switch to slider' : 'Enter manually'}
              aria-label={isManualInput ? 'Switch to slider input' : 'Switch to manual input'}
            >
              {isManualInput ? <Check size={16} /> : <Edit3 size={16} />}
            </motion.button>
          )}
          {isManualInput ? (
            <div className="flex flex-col items-end">
              <input
                id={inputId.current}
                type="number"
                value={inputValue}
                onChange={handleManualInputChange}
                onBlur={handleManualInputSubmit}
                onKeyDown={handleKeyDown}
                min={min}
                max={max}
                step={step}
                className={`w-28 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  inputError 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : getStatusColor()
                }`}
                autoFocus
                placeholder={`${min}-${max}`}
                aria-describedby={inputError ? `${inputId.current}-error` : descriptionId.current}
                aria-invalid={!!inputError}
              />
              {inputError && (
                <motion.span 
                  id={`${inputId.current}-error`}
                  role="alert"
                  className="text-xs text-red-500 mt-1 max-w-28 text-right"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {inputError}
                </motion.span>
              )}
            </div>
          ) : (
            <span className={`font-bold text-[#305399] text-lg min-w-20 text-right ${
              isDragging ? 'scale-110 transition-transform' : ''
            }`}>
              {displayValue}
            </span>
          )}
        </div>
      </label>
      
      {!isManualInput && (
        <div className="relative group">
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#305399] to-[#4a6fad] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <input
            id={inputId.current}
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
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`
              absolute top-0 left-0 w-full h-4 opacity-0 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#305399] focus:ring-offset-2
              ${disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
            `}
            style={{ 
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
            aria-label={`${label}. Current value: ${displayValue}. Range: ${formatValue ? formatValue(min) : min} to ${formatValue ? formatValue(max) : max}`}
            aria-describedby={descriptionId.current}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={displayValue}
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
      )}
      
      {!isManualInput && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
          <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
        </div>
      )}

      {/* Validation Status */}
      {validationStatus?.message && (
        <motion.div 
          className={`flex items-start p-3 rounded-lg border ${
            validationStatus.type === 'error' 
              ? 'bg-red-50 text-red-700 border-red-200' 
              : validationStatus.type === 'warning'
              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {validationStatus.type === 'warning' && <AlertTriangle size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
          {validationStatus.type === 'error' && <X size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
          {validationStatus.type === 'valid' && <Check size={16} className="mr-2 flex-shrink-0 mt-0.5" />}
          <span className="text-sm">{validationStatus.message}</span>
        </motion.div>
      )}
      
      {additionalInfo && (
        <motion.p 
          id={descriptionId.current}
          className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {additionalInfo}
        </motion.p>
      )}
      
      {isManualInput && !inputError && (
        <motion.div 
          className="text-xs text-gray-500 bg-blue-50 p-2 rounded border border-blue-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💡 Press Enter to confirm, Escape to cancel. Valid range: {formatValue ? formatValue(min) : `${min}${unit}`} - {formatValue ? formatValue(max) : `${max}${unit}`}
        </motion.div>
      )}
    </motion.div>
  );
});

// Scenario Comparison Component
const ScenarioComparison = React.memo(({ 
  currentParams, 
  formatCurrency 
}: { 
  currentParams: any; 
  formatCurrency: (value: number) => string;
}) => {
  const scenarios: Scenario[] = [
    { name: 'Conservative', roi: 3, color: 'text-green-600' },
    { name: 'Moderate', roi: 5, color: 'text-blue-600' },
    { name: 'Current', roi: currentParams.customROI, color: 'text-[#305399]' },
    { name: 'Aggressive', roi: 8, color: 'text-red-600' }
  ];

  const calculateScenario = useCallback((roi: number) => {
    const { currentAge, retirementAge, contributionAmount, existingRRSP, frequency } = currentParams;
    const years = Math.max(0, retirementAge - currentAge);
    const periodsPerYear = frequency === 'Monthly' ? 12 : frequency === 'Weekly' ? 52 : frequency === 'Every two weeks' ? 26 : 1;
    const totalPeriods = years * periodsPerYear;
    const returnRate = roi / 100;
    const periodRate = returnRate / periodsPerYear;

    const existingFV = existingRRSP * Math.pow(1 + returnRate, years);
    let annuityFV = 0;
    if (contributionAmount > 0 && periodRate > 0) {
      annuityFV = contributionAmount * (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
    } else if (contributionAmount > 0) {
      annuityFV = contributionAmount * totalPeriods;
    }

    return existingFV + annuityFV;
  }, [currentParams]);

  return (
    <motion.div 
      className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h4 className="font-semibold mb-3 flex items-center text-gray-800">
        <BarChart3 className="mr-2" size={18} />
        Scenario Comparison
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {scenarios.map(scenario => (
          <div key={scenario.name} className="flex justify-between items-center py-2 px-3 bg-white rounded border">
            <span className={`text-sm font-medium ${scenario.color}`}>
              {scenario.name} ({scenario.roi}%)
            </span>
            <span className={`font-bold text-sm ${scenario.color}`}>
              {formatCurrency(calculateScenario(scenario.roi))}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

// Main Component
export const RRSPCalculator: React.FC = () => {
  // Form state
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [contributionAmount, setContributionAmount] = useState<number>(200);
  const [frequency, setFrequency] = useState<string>('Monthly');
  const [existingRRSP, setExistingRRSP] = useState<number>(0);
  const [postalCode, setPostalCode] = useState<string>('');
  const [customROI, setCustomROI] = useState<number>(5.0);
  
  // UI state
  const [setupMode, setSetupMode] = useState<'quick' | 'detailed'>('detailed');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  
  // Email state
  const [userEmail, setUserEmail] = useState<string>('');
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Results
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);

  // Validation states
  const [contributionValidation, setContributionValidation] = useState<ValidationStatus>({ type: 'valid' });

  const { emailStatus, isLoading, sendEmail, clearEmailStatus } = useCalculatorServices();

  // Constants
  const constants = useMemo(() => ({
    MAX_CONTRIBUTION_2025: 31560,
    MIN_ROI: 0.1,
    MAX_ROI: 30.0
  }), []);

  const frequencyOptions = useMemo(() => [
    { value: 'Annually', label: 'Annually', periods: 1 },
    { value: 'Monthly', label: 'Monthly', periods: 12 },
    { value: 'Every two weeks', label: 'Every two weeks', periods: 26 },
    { value: 'Weekly', label: 'Weekly', periods: 52 }
  ], []);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('rrspCalculatorState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setCurrentAge(parsed.currentAge || 30);
        setRetirementAge(parsed.retirementAge || 65);
        setContributionAmount(parsed.contributionAmount || 200);
        setFrequency(parsed.frequency || 'Monthly');
        setExistingRRSP(parsed.existingRRSP || 0);
        setCustomROI(parsed.customROI || 5.0);
        setPostalCode(parsed.postalCode || '');
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const calculatorState = {
      currentAge, retirementAge, contributionAmount, 
      frequency, existingRRSP, customROI, postalCode
    };
    localStorage.setItem('rrspCalculatorState', JSON.stringify(calculatorState));
  }, [currentAge, retirementAge, contributionAmount, frequency, existingRRSP, customROI, postalCode]);

  const getPeriodsPerYear = useCallback(() => {
    return frequencyOptions.find(opt => opt.value === frequency)?.periods || 12;
  }, [frequency, frequencyOptions]);

  const years = useMemo(() => Math.max(0, retirementAge - currentAge), [currentAge, retirementAge]);

  // Smart defaults based on age
  const getSmartDefaults = useCallback((age: number) => {
    return {
      roi: age < 35 ? 7 : age < 50 ? 6 : 5,
      contribution: Math.min(500, Math.floor(age * 10)),
      retirementAge: age < 30 ? 65 : age < 40 ? 67 : 70
    };
  }, []);

  // Contribution validation
  const validateContribution = useCallback((amount: number, freq: string) => {
    const periodsPerYear = frequencyOptions.find(opt => opt.value === freq)?.periods || 12;
    const annualAmount = amount * periodsPerYear;
    
    if (annualAmount > constants.MAX_CONTRIBUTION_2025) {
      setContributionValidation({
        type: 'warning',
        message: `Annual contribution ($${annualAmount.toLocaleString()}) exceeds 2025 RRSP limit ($${constants.MAX_CONTRIBUTION_2025.toLocaleString()}). Consider reducing contribution amount.`
      });
    } else if (annualAmount === 0) {
      setContributionValidation({
        type: 'error',
        message: 'Contribution amount cannot be zero for meaningful projections.'
      });
    } else {
      setContributionValidation({ type: 'valid' });
    }
  }, [constants.MAX_CONTRIBUTION_2025, frequencyOptions]);

  // Debounced calculation
  useEffect(() => {
    const calculateResults = () => {
      if (years <= 0) {
        setTotalSaved(0);
        setTotalContributions(0);
        setTotalReturn(0);
        return;
      }

      const periodsPerYear = getPeriodsPerYear();
      const totalPeriods = years * periodsPerYear;
      const returnRate = customROI / 100;
      const periodRate = returnRate / periodsPerYear;

      const existingFV = existingRRSP * Math.pow(1 + returnRate, years);

      let annuityFV = 0;
      if (contributionAmount > 0 && periodRate > 0) {
        annuityFV = contributionAmount * 
          (Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate;
      } else if (contributionAmount > 0 && periodRate === 0) {
        annuityFV = contributionAmount * totalPeriods;
      }

      const total = existingFV + annuityFV;
      const totalContrib = existingRRSP + (contributionAmount * totalPeriods);
      const totalGrowth = total - totalContrib;

      setTotalSaved(Math.round(total * 100) / 100);
      setTotalContributions(Math.round(totalContrib * 100) / 100);
      setTotalReturn(Math.round(totalGrowth * 100) / 100);
    };

    const debounceTimer = setTimeout(calculateResults, 100);
    return () => clearTimeout(debounceTimer);
  }, [currentAge, retirementAge, contributionAmount, frequency, existingRRSP, customROI, years, getPeriodsPerYear]);

  // Validate contribution when it changes
  useEffect(() => {
    validateContribution(contributionAmount, frequency);
  }, [contributionAmount, frequency, validateContribution]);

  const formatCurrency = useCallback((value: number): string => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }, []);

  const formatCurrencyNoDecimals = useCallback((value: number): string => {
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

  // Canadian postal code validation
  const validatePostalCode = useCallback((code: string): boolean => {
    if (!code.trim()) return true;
    const postalRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalRegex.test(code.trim());
  }, []);

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

  const handleExistingRRSPChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setExistingRRSP(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setExistingRRSP(Math.round(numValue * 100) / 100);
      }
    }
  }, []);

  const applySmartDefaults = useCallback(() => {
    const defaults = getSmartDefaults(currentAge);
    setCustomROI(defaults.roi);
    setContributionAmount(defaults.contribution);
    setRetirementAge(defaults.retirementAge);
  }, [currentAge, getSmartDefaults]);

  // PDF Export functionality
  const exportToPDF = useCallback(() => {
    const printContent = `
      RRSP Calculation Results
      
      Personal Information:
      - Current Age: ${currentAge}
      - Retirement Age: ${retirementAge}
      - Years until retirement: ${years}
      
      Investment Parameters:
      - Annual Return Rate: ${customROI}%
      - Contribution Amount: ${formatCurrency(contributionAmount)} ${frequency.toLowerCase()}
      - Current RRSP Balance: ${formatCurrency(existingRRSP)}
      
      Results:
      - Total Retirement Savings: ${formatCurrency(totalSaved)}
      - Your Total Contributions: ${formatCurrency(totalContributions)}
      - Investment Growth: ${formatCurrency(totalReturn)}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>RRSP Calculation Results</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <pre style="white-space: pre-wrap;">${printContent}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [currentAge, retirementAge, years, customROI, contributionAmount, frequency, existingRRSP, totalSaved, totalContributions, totalReturn, formatCurrency]);

  // Share functionality
  const shareResults = useCallback(() => {
    const shareText = `I calculated my RRSP retirement savings: ${formatCurrency(totalSaved)} by age ${retirementAge}!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My RRSP Calculation Results',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      }).catch(() => {
        alert('Unable to share. Please copy the URL manually.');
      });
    }
  }, [totalSaved, retirementAge, formatCurrency]);

  const handleSendEmail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const results = {
      totalAmount: totalSaved,
      contributions: totalContributions,
      returns: totalReturn,
      roiRate: customROI
    };

    const inputs = {
      currentAge,
      retirementAge,
      yearsUntilRetirement: years,
      contributionFrequency: frequency,
      contributionAmount,
      existingRRSP,
      customROI,
      postalCode: postalCode || 'Not provided'
    };

    await sendEmail(userEmail, 'RRSP', results, inputs, true);
    
    if (emailStatus.type === 'success') {
      setShowEmailModal(false);
      setUserEmail('');
      setFormErrors({});
    }
  }, [validateForm, totalSaved, totalContributions, totalReturn, customROI, currentAge, retirementAge, years, frequency, contributionAmount, existingRRSP, postalCode, userEmail, sendEmail, emailStatus.type]);

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
            <PiggyBank className="text-white" size={32} />
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#305399] mb-2">Investor Insurance</h3>
            <p className="text-sm text-gray-600">Your Financial Planning Partner</p>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-2">
            Enhanced RRSP Calculator
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Calculate your retirement savings potential with personalized projections, scenario analysis, and accessibility features.
          </p>

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-4 mb-6">
            <motion.button
              onClick={() => setSetupMode('quick')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                setupMode === 'quick' 
                  ? 'bg-[#305399] text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="inline mr-2" size={16} />
              Quick Setup
            </motion.button>
            <motion.button
              onClick={() => setSetupMode('detailed')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                setupMode === 'detailed' 
                  ? 'bg-[#305399] text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="inline mr-2" size={16} />
              Detailed Setup
            </motion.button>
          </div>
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
              {/* Quick Setup Mode */}
              {setupMode === 'quick' && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Quick Setup</h3>
                    <motion.button
                      onClick={applySmartDefaults}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Target className="inline mr-1" size={14} />
                      Apply Smart Defaults
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <OptimizedRangeInput
                      label="Your Age"
                      icon={<Calendar className="mr-3 text-[#305399]" size={20} />}
                      value={currentAge}
                      onChange={setCurrentAge}
                      min={18}
                      max={75}
                      unit=" years"
                      allowManualInput={true}
                    />

                    <OptimizedRangeInput
                      label="Retirement Age"
                      icon={<TrendingUp className="mr-3 text-[#305399]" size={20} />}
                      value={retirementAge}
                      onChange={setRetirementAge}
                      min={Math.max(currentAge + 1, 55)}
                      max={85}
                      unit=" years"
                      additionalInfo={`${years} years to save for retirement`}
                      allowManualInput={true}
                    />
                  </div>

                  <OptimizedRangeInput
                    label="Monthly Contribution"
                    icon={<DollarSign className="mr-3 text-[#305399]" size={20} />}
                    value={contributionAmount}
                    onChange={setContributionAmount}
                    min={0}
                    max={2500}
                    step={25}
                    formatValue={formatCurrencyNoDecimals}
                    validationStatus={contributionValidation}
                    allowManualInput={true}
                  />
                </motion.div>
              )}

              {/* Detailed Setup Mode */}
              {setupMode === 'detailed' && (
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <OptimizedRangeInput
                        label="Current Age"
                        icon={<Calendar className="mr-3 text-[#305399]" size={20} />}
                        value={currentAge}
                        onChange={setCurrentAge}
                        min={18}
                        max={75}
                        unit=" years"
                        allowManualInput={true}
                        educationalContent={{
                          term: "Why age matters?",
                          definition: "Your current age determines how many years you have to save and grow your investments. Younger savers benefit more from compound growth."
                        }}
                      />

                      <OptimizedRangeInput
                        label="Retirement Age"
                        icon={<TrendingUp className="mr-3 text-[#305399]" size={20} />}
                        value={retirementAge}
                        onChange={setRetirementAge}
                        min={Math.max(currentAge + 1, 55)}
                        max={85}
                        unit=" years"
                        additionalInfo={years > 0 ? `${years} years until retirement` : 'Please set retirement age above current age'}
                        disabled={currentAge >= 84}
                        allowManualInput={true}
                        educationalContent={{
                          term: "Retirement planning",
                          definition: "The earlier you retire, the less time you have to save and the longer your savings need to last. Consider your lifestyle goals and healthcare needs."
                        }}
                      />
                    </div>
                  </div>

                  {/* Investment Parameters */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                      Investment Parameters
                    </h3>
                    
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
                        additionalInfo="Historical market returns typically range from 3% to 12%. Conservative: 3-5%, Moderate: 5-8%, Aggressive: 8-12%"
                        allowManualInput={true}
                        educationalContent={{
                          term: "Expected returns",
                          definition: "This is your expected average annual return. Historical stock market returns have averaged 6-10%, but past performance doesn't guarantee future results. Consider your risk tolerance."
                        }}
                      />
                    </div>
                  </div>

                  {/* Contribution Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                      Contribution Details
                    </h3>
                    
                    <OptimizedRangeInput
                      label="Regular Contribution Amount"
                      icon={<DollarSign className="mr-3 text-[#305399]" size={20} />}
                      value={contributionAmount}
                      onChange={setContributionAmount}
                      min={0}
                      max={5000}
                      step={25}
                      formatValue={formatCurrencyNoDecimals}
                      additionalInfo={`Annual total: ${formatCurrencyNoDecimals(contributionAmount * getPeriodsPerYear())}`}
                      validationStatus={contributionValidation}
                      allowManualInput={true}
                      educationalContent={{
                        term: "Regular contributions",
                        definition: "Consistent contributions take advantage of dollar-cost averaging and compound growth. Even small amounts can grow significantly over time."
                      }}
                    />

                    {/* Frequency Selection */}
                    <motion.div className="space-y-3">
                      <label className="flex items-center text-lg font-semibold text-gray-700">
                        <Calculator className="mr-3 text-[#305399]" size={20} />
                        Contribution Frequency
                        <span className="ml-2">
                          <EducationalTooltip 
                            term="Why frequency matters?" 
                            definition="More frequent contributions can slightly increase returns due to earlier investment of funds, but the difference is usually small compared to the total amount contributed." 
                          />
                        </span>
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

                    {/* Current RRSP Balance */}
                    <motion.div className="space-y-3">
                      <label className="flex items-center text-lg font-semibold text-gray-700">
                        <PiggyBank className="mr-3 text-[#305399]" size={20} />
                        Current RRSP Balance
                        <span className="ml-2">
                          <EducationalTooltip 
                            term="Existing balance" 
                            definition="Your current RRSP balance will continue to grow through compound interest. Even small existing balances can make a significant difference over time." 
                          />
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                        <input
                          type="number"
                          value={existingRRSP === 0 ? '' : existingRRSP}
                          onChange={handleExistingRRSPChange}
                          min="0"
                          step="0.01"
                          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#305399]/20 focus:border-[#305399] transition-all duration-200 bg-white"
                          placeholder="Enter current RRSP balance"
                          aria-label="Current RRSP balance in Canadian dollars"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        Enter your existing RRSP balance to see how it will grow alongside your contributions.
                      </p>
                    </motion.div>

                    {/* Advanced Options */}
                    <motion.div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        aria-expanded={showAdvancedOptions}
                      >
                        {showAdvancedOptions ? <ChevronUp className="mr-1" /> : <ChevronDown className="mr-1" />}
                        Advanced Options
                      </button>
                      
                      <AnimatePresence>
                        {showAdvancedOptions && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Postal Code */}
                            <motion.div className="space-y-3 pt-4">
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
                                aria-label="Canadian postal code"
                                aria-describedby={formErrors.postalCode ? 'postal-code-error' : undefined}
                              />
                              {formErrors.postalCode && (
                                <motion.p
                                  id="postal-code-error"
                                  role="alert"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-red-600 text-sm flex items-center"
                                >
                                  <X size={16} className="mr-1" />
                                  {formErrors.postalCode}
                                </motion.p>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              )}
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
                Retirement Savings at {retirementAge}
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
                Using {customROI}% annual return over {years} years
              </div>
            </div>

            {/* Progress Visualization */}
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
                  <div className="text-2xl font-bold text-gray-800">{years}</div>
                  <div className="text-xs text-gray-500">years</div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
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
                <span className="font-bold text-blue-500">{formatCurrency(totalReturn)}</span>
              </div>
            </div>

            {/* Scenario Comparison Toggle */}
            <motion.button
              onClick={() => setShowScenarios(!showScenarios)}
              className="w-full mb-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="mr-2" size={18} />
              {showScenarios ? 'Hide' : 'Show'} Scenario Comparison
            </motion.button>

            <AnimatePresence>
              {showScenarios && (
                <ScenarioComparison 
                  currentParams={{ 
                    currentAge, retirementAge, contributionAmount, 
                    existingRRSP, frequency, customROI 
                  }}
                  formatCurrency={formatCurrency}
                />
              )}
            </AnimatePresence>

            {/* Total */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center text-xl font-bold bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                <span className="text-gray-800">Total Retirement Fund</span>
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

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={exportToPDF}
                  className="px-4 py-3 border-2 border-[#305399] text-[#305399] font-semibold rounded-xl hover:bg-[#305399] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} />
                  Export
                </motion.button>
                
                <motion.button
                  onClick={shareResults}
                  className="px-4 py-3 border-2 border-[#305399] text-[#305399] font-semibold rounded-xl hover:bg-[#305399] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 size={16} />
                  Share
                </motion.button>
              </div>
              
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <PiggyBank className="mr-2 text-[#305399]" size={24} />
                  2025 RRSP Limits
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  The maximum RRSP contribution for 2025 is <span className="font-bold text-[#305399]">${constants.MAX_CONTRIBUTION_2025.toLocaleString()}</span> or 18% of your previous year's earned income, whichever is less.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-[#305399]" size={24} />
                  Enhanced Features
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  This calculator includes accessibility features, scenario comparison, smart defaults, input validation, and educational tooltips to help you make informed decisions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Settings className="mr-2 text-[#305399]" size={24} />
                  Flexible Input
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Use sliders for quick adjustments or click the ✏️ button for precise manual input. Your settings are automatically saved for future visits.
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
              role="dialog"
              aria-labelledby="email-modal-title"
              aria-describedby="email-modal-description"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 id="email-modal-title" className="text-2xl font-bold text-gray-800 flex items-center">
                  <Mail className="mr-2 text-[#305399]" size={24} />
                  Email Results
                </h3>
                <motion.button
                  onClick={closeEmailModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close email modal"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <p id="email-modal-description" className="text-gray-600 mb-4">
                Get your personalized RRSP calculation results sent to your email.
              </p>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-input"
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
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    aria-invalid={!!formErrors.email}
                  />
                  {formErrors.email && (
                    <motion.p
                      id="email-error"
                      role="alert"
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
                    role="alert"
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

export default RRSPCalculator;
