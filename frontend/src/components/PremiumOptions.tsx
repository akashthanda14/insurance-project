import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Calendar, 
  Clock, 
  Users, 
  Globe, 
  Shield, 
  DollarSign,
  ChevronDown,
  Check,
  X,
  Eye,
  ArrowRight
} from "lucide-react";
import type { PremiumOption } from "../types";

const API_URL =
  "https://devweb.desttravel.com/api/visitorquote/premiumoptions";
const AUTH_HEADER =
  "Basic c2hpa2hhLnNoYXJtYTpjLUc2TDlEOW8hUSo="; 



const defaultParams = {
  applicationDate: new Date().toISOString().slice(0, 10),    // today
  tripDays: 365,
  age: 25,
  familyPlan: false,
  language: "EN"
};


interface DeductibleOption {
  label: string;
  value: keyof PremiumOption;
  amount: string;
  popular?: boolean;
}

const deductibleOptions: DeductibleOption[] = [
  { label: "$0", value: "Deductible0", amount: "$0", popular: true },
  { label: "$250", value: "Deductible250", amount: "$250" },
  { label: "$500", value: "Deductible500", amount: "$500" },
  { label: "$1,000", value: "Deductible1000", amount: "$1,000" },
  { label: "$2,500", value: "Deductible2500", amount: "$2,500" },
  { label: "$5,000", value: "Deductible5000", amount: "$5,000" },
  { label: "$10,000", value: "Deductible10000", amount: "$10,000" },
];

export const PremiumOptions: React.FC = () => {
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PremiumOption[] | null>(null);
  const [selectedDeductible, setSelectedDeductible] = useState<keyof PremiumOption>("Deductible0");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const fetchPremiums = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
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
      setData(result);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getBestValue = (options: PremiumOption[]) => {
    if (!options.length) return null;
    return options.reduce((best, current) => 
      current[selectedDeductible] < best[selectedDeductible] ? current : best
    );
  };

  const bestValue = data ? getBestValue(data) : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Enhanced Header */}
        <motion.header
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-4">
            <motion.div 
              className="bg-[#305399] p-4 rounded-full mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Premium Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Get personalized travel insurance premium quotes tailored to your specific needs
          </p>
        </motion.header>

        {/* Enhanced Form Section */}
        <motion.section
          className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-8 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-6 lg:mb-8">
            <div className="bg-[#305399] p-2 rounded-lg mr-3">
              <Shield className="text-white" size={24} />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              Enter Your Details
            </h2>
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPremiums();
            }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Mobile-First Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Application Date */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="applicationDate" className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Calendar className="mr-2 text-[#305399]" size={18} />
                  Application Date
                </label>
                <input
                  id="applicationDate"
                  type="date"
                  name="applicationDate"
                  value={params.applicationDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </motion.div>
              
              {/* Trip Duration */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="tripDays" className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Clock className="mr-2 text-[#305399]" size={18} />
                  Trip Duration (Days)
                </label>
                <input
                  id="tripDays"
                  type="number"
                  name="tripDays"
                  value={params.tripDays}
                  min={1}
                  max={365}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Age */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="age" className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Users className="mr-2 text-[#305399]" size={18} />
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={params.age}
                  min={0}
                  max={120}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </motion.div>
              
              {/* Language */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label htmlFor="language" className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Globe className="mr-2 text-[#305399]" size={18} />
                  Language
                </label>
                <div className="relative">
                  <select
                    id="language"
                    name="language"
                    value={params.language}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none"
                  >
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </motion.div>
            </div>

            {/* Family Plan Toggle */}
            <motion.div 
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                <Users className="mr-2 text-[#305399]" size={18} />
                Family Plan
              </label>
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="familyPlan"
                      checked={params.familyPlan}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      params.familyPlan ? 'bg-[#305399]' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                        params.familyPlan ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`}></div>
                    </div>
                  </div>
                  <span className="ml-4 text-base lg:text-lg text-gray-700">
                    {params.familyPlan ? "Yes, include family coverage" : "Individual coverage only"}
                  </span>
                </label>
              </div>
            </motion.div>
            
            {/* Enhanced Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full max-w-md lg:max-w-lg rounded-xl px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-bold bg-gradient-to-r from-[#305399] to-[#253A66] text-white shadow-lg transition-all duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:from-[#253A66] hover:to-[#305399]"
                }`}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
              >
                {loading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Loading Premium Options...
                  </motion.span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <Calculator size={24} />
                    Calculate Premium Options
                    <ArrowRight size={20} />
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.section>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.section
              className="bg-red-50 border-2 border-red-200 text-red-800 rounded-2xl p-6 mb-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center mb-2">
                <X className="mr-2 text-red-600" size={24} />
                <h3 className="text-lg lg:text-xl font-bold">Error Occurred</h3>
              </div>
              <p className="text-base lg:text-lg">{error}</p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {data && (
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="bg-gradient-to-r from-[#305399] to-[#253A66] text-white rounded-2xl p-6 lg:p-8 shadow-xl">
                <div className="flex items-center mb-4">
                  <DollarSign className="mr-3" size={32} />
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold">
                      Available Premium Options
                    </h2>
                    <p className="text-blue-100 mt-1">
                      {data.length} options found for your travel insurance needs
                    </p>
                  </div>
                </div>
              </div>

              {/* Single Deductible Selector at Top */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Deductible Amount</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {deductibleOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => setSelectedDeductible(option.value)}
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedDeductible === option.value
                          ? 'border-[#305399] bg-[#305399] text-white shadow-lg'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#305399] hover:bg-blue-50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-sm font-bold">{option.label}</div>
                      {option.popular && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="lg:hidden space-y-4">
                {data.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                      bestValue && row === bestValue ? 'border-green-400 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    {bestValue && row === bestValue && (
                      <div className="bg-green-500 text-white text-center py-2 px-4">
                        <div className="flex items-center justify-center">
                          <Check className="mr-2" size={16} />
                          <span className="font-bold text-sm">BEST VALUE</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {formatCurrency(row.SumInsured)} Coverage
                          </h3>
                          <p className="text-gray-600">Schedule {row.ScheduleNo}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#305399]">
                            {formatCurrency(row[selectedDeductible])}
                          </div>
                          <p className="text-sm text-gray-600">
                            {deductibleOptions.find(opt => opt.value === selectedDeductible)?.label} deductible
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Trip Days:</span>
                          <span className="font-semibold ml-2">{row.TripDays}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Daily Rate:</span>
                          <span className="font-semibold ml-2">{formatCurrency(row.DailyRate)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Coverage</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Schedule</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Trip Days</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Daily Rate</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Base Rate</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">
                          Premium
                          <div className="text-xs font-normal text-gray-600 mt-1">
                            {deductibleOptions.find(opt => opt.value === selectedDeductible)?.label} deductible
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.map((row, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className={`hover:bg-blue-50 transition-colors duration-200 ${
                            bestValue && row === bestValue ? 'bg-green-50 border-l-4 border-green-500' : 
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {bestValue && row === bestValue && (
                                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-2 font-bold">
                                  BEST
                                </div>
                              )}
                              <div className="text-sm font-bold text-gray-900">
                                {formatCurrency(row.SumInsured)}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.ScheduleNo}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{row.TripDays}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{formatCurrency(row.DailyRate)}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">{formatCurrency(row.Rate)}</td>
                          <td className="px-6 py-4">
                            <div className="text-lg font-bold text-[#305399]">
                              {formatCurrency(row[selectedDeductible])}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
