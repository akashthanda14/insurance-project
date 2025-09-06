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
  Plane,
  Users,
  Calendar,
  MapPin,
  Clock,
  Globe,
  Stethoscope,
  FileText
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const TravelInsuranceInfo: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const coverageBenefits = [
    "Emergency medical treatment",
    "Hospital stays and surgeries",
    "Prescription medications",
    "Emergency dental care",
    "Medical evacuation services",
    "Repatriation of remains"
  ];

  const assistanceBenefits = [
    "Referrals to medical providers",
    "Monitoring the quality of your care",
    "Communication with treating physicians",
    "Arranging medical escorts",
    "Air ambulance coordination",
    "24/7 emergency assistance hotline"
  ];

  const idealFor = [
    "Visitors to Canada",
    "Super Visa applicants",
    "Visiting friends and relatives",
    "Landed immigrants waiting for provincial coverage",
    "Individuals on work visas",
    "Students studying in Canada"
  ];

  const faqData: FAQItem[] = [
    {
      question: "What is Super Visa insurance and who needs it?",
      answer: "Super Visa insurance is mandatory medical insurance for parents and grandparents applying for a Super Visa to visit Canada. It must provide at least $100,000 in coverage and be valid for at least one year."
    },
    {
      question: "How much does travel medical insurance cost?",
      answer: "The cost varies based on age, length of stay, coverage amount, and pre-existing conditions. Generally, it ranges from a few dollars per day for younger travelers to higher amounts for seniors or those with health conditions."
    },
    {
      question: "What's not covered by travel insurance?",
      answer: "Typically excluded are pre-existing medical conditions (unless declared and covered), routine medical care, pregnancy-related expenses (unless emergency), and injuries from high-risk activities unless specifically covered."
    },
    {
      question: "Can I buy travel insurance after arriving in Canada?",
      answer: "Some insurers allow purchase within a few days of arrival, but it's always best to buy before traveling. Coverage typically starts immediately or after a waiting period, depending on the policy."
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
          src="https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038953/Travelnsurance_bpfvbx.jpg"
          alt="Travel insurance coverage for international travelers"
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
            Travel Insurance
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Peace of Mind Included 🙂
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
              <Globe className="text-white" size={32} />
            </motion.div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive travel medical insurance for visitors to Canada, Super Visa applicants, and international travelers.
          </p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          
          {/* Travel Insurance Overview */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MapPin className="text-[#305399]" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Why Travel Insurance Matters
              </h2>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-[#305399] p-6 rounded-r-lg mb-6">
              <p className="text-gray-700 leading-relaxed">
                Are you planning a trip to Canada? Maybe someone special is coming to Canada to visit or you're looking for Super Visa insurance. 
                Either way, it should be a safe and enjoyable visit. Because unexpected illnesses or injuries can happen, make sure you've got 
                travel medical insurance. Financial losses related to medical emergencies abroad can be significant and drain your and your family's resources.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Ideal for:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {idealFor.map((category, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-blue-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{category}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Medical Coverage Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Stethoscope className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Medical Coverage Benefits
              </h2>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether an outpatient visit or finding yourself admitted to a hospital, our travel insurance plan with medical benefits 
              can help protect you against unexpected medical costs. Coverage includes emergency treatment, hospital stays, and more.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">What's Covered:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {coverageBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">Special Coverage Options:</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• Super Visa insurance with minimum $100,000 coverage</li>
                <li>• Coverage for pre-existing conditions (with medical questionnaire)</li>
                <li>• Extended coverage periods up to one year or more</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <button className="bg-[#305399] text-white py-3 px-8 rounded-xl font-bold hover:bg-[#253A66] transition-all duration-200 shadow-lg">
                Get Travel Quote
              </button>
            </div>
          </motion.section>

          {/* Assistance Services Section */}
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-100"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Shield className="text-purple-600" size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Invaluable Assistance Services
              </h2>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              While coverage for unexpected medical costs might be the first advantage that comes to mind, many travelers overlook 
              the invaluable assistance benefits that our Medical Plans provide. We're here to help you navigate the healthcare 
              system and ensure you receive the best possible care.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Assistance Benefits Include:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {assistanceBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-purple-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <Phone className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Round-the-clock emergency assistance and medical coordination services.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Users className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Care Coordination</h4>
                <p className="text-gray-600 text-sm">Expert coordination between your home and destination healthcare providers.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <Plane className="text-[#305399] mb-3" size={32} />
                <h4 className="font-bold text-gray-800 mb-2">Medical Transport</h4>
                <p className="text-gray-600 text-sm">Emergency evacuation and repatriation services when medically necessary.</p>
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
              Ready to Travel with Confidence?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our travel insurance experts can help you find the perfect coverage for your trip to Canada, whether for tourism, 
              Super Visa, work, or study purposes.
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

export default TravelInsuranceInfo;
