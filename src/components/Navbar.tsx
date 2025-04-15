import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, Car, Home, Briefcase, Heart, Plane, Shield, FileText, Users, Building2, MessageSquare, Headphones, Clock, Award, BookOpen, Wallet, LifeBuoy, HelpCircle, Settings, FileQuestion, Calculator } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navItems = {
    insurance: {
      title: 'Insurance',
      items: [
        { icon: Car, label: 'Auto Insurance', link: '/insurance#auto' },
        { icon: Home, label: 'Home Insurance', link: '/insurance#home' },
        { icon: Briefcase, label: 'Business Insurance', link: '/insurance#business' },
        { icon: Heart, label: 'Life Insurance', link: '/insurance#life' },
        { icon: Plane, label: 'Travel Insurance', link: '/insurance#travel' },
      ]
    },
    company: {
      title: 'Company',
      items: [
        { icon: Shield, label: 'About Us', link: '/about' },
        { icon: FileText, label: 'Claims', link: '/claims' },
        { icon: Users, label: 'Our Team', link: '/team' },
        { icon: Building2, label: 'Offices', link: '/offices' },
        { icon: MessageSquare, label: 'Contact', link: '/contact' },
      ]
    },
    resources: {
      title: 'Resources',
      items: [
        { icon: Calculator, label: 'Insurance Calculator', link: '/calculator' },
        { icon: BookOpen, label: 'Learning Center', link: '/learning' },
        { icon: FileQuestion, label: 'FAQ', link: '/faq' },
        { icon: Award, label: 'Insurance Guides', link: '/guides' },
        { icon: Clock, label: 'Claims Process', link: '/claims-process' },
      ]
    },
    support: {
      title: 'Support',
      items: [
        { icon: Headphones, label: '24/7 Support', link: '/support' },
        { icon: LifeBuoy, label: 'Emergency Help', link: '/emergency' },
        { icon: HelpCircle, label: 'Help Center', link: '/help' },
        { icon: Wallet, label: 'Billing', link: '/billing' },
        { icon: Settings, label: 'Account Settings', link: '/settings' },
      ]
    }
  };

  return (
    <nav className="w-full font-['Montserrat'] text-xl">
      {/* Top bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-end items-center">
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span>1-800-THINK-BIG</span>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-white shadow-md relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Think Big Insurance
            </Link>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6 items-center">
              {Object.entries(navItems).map(([key, menu]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => toggleDropdown(key)}
                  onMouseLeave={() => toggleDropdown(key)}
                >
                  <button className="flex items-center text-gray-600 hover:text-orange-500 py-2">
                    {menu.title}
                    <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                      {menu.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="flex items-center px-4 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200"
                        >
                          <item.icon size={18} className="mr-2" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Link to="/dashboard" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200">
                Client Login
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto z-50`}
        >
          <div className="p-4 border-b border-gray-200">
            <button
              className="p-2 float-right"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <Link to="/" className="text-xl font-bold text-[#ff735c] block py-2">
              Think Big Insurance
            </Link>
          </div>
          
          {Object.entries(navItems).map(([key, menu]) => (
            <div key={key} className="px-4 py-2 border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-gray-600 py-2"
                onClick={() => toggleDropdown(key)}
              >
                {menu.title}
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    activeDropdown === key ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {activeDropdown === key && (
                <div className="pl-4">
                  {menu.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.link}
                      className="flex items-center py-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon size={18} className="mr-2" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="px-4 py-4">
            <Link
              to="/dashboard"
              className="block bg-orange-500 text-white text-center px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Client Login
            </Link>
          </div>
        </div>
        
        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;