import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  User,
  Heart,
  DollarSign,
  Shield,
  ArrowRight,
  Info
} from "lucide-react";

export const LifeTermInsuranceQuote: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male");
  const [usedTobacco, setUsedTobacco] = useState("No");
  const [coverageAmount, setCoverageAmount] = useState("$100,000");
  const [premiumMode, setPremiumMode] = useState("Monthly");
  const [planType, setPlanType] = useState("10 year Term");
  const [productType, setProductType] = useState("Regular");

  // Coverage amount options
  const coverageOptions = [
    "$100,000", "$200,000", "$300,000", "$400,000", "$500,000",
    "$750,000", "$1,000,000", "$1,500,000", "$2,000,000"
  ];

  // Premium mode options
  const premiumModes = ["Monthly", "Quarterly", "Semi-Annual", "Annual"];

  // Plan type options
  const planTypes = [
    "10 year Term", "15 year Term", "20 year Term", "25 year Term", 
    "30 year Term", "Term to 65", "Term to 100", "Whole Life"
  ];

  // Product type options
  const productTypes = ["Regular", "Simplified", "Guaranteed", "No Medical"];

  // Calculate age from date of birth
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(Math.max(0, calculatedAge));
    } else {
      setAge(0);
    }
  }, [dateOfBirth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!dateOfBirth || age < 18 || age > 85) {
      alert("Please enter a valid date of birth (age must be between 18-85)");
      return;
    }

    const quoteData = {
      dateOfBirth,
      age,
      gender,
      usedTobacco,
      coverageAmount,
      premiumMode,
      planType,
      productType
    };

    console.log("Quote Request:", quoteData);
    // Here you would typically send this data to your API
    alert("Quote request submitted! We'll get back to you shortly.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <motion.header
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="bg-[#305399] p-4 rounded-full mb-4 shadow-lg inline-block"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="text-white" size={32} />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Life Insurance Quote
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get personalized life insurance quotes to protect your family's financial future
          </p>
        </motion.header>

        {/* Quote Form */}
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date of Birth & Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <motion.div 
                className="md:col-span-2 space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                  <Calendar className="mr-2 text-[#305399]" size={18} />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base lg:text-lg font-semibold text-gray-700">Age</label>
                <input
                  type="number"
                  value={age}
                  readOnly
                  className="w-full px-4 py-3 lg:py-4 text-base lg:text-lg border-2 border-gray-200 rounded-xl bg-gray-100 text-center font-bold text-[#305399]"
                />
              </motion.div>
            </div>

            {/* Gender */}
            <motion.fieldset 
              className="space-y-3"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <legend className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                <User className="mr-2 text-[#305399]" size={18} />
                Gender
              </legend>
              <div className="flex gap-6">
                {['Male', 'Female'].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={gender === option}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-4 h-4 text-[#305399] bg-gray-100 border-gray-300 focus:ring-[#305399] focus:ring-2"
                      required
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-[#305399] transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </motion.fieldset>

            {/* Tobacco Use */}
            <motion.fieldset 
              className="space-y-3"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <legend className="flex items-center text-base lg:text-lg font-semibold text-gray-700">
                <Shield className="mr-2 text-[#305399]" size={18} />
                Have you used Tobacco/Cigarette in the last 12 months?
              </legend>
              <div className="flex gap-6">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="tobacco"
                      value={option}
                      checked={usedTobacco === option}
                      onChange={(e) => setUsedTobacco(e.target.value)}
                      className="w-4 h-4 text-[#305399] bg-gray-100 border-gray-300 focus:ring-[#305399] focus:ring-2"
                      required
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-[#305399] transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </motion.fieldset>

            {/* Coverage Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Coverage Amount */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="flex items-center text-base font-semibold text-gray-700">
                  <DollarSign className="mr-2 text-[#305399]" size={16} />
                  Coverage Amount
                </label>
                <select
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {coverageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </motion.div>

              {/* Premium Mode */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base font-semibold text-gray-700">Premium Mode</label>
                <select
                  value={premiumMode}
                  onChange={(e) => setPremiumMode(e.target.value)}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {premiumModes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </motion.div>

              {/* Plan Type */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base font-semibold text-gray-700">Plan Type</label>
                <select
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value)}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {planTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </motion.div>

              {/* Product Type */}
              <motion.div 
                className="space-y-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <label className="text-base font-semibold text-gray-700">Product Type</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-3 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                >
                  {productTypes.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div className="pt-4">
              <motion.button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GET QUOTE
                <ArrowRight size={24} />
              </motion.button>
            </motion.div>
          </form>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start">
              <Info className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-sm text-gray-700">
                This quote is an estimate based on the information provided. Final rates may vary based on 
                medical underwriting and other factors. All quotes are subject to approval.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Heart className="text-red-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Family Protection</h3>
              <p className="text-sm text-gray-600">Secure your family's financial future with comprehensive life coverage</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Shield className="text-blue-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Guaranteed Coverage</h3>
              <p className="text-sm text-gray-600">Lock in your rates with term life insurance options</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <DollarSign className="text-green-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Affordable Premiums</h3>
              <p className="text-sm text-gray-600">Competitive rates with flexible payment options</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default LifeTermInsuranceQuote;
