import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Plane,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Image URLs mapped to insurance types
const imageMap: Record<string, string> = {
  life: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038952/LifeInsurance_tfkck0.jpg",
  health_dental: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038953/HealthInsurance_tfdubm.jpg",
  travel: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038953/Travelnsurance_bpfvbx.jpg",
  supervisa: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038953/SuperVisa_nkplnm.jpg",
  critical_illness: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752038952/CriticalIllness_cn8cat.jpg",
};

// Route mapping for navigation
const routeMap: Record<string, string> = {
  life: "/lifeinfo",
  health_dental: "/healthDentalinfo", 
  travel: "/travelinsuranceinfo",
  supervisa: "/supervisa",
  critical_illness: "/critical-illness"
};

interface InsuranceType {
  id: keyof typeof imageMap;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  startingPrice: string;
  coverage: string;
}

const insuranceTypes: InsuranceType[] = [
  {
    id: "life",
    icon: Heart,
    title: "Life Insurance",
    description: "Secure your family's future with our range of life insurance products.",
    features: [
      "Term Life Options",
      "Whole Life Plans",
      "Critical Illness",
      "Disability Coverage",
    ],
    startingPrice: "$45/month",
    coverage: "Up to $1M",
  },
  {
    id: "health_dental",
    icon: Heart,
    title: "Health and Dental Insurance",
    description: "Comprehensive health and dental coverage for you and your family.",
    features: [
      "Dental Coverage",
      "Medical Coverage",
      "Prescription Drugs",
      "Preventive Care",
    ],
    startingPrice: "$60/month",
    coverage: "Up to $1M",
  },
  {
    id: "travel",
    icon: Plane,
    title: "Travel Insurance",
    description: "Travel with peace of mind knowing you're protected wherever you go.",
    features: [
      "Medical Coverage",
      "Trip Cancellation",
      "Baggage Protection",
      "Emergency Evacuation",
    ],
    startingPrice: "$25/trip",
    coverage: "Up to $500K",
  },
  {
    id: "supervisa",
    icon: Shield,
    title: "Supervisa Insurance",
    description: "Insurance coverage for Supervisa applicants and visitors.",
    features: [
      "Visitor Coverage",
      "Emergency Medical",
      "Trip Cancellation",
      "24/7 Assistance",
    ],
    startingPrice: "$30/month",
    coverage: "Up to $500K",
  },
  {
    id: "critical_illness",
    icon: Heart,
    title: "Critical Illness Insurance",
    description: "Financial protection against major critical illnesses.",
    features: [
      "Lump Sum Payment",
      "Coverage for Multiple Illnesses",
      "No Medical Exam Required",
      "Flexible Plans",
    ],
    startingPrice: "$50/month",
    coverage: "Up to $1M",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Insurance: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
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
              <Shield className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#305399] leading-tight">
              Insurance for Life's Needs
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mt-4"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Explore our curated insurance products and get personalized quotes tailored to your needs.
          </p>
        </motion.header>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-[#305399]"
                  : "text-gray-500"
              }`}
              aria-label="Grid View"
              type="button"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-[#305399]"
                  : "text-gray-500"
              }`}
              aria-label="List View"
              type="button"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="4" cy="6" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="4" cy="18" r="2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Insurance Cards/List */}
        <AnimatePresence mode="wait">
          <motion.section
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                : "space-y-6"
            }
          >
            {insuranceTypes.map((type) => {
              const Icon = type.icon;
              const imageSrc = imageMap[type.id];

              if (viewMode === "list") {
                // List View - Clickable Card
                return (
                  <Link
                    to={routeMap[type.id]}
                    key={type.id}
                    className="block"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-full md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
                          src={imageSrc}
                          alt={type.title}
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Icon className="text-white w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">{type.title}</h3>
                          <div className="text-lg font-bold text-[#305399]">{type.startingPrice}</div>
                          <div className="text-sm text-gray-600 mb-2">{type.coverage}</div>
                          <p className="text-gray-600 mb-4 leading-relaxed">{type.description}</p>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {type.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={14} />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            className="flex-1 bg-[#305399] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                            onClick={(e) => e.preventDefault()}
                          >
                            Learn More
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                          </button>
                          <button 
                            className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log("Get quote for:", type.title);
                            }}
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              }

              // Grid View - Clickable Card
              return (
                <Link
                  to={routeMap[type.id]}
                  key={type.id}
                  className="block"
                >
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group relative flex flex-col cursor-pointer"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative overflow-hidden h-48 lg:h-56 rounded-t-2xl">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={imageSrc}
                        alt={type.title}
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <Icon className="text-white w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{type.title}</h3>
                      <div className="text-lg font-bold text-[#305399]">{type.startingPrice}</div>
                      <div className="text-sm text-gray-600 mb-2">{type.coverage}</div>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                      <div className="space-y-2 mb-6">
                        {type.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={14} />
                            {feature}
                          </div>
                        ))}
                        {type.features.length > 3 && (
                          <div className="text-sm text-[#305399] font-medium">
                            +{type.features.length - 3} more features
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <button 
                          className="flex-1 bg-[#305399] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm lg:text-base"
                          onClick={(e) => e.preventDefault()}
                        >
                          Learn More
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </button>
                        <button 
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-sm lg:text-base"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log("Get quote for:", type.title);
                          }}
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.section>
        </AnimatePresence>

        {/* Call to Action Section */}
        <motion.section
          className="mt-12 lg:mt-16 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-2xl p-8 lg:p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Need Help Choosing the Right Insurance?
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our insurance experts are here to help you find the perfect coverage for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="tel:+16476162106"
              className="bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg block text-center"
            >
              Speak to an Expert
            </a>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-bold hover:bg-white hover:text-[#305399] transition-all duration-200">
              Compare All Plans
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Insurance;
