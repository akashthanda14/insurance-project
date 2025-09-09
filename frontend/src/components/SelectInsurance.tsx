import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  Heart,
  Plane,
  Shield,
  Clock,
  AlertTriangle,
  ArrowRight,
  Info,
  ChevronRight,
  DollarSign,
  UserX,
  Activity,
  Banknote,
  Zap
} from "lucide-react";

interface InsuranceOption {
  id: string;
  name: string;
  subtitle: string;
  details: string;
  icon: React.ComponentType<any>;
  popular?: boolean;
  color: string;
  gradient: string;
  route: string;
}

const insuranceOptions: InsuranceOption[] = [
  {
    id: "life",
    name: "Life Insurance",
    subtitle: "Term & Whole Life Coverage",
    details: "Comprehensive life insurance plans to secure your family's financial future with flexible terms and competitive premiums",
    icon: Heart,
    popular: true,
    color: "text-red-500",
    gradient: "from-red-500 to-pink-600",
    route: "/LifeTermInsuranceQuote"
  },
  {
    id: "travel",
    name: "Travel",
    subtitle: "Super Visa Insurance / Visitors Insurance",
    details: "Complete travel protection including emergency medical, trip cancellation, and visitor insurance for international travelers",
    icon: Plane,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-600",
    route: "/PremiumOptions"
  },
  {
    id: "health-dental",
    name: "Health and Dental",
    subtitle: "Complete Medical & Dental Coverage",
    details: "Comprehensive health and dental insurance plans covering medical expenses, prescription drugs, and dental treatments",
    icon: Shield,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-600",
    route: "/coming-soon/health-dental"
  },
  {
    id: "long-term-care",
    name: "Long-Term Care",
    subtitle: "Extended Care Insurance",
    details: "Long-term care insurance covering nursing home care, home healthcare, and assisted living services",
    icon: Clock,
    color: "text-purple-500",
    gradient: "from-purple-500 to-violet-600",
    route: "/coming-soon/long-term-care"
  },
  {
    id: "loss-of-income",
    name: "Loss of Income",
    subtitle: "Disability due to injury/illness",
    details: "Income protection insurance providing financial support when you're unable to work due to injury or illness",
    icon: DollarSign,
    color: "text-orange-500",
    gradient: "from-orange-500 to-amber-600",
    route: "/coming-soon/loss-of-income"
  },
  {
    id: "critical-illness",
    name: "Critical Illness Insurance",
    subtitle: "Protection Against Major Illnesses",
    details: "Financial protection against critical illnesses like cancer, heart attack, and stroke with lump-sum benefits",
    icon: Activity,
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
    route: "/coming-soon/critical-illness"
  },
  {
    id: "final-expense",
    name: "Final Expense Insurance",
    subtitle: "End-of-Life Coverage",
    details: "Affordable life insurance designed to cover funeral costs and final expenses for your loved ones",
    icon: Banknote,
    color: "text-gray-600",
    gradient: "from-gray-500 to-slate-600",
    route: "/coming-soon/final-expense"
  },
  {
    id: "accident-dismemberment",
    name: "Accident & Dismemberment",
    subtitle: "Accidental Death & Dismemberment",
    details: "Protection against accidental death or loss of limbs with comprehensive coverage for unexpected accidents",
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    route: "/coming-soon/accident-dismemberment"
  }
];

export const InsuranceOptions: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: InsuranceOption) => {
    setSelectedOption(option.id);
    
    // Add a small delay for animation feedback before navigation
    setTimeout(() => {
      if (option.route.startsWith('/coming-soon/')) {
        // Navigate to coming soon page with insurance type info
        navigate('/coming-soon', { 
          state: { 
            title: option.name,
            subtitle: option.subtitle,
            description: option.details,
            expectedLaunch: "Q1 2025"
          } 
        });
      } else {
        // Navigate to actual quote page
        navigate(option.route, { 
          state: { 
            insuranceType: option.name,
            insuranceId: option.id 
          } 
        });
      }
    }, 300);
  };

  const circularVariants = {
    initial: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    animate: (index: number) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0,
      x: -50
    },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        type: "spring" as const
      }
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Enhanced Header */}
        <motion.header
          className="text-center mb-6 lg:mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Question */}
          <motion.h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#305399] to-[#253A66] leading-tight mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How can we help secure your peace of mind today??
          </motion.h1>

          <motion.div 
            className="relative inline-block mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-[#305399] to-[#253A66] p-3 rounded-full shadow-2xl">
              <Shield className="text-white" size={24} />
            </div>
          </motion.div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Choose your coverage and get an instant quote
          </motion.p>
        </motion.header>

        {/* Step Indicator */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 lg:p-5 mb-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center lg:justify-start">
            <motion.div 
              className="bg-gradient-to-r from-[#305399] to-[#253A66] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3 shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              3
            </motion.div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-800 text-center lg:text-left">
              Step 3: Select your insurance type
            </h2>
          </div>
        </motion.div>

        {/* Insurance Options Grid */}
        <motion.section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {insuranceOptions.map((option, index) => {
            const Icon = option.icon;
            const isHovered = hoveredOption === option.id;
            const isSelected = selectedOption === option.id;
            
            return (
              <motion.div
                key={option.id}
                custom={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative group cursor-pointer h-full"
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => handleOptionClick(option)}
              >
                {/* Popular Badge */}
                {option.popular && (
                  <motion.div 
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg z-20"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    POPULAR
                  </motion.div>
                )}

                {/* Main Card */}
                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 transition-all duration-500 overflow-hidden h-full min-h-[280px] ${
                  isSelected 
                    ? 'border-[#305399] shadow-2xl bg-gradient-to-br from-blue-50 to-white' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-2xl'
                }`}>
                  
                  {/* Animated Background Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                  />

                  <div className="relative p-6 h-full flex flex-col justify-between">
                    {/* Top Section - Icon and Content */}
                    <div className="flex flex-col items-center">
                      {/* Circular Icon with Animation */}
                      <motion.div
                        custom={index}
                        variants={circularVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        className="relative mb-4 mx-auto w-16 h-16"
                      >
                        {/* Circular Background with Pulse Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${option.gradient} rounded-full shadow-2xl`}
                          animate={{
                            boxShadow: isHovered 
                              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(48, 83, 153, 0.3)"
                              : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="text-white" size={24} />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="text-center flex-1">
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 mb-2 min-h-[2.5rem] flex items-center justify-center"
                          animate={{ color: isHovered ? "#305399" : "#374151" }}
                          transition={{ duration: 0.3 }}
                        >
                          {option.name}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-sm font-semibold text-blue-600 min-h-[3rem] flex items-center justify-center px-2"
                          animate={{ scale: isHovered ? 1.02 : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {option.subtitle}
                        </motion.p>
                      </div>
                    </div>

                    {/* Bottom Section - Action Button */}
                    <motion.div
                      className={`mt-4 flex items-center justify-center space-x-2 text-base font-bold transition-all duration-300 ${
                        isHovered ? 'text-[#305399]' : 'text-gray-500'
                      }`}
                      animate={{ 
                        y: isHovered ? -3 : 0,
                        scale: isSelected ? 0.95 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>{isSelected ? 'Loading...' : 'Get Quote'}</span>
                      <ArrowRight 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          isHovered ? 'translate-x-1' : ''
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
      </div>
    </main>
  );
};
