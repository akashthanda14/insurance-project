import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
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

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat'] flex items-center justify-center px-4 py-8 lg:py-12">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header
          className="text-center mb-8 lg:mb-12"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center mb-6">
            <motion.div
              className="bg-[#305399] p-4 rounded-full mb-4 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#305399] leading-tight">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mt-4"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our insurance or investment products? We're here to help you make the right choice.
          </p>
        </motion.header>

        {/* Form Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              // Success Message
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-16 px-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                >
                  <CheckCircle className="text-green-600" size={40} />
                </motion.div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#305399] mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Thank you for contacting us. Our team will get back to you within 24 hours.
                </p>
                <motion.button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="bg-[#305399] text-white py-3 px-8 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              // Contact Form
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="p-8 lg:p-12 space-y-6"
              >
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline mr-2" size={16} />
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#305399] focus:ring-2 focus:ring-[#305399]/20 outline-none transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline mr-2" size={16} />
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#305399] focus:ring-2 focus:ring-[#305399]/20 outline-none transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                {/* Phone Number */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#305399] focus:ring-2 focus:ring-[#305399]/20 outline-none transition-all duration-200"
                    placeholder="+1 (647) 616-2106"
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#305399] focus:ring-2 focus:ring-[#305399]/20 outline-none transition-all duration-200 resize-none"
                    placeholder="Tell us about your insurance or investment needs..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-[#305399] text-white py-4 px-8 rounded-xl font-bold hover:bg-[#253A66] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-gray-600 mb-4">
            Prefer to call? Speak directly with our experts:
          </p>
          <motion.a
            href="tel:+16476162106"
            className="inline-flex items-center bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="mr-2" size={20} />
            +1 (647) 616-2106
          </motion.a>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default ContactForm;
