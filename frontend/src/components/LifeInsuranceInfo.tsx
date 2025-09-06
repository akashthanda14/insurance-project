import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  CheckCircle,
  Info,
  Phone,
  ArrowRight,
  Plus,
  Minus,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Umbrella
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const LifeInsuranceInfo: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const termBenefits = [
    "Fixed period coverage (10-20 years)",
    "Coverage until specific age (65 years)",
    "Tax-free death benefit to beneficiaries",
    "Lower premium costs",
    "Mortgage and debt protection",
    "Children's education funding"
  ];

  const permanentBenefits = [
    "Lifetime coverage guarantee",
    "Cash value accumulation",
    "Stable premium payments",
    "Borrowing against cash value",
    "Tax-advantaged growth",
    "Estate planning benefits"
  ];

  const faqData: FAQItem[] = [
    {
      question: "What's the difference between term and permanent life insurance?",
      answer: "Term life insurance provides coverage for a specific period (10-20 years) at lower costs, while permanent life insurance covers you for life and builds cash value but costs more."
    },
    {
      question: "How much life insurance coverage do I need?",
      answer: "Generally, you should have coverage worth 10-12 times your annual income. Consider your debts, mortgage, children's education costs, and your family's ongoing expenses."
    },
    {
      question: "Can I change my life insurance policy later?",
      answer: "Yes, many policies offer conversion options. Term policies can often be converted to permanent insurance, and permanent policies may allow adjustments to coverage amounts and premiums."
    },
    {
      question: "What happens if I stop paying premiums?",
      answer: "For term insurance, coverage ends. For permanent insurance with cash value, you may be able to use accumulated cash value to keep the policy active temporarily, or receive the cash surrender value."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        
        {/* Hero Image Section */}
        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752050816/close-up-family-discussing-with-therapist_1_n17ebh.jpg"
              alt="Family discussing life insurance options with advisor"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Life Insurance
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Protecting your family's financial future with the right coverage
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.header
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center mb-6">
            <motion.div
              className="bg-[#305399] p-4 rounded-full mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Umbrella className="text-white" size={32} />
            </motion.div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Understanding term and permanent life insurance options for Canadians - from basic coverage to comprehensive financial planning.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Life Insurance Overview */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Heart className="text-[#305399]" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Why Life Insurance Matters
              </h2>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-[#305399] p-6 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed">
                You're not alone in thinking about life insurance. For many Canadians, it's an important part of a comprehensive financial plan. 
                It can help your named beneficiary, such as your family, replace your income and fulfill their plans – such as going to university 
                or retiring – in your absence. But do you know what type of life insurance is right for you? Let's find out together.
              </p>
            </div>
          </motion.section>

          {/* Term Insurance Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Clock className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Term Life Insurance
              </h2>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Term life insurance is a top choice for people who want to cover financial obligations that are common when raising a family. 
              It pays a death benefit to the beneficiaries named on the policy if the person insured dies within a specific period of time 
              or before reaching a certain age. With term life insurance in place, there's a safety net that can provide funds for paying 
              a mortgage, sending kids through college or other important concerns.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Term Insurance Benefits:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {termBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">Coverage Options:</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Fixed period of time, such as a term of 10 or 20 years</li>
                <li>• Until you reach a set age, such as 65 years old</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-[#305399] text-white py-3 px-8 rounded-xl font-bold hover:bg-[#253A66] transition-all duration-200 shadow-lg">
                Get Term Quote
              </button>
            </div>
          </motion.section>

          {/* Permanent Insurance Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Shield className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Permanent Life Insurance
              </h2>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Permanent life insurance is often called whole life insurance because it covers you for your whole life. 
              It gives your beneficiaries a tax-free payment after you die at any time while your insurance policy is in effect. 
              Some plans can build cash value over time, and permanent insurance costs typically don't increase from the time you first buy the policy.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Permanent Insurance Benefits:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {permanentBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-purple-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <DollarSign className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Whole Life Insurance</h4>
                <p className="text-gray-600 text-sm">Guaranteed premiums and cash value with lifetime coverage protection.</p>
                <button className="mt-4 bg-[#305399] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-[#253A66] transition-all duration-200">
                  Get Quote
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <TrendingUp className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Universal Life Insurance</h4>
                <p className="text-gray-600 text-sm">Combines life insurance with investment accounts for flexible growth potential.</p>
                <button className="mt-4 bg-[#305399] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-[#253A66] transition-all duration-200">
                  Get Quote
                </button>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-8">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Info className="text-yellow-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <Minus className="text-[#305399] flex-shrink-0" size={20} />
                    ) : (
                      <Plus className="text-[#305399] flex-shrink-0" size={20} />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            variants={itemVariants}
            className="bg-gradient-to-r from-[#305399] to-[#253A66] rounded-2xl p-8 lg:p-12 text-white text-center"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Protect Your Family's Future?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our life insurance experts can help you choose the right coverage to protect your loved ones and secure their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="tel:+16476162106"
                className="bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <Phone className="mr-2" size={20} />
                Speak to an Expert
              </a>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-bold hover:bg-white hover:text-[#305399] transition-all duration-200 flex items-center justify-center">
                Get a Quote
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
};

export default LifeInsuranceInfo;
