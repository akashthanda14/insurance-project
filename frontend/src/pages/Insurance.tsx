import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Home, 
  Briefcase, 
  Heart, 
  Plane, 
  ArrowRight, 
  Shield, 
  Star,
  CheckCircle,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

// Import images from assets
import autoImg from '../assets/auto.jpg';
import homeImg from '../assets/home.jpg';
import businessImg from '../assets/bussiness.jpg';
import lifeImg from '../assets/life.jpg';
import travelImg from '../assets/travel.jpg';
import condoImg from '../assets/condo.jpg';

interface InsuranceType {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
  startingPrice?: string;
  coverage?: string;
}

function Insurance() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map each insurance type ID to its image
  const imageMap: Record<string, string> = {
    auto: autoImg,
    home: homeImg,
    business: businessImg,
    life: lifeImg,
    travel: travelImg,
    condo: condoImg,
    tenants: homeImg,
  };

  const insuranceTypes: InsuranceType[] = [
    {
      id: 'auto',
      icon: Car,
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicles with competitive rates and excellent service.',
      features: ['Collision Coverage', 'Liability Protection', '24/7 Roadside Assistance', 'Glass Coverage'],
      popular: true,
      startingPrice: '$89/month',
      coverage: 'Up to $2M'
    },
    {
      id: 'home',
      icon: Home,
      title: 'Home Insurance',
      description: 'Protect your home and belongings with our comprehensive home insurance policies.',
      features: ['Property Protection', 'Personal Belongings', 'Liability Coverage', 'Additional Living Expenses'],
      startingPrice: '$125/month',
      coverage: 'Up to $1M'
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Insurance',
      description: 'Tailored insurance solutions to protect your business assets and operations.',
      features: ['General Liability', 'Property Coverage', 'Business Interruption', 'Cyber Protection'],
      startingPrice: '$199/month',
      coverage: 'Up to $5M'
    },
    {
      id: 'life',
      icon: Heart,
      title: 'Life Insurance',
      description: "Secure your family's future with our range of life insurance products.",
      features: ['Term Life Options', 'Whole Life Plans', 'Critical Illness', 'Disability Coverage'],
      startingPrice: '$45/month',
      coverage: 'Up to $1M'
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel Insurance',
      description: "Travel with peace of mind knowing you're protected wherever you go.",
      features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Protection', 'Emergency Evacuation'],
      popular: true,
      startingPrice: '$25/trip',
      coverage: 'Up to $500K'
    },
    {
      id: 'condo',
      icon: Home,
      title: 'Condominium Insurance',
      description: 'Protect your condo unit and personal belongings from unexpected damage, theft, or liability.',
      features: ['Unit Coverage', 'Personal Property', 'Liability Protection', 'Loss Assessment'],
      startingPrice: '$85/month',
      coverage: 'Up to $750K'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Insurance' },
    { id: 'personal', label: 'Personal', types: ['auto', 'home', 'life', 'travel', 'condo'] },
    { id: 'business', label: 'Business', types: ['business'] },
  ];

  const filteredInsurance = selectedCategory === 'all' 
    ? insuranceTypes 
    : insuranceTypes.filter(type => {
        const category = categories.find(cat => cat.id === selectedCategory);
        return category?.types?.includes(type.id);
      });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        
        {/* Enhanced Header */}
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
              Insurance for Everything
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mt-4"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Explore our comprehensive insurance products and get personalized quotes tailored to your needs
          </p>
        </motion.header>

        {/* Filter and View Controls */}
        <motion.section
          className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 mb-8 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Category Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center">
                <Filter className="text-[#305399] mr-2" size={20} />
                <span className="font-semibold text-gray-700">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 font-medium ${
                      selectedCategory === category.id
                        ? 'border-[#305399] bg-[#305399] text-white shadow-lg'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-[#305399] hover:bg-blue-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-[#305399]' : 'text-gray-500'
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-[#305399]' : 'text-gray-500'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Insurance Cards/List */}
        <AnimatePresence mode="wait">
          <motion.section
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              : "space-y-6"
            }
          >
            {filteredInsurance.map((type) => {
              const Icon = type.icon;
              const imageSrc = imageMap[type.id];

              if (viewMode === 'list') {
                // List View for Desktop
                return (
                  <motion.div
                    key={type.id}
                    variants={itemVariants}
                    className="hidden lg:flex bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                    whileHover={{ y: -2 }}
                  >
                    {type.popular && (
                      <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center">
                        <Star className="mr-1" size={12} />
                        POPULAR
                      </div>
                    )}
                    
                    <div className="w-1/3 relative overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={imageSrc}
                        alt={type.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <Icon className="text-white w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{type.title}</h3>
                            <p className="text-sm font-semibold text-[#305399] uppercase tracking-wide">
                              Insurance Coverage
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-[#305399]">{type.startingPrice}</div>
                            <div className="text-sm text-gray-600">{type.coverage}</div>
                          </div>
                        </div>
                        
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
                        <Link
                          to={`/insurance/${type.id}`}
                          className="flex-1 bg-[#305399] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                        >
                          Learn More
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </Link>
                        <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200">
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Grid View (Default for Mobile and Desktop)
              return (
                <motion.div
                  key={type.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group relative"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.popular && (
                    <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center">
                      <Star className="mr-1" size={12} />
                      POPULAR
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden h-48 lg:h-56">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={imageSrc}
                      alt={type.title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold">{type.startingPrice}</div>
                      <div className="text-sm opacity-90">{type.coverage}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{type.title}</h3>
                      <p className="text-xs font-semibold text-[#305399] uppercase tracking-wide mb-3">
                        Insurance Coverage
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        {type.description}
                      </p>
                    </div>
                    
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

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/insurance/${type.id}`}
                        className="flex-1 bg-[#305399] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm lg:text-base"
                      >
                        Learn More
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-sm lg:text-base">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
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
            <button className="bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg">
              Speak to an Expert
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-bold hover:bg-white hover:text-[#305399] transition-all duration-200">
              Compare All Plans
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default Insurance;
