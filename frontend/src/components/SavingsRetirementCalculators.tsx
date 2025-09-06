import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  PiggyBank,
  Target,
  Home,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Info,
  Calculator,
  DollarSign,
  Shield
} from "lucide-react";

interface CalculatorOption {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  route: string;
  benefits: string[];
  popular?: boolean;
}

const calculatorOptions: CalculatorOption[] = [
  {
    id: "rrsp",
    name: "RRSP Calculator",
    shortName: "RRSP",
    description: "Registered Retirement Savings Plan - Build your retirement nest egg with tax-deductible contributions and tax-deferred growth.",
    icon: PiggyBank,
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-700",
    route: "/RRSPCalculator",
    benefits: ["Tax-deductible contributions", "Tax-deferred growth", "Retirement income planning"],
    popular: true
  },
  {
    id: "tfsa",
    name: "TFSA Calculator", 
    shortName: "TFSA",
    description: "Tax-Free Savings Account - Flexible savings with tax-free growth and withdrawals for any financial goal.",
    icon: Target,
    color: "text-green-600",
    gradient: "from-green-500 to-green-700",
    route: "/TFSACalculator",
    benefits: ["Tax-free growth", "Flexible withdrawals", "No age restrictions"]
  },
  {
    id: "fhsa",
    name: "FHSA Calculator",
    shortName: "FHSA", 
    description: "First Home Savings Account - Combine the best of RRSP and TFSA benefits specifically for first-time home buyers.",
    icon: Home,
    color: "text-orange-600",
    gradient: "from-orange-500 to-orange-700",
    route: "/FSHACalculator",
    benefits: ["Tax-deductible contributions", "Tax-free withdrawals", "First home purchase"]
  },
  {
    id: "resp",
    name: "RESP Calculator",
    shortName: "RESP",
    description: "Registered Education Savings Plan - Save for your child's education with government grants and tax-sheltered growth.",
    icon: GraduationCap,
    color: "text-purple-600", 
    gradient: "from-purple-500 to-purple-700",
    route: "/RESPCalculator",
    benefits: ["Government grants up to $7,200", "Tax-sheltered growth", "Education funding"]
  }
];

export const SavingsRetirementCalculators: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: CalculatorOption) => {
    setSelectedOption(option.id);
    
    setTimeout(() => {
      navigate(option.route);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative inline-block mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#305399] to-[#253A66] p-6 rounded-full shadow-2xl">
              <Calculator className="text-white" size={40} />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#305399] to-[#253A66] leading-tight mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Savings & Retirement
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Plan your financial future with our comprehensive Canadian savings and retirement calculators
          </motion.p>

          <motion.div
            className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-3">
              <Shield className="text-blue-600 mr-3" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Canadian Tax-Advantaged Accounts</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Maximize your savings with Canada's registered accounts. Each calculator uses current 2025 contribution limits, 
              tax rates, and government benefits to give you accurate projections for your financial goals.
            </p>
          </motion.div>
        </motion.header>

        {/* Calculator Cards Grid */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {calculatorOptions.map((option, index) => {
            const Icon = option.icon;
            const isHovered = hoveredOption === option.id;
            const isSelected = selectedOption === option.id;
            
            return (
              <motion.div
                key={option.id}
                variants={cardVariants}
                whileHover="hover"
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => handleOptionClick(option)}
              >
                {/* Popular Badge */}
                {option.popular && (
                  <motion.div 
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg z-20"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    POPULAR
                  </motion.div>
                )}

                {/* Main Card */}
                <div className={`relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border-2 transition-all duration-500 overflow-hidden h-full ${
                  isSelected 
                    ? 'border-[#305399] shadow-2xl bg-gradient-to-br from-blue-50 to-white' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-2xl'
                }`}>
                  
                  {/* Animated Background Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                  />

                  <div className="relative p-8 lg:p-10 h-full flex flex-col">
                    {/* Icon Section */}
                    <motion.div
                      className="flex items-center justify-between mb-6"
                      animate={{
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <motion.div
                          className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r ${option.gradient} flex items-center justify-center shadow-lg`}
                          animate={{
                            boxShadow: isHovered 
                              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(48, 83, 153, 0.3)"
                              : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="text-white" size={28} />
                        </motion.div>
                        
                        {/* Rotating Ring */}
                        <motion.div
                          className="absolute -inset-3 rounded-2xl border-4 border-dashed border-gray-300 opacity-20"
                          animate={{ rotate: isHovered ? 180 : 0 }}
                          transition={{ duration: 2, ease: "linear" }}
                        />
                      </div>

                      <motion.div
                        className={`text-right ${option.color}`}
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-2xl font-bold">{option.shortName}</div>
                        <div className="text-sm opacity-70">Calculator</div>
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <motion.h3 
                        className="text-2xl lg:text-3xl font-bold text-gray-800"
                        animate={{ color: isHovered ? "#305399" : "#374151" }}
                        transition={{ duration: 0.3 }}
                      >
                        {option.name}
                      </motion.h3>
                      
                      <p className="text-gray-600 text-base leading-relaxed">
                        {option.description}
                      </p>

                      {/* Benefits List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                          <TrendingUp size={16} className="mr-2 text-green-500" />
                          Key Benefits:
                        </h4>
                        <ul className="space-y-1">
                          {option.benefits.map((benefit, idx) => (
                            <motion.li 
                              key={idx}
                              className="text-sm text-gray-600 flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                              {benefit}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Section */}
                    <motion.div
                      className={`mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-lg font-bold transition-all duration-300 ${
                        isHovered ? 'text-[#305399]' : 'text-gray-500'
                      }`}
                      animate={{ 
                        y: isHovered ? -3 : 0,
                        scale: isSelected ? 0.95 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{isSelected ? 'Loading Calculator...' : 'Calculate Now'}</span>
                      <ArrowRight 
                        size={24} 
                        className={`transition-transform duration-300 ${
                          isHovered ? 'translate-x-2' : ''
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Loading Overlay */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-12 h-12 border-4 border-[#305399] border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Additional Information */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <DollarSign className="text-green-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">2025 Contribution Limits</h3>
              <p className="text-sm text-gray-600">Updated with current year limits and tax benefits</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Shield className="text-blue-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Government Benefits</h3>
              <p className="text-sm text-gray-600">Includes grants, tax deductions, and incentives</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Calculator className="text-purple-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Accurate Projections</h3>
              <p className="text-sm text-gray-600">Professional-grade calculations for planning</p>
            </div>
          </div>

          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.02 }}
          >
            <a 
              href="#" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              <Info size={16} className="mr-2" />
              Learn more about Canadian registered accounts
              <ArrowRight size={16} className="ml-2" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default SavingsRetirementCalculators;
