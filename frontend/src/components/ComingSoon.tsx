import React from "react";
import { motion } from "framer-motion";
import { 
  Clock,
  Bell,
  ArrowLeft,
  Mail,
  CheckCircle
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
  subtitle: string;
  description?: string;
  expectedLaunch?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ 
  title, 
  subtitle, 
  description = "We're working hard to bring you this insurance solution. Stay tuned for updates!",
  expectedLaunch = "Coming Soon"
}) => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 font-['Montserrat']">
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
            <Clock className="text-white" size={32} />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-2">
            {subtitle}
          </p>
          
          <motion.div
            className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Clock className="mr-2" size={16} />
            {expectedLaunch}
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center space-y-6">
            {/* Coming Soon Icon */}
            <motion.div
              className="relative inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-full shadow-2xl">
                <Bell className="text-white" size={48} />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                NEW
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                We're Building Something Great
              </h2>
              
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features Coming Soon */}
            <div className="bg-blue-50 rounded-2xl p-6 text-left">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">What to Expect</h3>
              <div className="space-y-3">
                {[
                  "Competitive premium rates",
                  "Instant online quotes", 
                  "Comprehensive coverage options",
                  "24/7 customer support"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-[#305399] to-[#253A66] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <Mail className="mr-2" size={24} />
                <h3 className="text-lg font-bold">Get Notified</h3>
              </div>
              <p className="text-blue-100 mb-4 text-sm">
                Be the first to know when this insurance product becomes available
              </p>
              <motion.button
                className="w-full bg-white text-[#305399] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Here you could implement email collection
                  alert("Thank you for your interest! We'll notify you when this product is available.");
                }}
              >
                Notify Me When Available
              </motion.button>
            </div>

            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-[#305399] hover:text-[#253A66] font-semibold transition-colors"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Insurance Options
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Clock className="text-blue-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">In Development</h3>
              <p className="text-sm text-gray-600">Our team is actively working on this product</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <Bell className="text-orange-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600">Get notified when the product launches</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
              <CheckCircle className="text-green-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-800 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">Comprehensive coverage when ready</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ComingSoon;
