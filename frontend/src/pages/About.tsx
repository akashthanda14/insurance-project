import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Award, 
  Heart, 
  CheckCircle, 
  Star,
  TrendingUp,
  Clock,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

function About() {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '50,000+', color: 'text-blue-600' },
    { icon: Award, label: 'Years Experience', value: '15+', color: 'text-green-600' },
    { icon: Shield, label: 'Policies Managed', value: '100,000+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Claims Processed', value: '25,000+', color: 'text-orange-600' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers at the center, ensuring their needs and satisfaction are our top priority.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and transparency to protect your personal information and investments.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you whenever you need help or guidance.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'We continuously innovate and improve our services using cutting-edge technology to serve you better.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=400',
      description: '15+ years in insurance industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      description: 'Technology innovation expert'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      description: 'Customer experience specialist'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#305399] to-[#253A66] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Shield className="text-white" size={48} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              About Think Big Insurance
            </h1>
            <div className="w-24 h-1 bg-white/60 rounded-full mx-auto mb-6"></div>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing insurance through innovation, technology, and exceptional customer service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className={`inline-flex p-3 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Content */}
            <motion.div
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-6">
                  Our Mission
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mb-6"></div>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  We are committed to revolutionizing the insurance industry through innovative technology
                  and exceptional customer service. Our platform makes it easier than ever to manage your
                  insurance needs efficiently and effectively.
                </p>
                
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  With years of experience in both insurance and technology, our team brings together
                  the expertise needed to deliver a seamless insurance management experience that puts
                  your peace of mind first.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center bg-green-50 p-4 rounded-xl border border-green-200">
                  <CheckCircle className="text-green-600 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm lg:text-base font-medium text-gray-700">Licensed & Regulated</span>
                </div>
                <div className="flex items-center bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <CheckCircle className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm lg:text-base font-medium text-gray-700">Award-Winning Service</span>
                </div>
                <div className="flex items-center bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <CheckCircle className="text-purple-600 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm lg:text-base font-medium text-gray-700">Secure & Trusted</span>
                </div>
                <div className="flex items-center bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <CheckCircle className="text-orange-600 mr-3 flex-shrink-0" size={20} />
                  <span className="text-sm lg:text-base font-medium text-gray-700">24/7 Support</span>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                  alt="Team collaboration at Think Big Insurance"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <Star className="text-yellow-400 mr-2" size={20} />
                    <span className="font-semibold">4.9/5 Rating</span>
                  </div>
                  <p className="text-sm opacity-90">Trusted by thousands of customers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mx-auto mb-4"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-6 lg:p-8 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                whileHover={{ y: -4 }}
              >
                <div className="bg-[#305399] p-4 rounded-full inline-flex mb-6">
                  <value.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Leadership Team
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mx-auto mb-4"></div>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg lg:text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm lg:text-base">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#305399] to-[#253A66] rounded-2xl p-8 lg:p-12 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 lg:mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their insurance needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <button className="bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center justify-center">
                <Phone className="mr-2" size={18} />
                Call Us Now
              </button>
              <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-bold hover:bg-white hover:text-[#305399] transition-all duration-200 flex items-center justify-center">
                <Mail className="mr-2" size={18} />
                Get Quote
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm lg:text-base text-blue-100">
              <div className="flex items-center">
                <MapPin className="mr-2" size={16} />
                Toronto, ON Canada
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" size={16} />
                1-800-THINK-BIG
              </div>
              <div className="flex items-center">
                <Mail className="mr-2" size={16} />
                hello@thinkbiginsurance.com
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default About;
