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
  CreditCard,
  Users,
  Calendar,
  FileText
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const HealthDentalInfo: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const ohipBenefits = [
    "Doctor visits and consultations",
    "Hospital stays and emergency room visits",
    "Medical tests and diagnostic procedures",
    "Surgeries and medical procedures",
    "Specialist consultations (with referral)",
    "Maternity and newborn care"
  ];

  const dentalCoverage = [
    "Routine cleanings and checkups",
    "Fillings and basic restorative work",
    "Root canals and endodontic treatment",
    "Crowns and bridges",
    "Orthodontic treatment",
    "Oral surgery procedures"
  ];

  const faqData: FAQItem[] = [
    {
      question: "What does OHIP cover for dental care?",
      answer: "OHIP provides limited dental coverage, mainly for emergency dental surgery performed in a hospital setting. Most routine dental care requires private insurance or out-of-pocket payment."
    },
    {
      question: "How do I apply for OHIP coverage?",
      answer: "You can apply for OHIP online through the Ontario government website, by mail, or in person at a ServiceOntario location. You'll need proof of identity, citizenship/immigration status, and Ontario residency."
    },
    {
      question: "What's the difference between OHIP and private health insurance?",
      answer: "OHIP covers basic medical services, while private health insurance typically covers services not included in OHIP such as dental care, vision care, prescription drugs, and paramedical services."
    },
    {
      question: "Can I get dental insurance without health insurance?",
      answer: "Yes, you can purchase standalone dental insurance plans. However, many insurers offer combined health and dental packages that may provide better value and coverage."
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
              src="https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038953/HealthInsurance_tfdubm.jpg"
              alt="Health and dental insurance coverage"
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
                Health and Dental Insurance
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Complete coverage for your health and dental needs
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
              <Heart className="text-white" size={32} />
            </motion.div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Understanding your coverage options in Ontario - from OHIP basics to comprehensive private insurance plans.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* OHIP Information Card */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Shield className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Ontario Health Insurance Plan (OHIP)
              </h2>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-[#305399] p-6 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed">
                If you live in Ontario, you are probably covered under the government-funded Ontario Health Insurance Plan (OHIP). 
                When you are approved for OHIP, you'll get an Ontario health card which enables you to go to a doctor, clinic, 
                hospital or emergency room, and receive medical attention, tests and surgeries at no cost to you.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">What OHIP Covers:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ohipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Private Insurance Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <CreditCard className="text-[#305399]" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Private Health and Dental Insurance
              </h2>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              While OHIP covers essential medical services, many important health services are not included. 
              Private health and dental insurance helps bridge this gap, providing coverage for services like dental care, 
              vision care, prescription medications, and paramedical services.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Typical Dental Coverage Includes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {dentalCoverage.map((coverage, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-[#305399] mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{coverage}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <Users className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Family Coverage</h4>
                <p className="text-gray-600 text-sm">Comprehensive plans that cover you and your family members.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Calendar className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Flexible Plans</h4>
                <p className="text-gray-600 text-sm">Choose coverage levels that fit your needs and budget.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <FileText className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Easy Claims</h4>
                <p className="text-gray-600 text-sm">Simple claim submission and fast reimbursement processes.</p>
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
              Ready to Explore Your Health and Dental Options?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our insurance experts can help you understand your coverage options and find the right plan for your needs and budget.
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

export default HealthDentalInfo;
