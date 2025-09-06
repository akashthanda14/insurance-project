import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, Car, Home, Briefcase, Heart, Plane, Shield, FileText, Users, Building2, MessageSquare, Headphones, Clock, Award, BookOpen, Wallet, LifeBuoy, HelpCircle, Settings, FileQuestion, Calculator } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

const navItems = {
  insurance: {
    title: 'Insurance',
    items: [
      { icon:Shield, label: 'All Insurance', link: '/insurance' },
      { icon:Heart, label: 'Life Insurance', link: '/lifeinfo' },
      { icon:Plane, label: 'Travel Insurance', link: '/travelinsuranceinfo' },
      { icon:Home, label: 'Health & Dental', link: '/healthDentalinfo' },
    ]
  },
  company: {
    title: 'Company',
    items: [
      { icon:Shield, label: 'About Us', link: '/about' },
      { icon:MessageSquare, label: 'Contact', link: '/contact' },
    ]
  },
  resources: {
    title: 'Resources',
    items: [
      { icon:Calculator, label: 'Premium Option 1', link: '/PremiumOptions' },
      { icon:Calculator, label: 'Premium Option 2', link: '/PremiumOptions2' },
      { icon:BookOpen, label: 'Quote Form', link: '/Quoteform' },
      { icon:FileText, label: 'Applicant Form', link: '/Applicantform' },
      { icon:Briefcase, label: 'Investments', link: '/Investment' },
    ]
  }
};


  return (
    <nav className="w-full font-['Montserrat'] text-xl">
      {/* Top bar - fully transparent on home page */}
      <div className={`${isHomePage ? 'bg-transparent' : 'bg-gray-800'} text-white py-2`}>
        <div className="container mx-auto px-4 flex justify-end items-center">
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <a href="tel:+16476162106" className="drop-shadow-lg text-inherit hover:underline focus:outline-none">
  +1 64-761-621-06
</a>

          </div>
        </div>
      </div>
      
      {/* Main navigation - fully transparent on home page */}
      <div className={`${isHomePage ? 'bg-transparent' : 'bg-white'} relative`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
        {/* Logo - white text on home page */}
        <Link to="/" className={`text-2xl font-bold ${isHomePage ? 'text-white drop-shadow-lg' : 'text-[#305399]'}`}>
          <img src="src/assets/logo-resize.png" alt="Logo" className="h-12 w-12 md:h-14 md:w-14" />
        </Link>
        
            {/* Mobile menu button - white on home page */}
            <button
              className={`md:hidden p-2 ${isHomePage ? 'text-white' : 'text-[#305399]'}`}
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
                  <button className={`flex items-center py-2 font-medium transition-colors duration-200 ${
                    isHomePage 
                      ? 'text-white hover:text-gray-200 drop-shadow-lg' 
                      : 'text-gray-700 hover:text-[#305399]'
                  }`}>
                    {menu.title}
                    <ChevronDown size={16} className={`ml-1 transform transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-md py-2 z-50 border border-gray-100">
                      {menu.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-[#305399] transition-colors duration-200"
                        >
                          <item.icon size={18} className="mr-2" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Client Login Button - same color on home page */}
              <Link to="/policyPurchase" className="bg-[#305399] text-white px-6 py-2 rounded-md hover:bg-[#253A66] transition-colors duration-200 font-medium shadow-lg">
                Purchase Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile menu - improved responsiveness */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto z-[60]`}
        >
          {/* Mobile menu header */}
          <div className="p-4 border-b border-gray-200 bg-[#305399] text-white">
            <button
              className="p-2 float-right text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
            <Link to="/" className="text-xl font-bold block py-2" onClick={() => setIsOpen(false)}>
              INVESTOR INSURANCE
            </Link>
          </div>
          
          {/* Mobile menu items */}
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
            {Object.entries(navItems).map(([key, menu]) => (
              <div key={key} className="border-b border-gray-100">
                <button
                  className="flex items-center justify-between w-full text-gray-700 py-4 px-4 font-medium hover:bg-gray-50"
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
                
                {/* Mobile dropdown items */}
                {activeDropdown === key && (
                  <div className="bg-gray-50">
                    {menu.items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="flex items-center py-3 px-8 text-gray-600 hover:text-[#305399] hover:bg-white transition-colors duration-200 border-l-4 border-transparent hover:border-[#305399]"
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        <item.icon size={18} className="mr-3" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile login button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <Link
              to="/policyPurchase"
              className="block bg-[#305399] text-white text-center px-4 py-3 rounded-md hover:bg-[#253A66] transition-colors duration-200 font-medium shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Purchase Now
            </Link>
          </div>
        </div>
        
        {/* Overlay for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
