import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#305399] text-white mt-12 py-12"> {/* Increased vertical padding */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12"> {/* Increased gap between sections */}
          <div>
            <h3 className="font-bold text-3xl mb-6">Insurance</h3> {/* Increased font size */}
            <ul className="space-y-4">
              <li><Link to="/insurance#auto" className="hover:text-orange-200 text-xl">Auto Insurance</Link></li> {/* Increased font size */}
              <li><Link to="/insurance#home" className="hover:text-orange-200 text-xl">Home Insurance</Link></li>
              <li><Link to="/insurance#business" className="hover:text-orange-200 text-xl">Business Insurance</Link></li>
              <li><Link to="/insurance#life" className="hover:text-orange-200 text-xl">Life Insurance</Link></li>
              <li><Link to="/insurance#travel" className="hover:text-orange-200 text-xl">Travel Insurance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-3xl mb-6">Company</h3> {/* Increased font size */}
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-orange-200 text-xl">About Us</Link></li>
              <li><Link to="/claims" className="hover:text-orange-200 text-xl">Claims</Link></li>
              <li><Link to="/brokers" className="hover:text-orange-200 text-xl">Brokers</Link></li>
              <li><Link to="/offices" className="hover:text-orange-200 text-xl">Offices</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-3xl mb-6">Resources</h3> {/* Increased font size */}
            <ul className="space-y-4">
              <li><Link to="/blog" className="hover:text-orange-200 text-xl">Blog</Link></li>
              <li><Link to="/news" className="hover:text-orange-200 text-xl">News</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-200 text-xl">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-orange-200 text-xl">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-3xl mb-6">Contact Us</h3> {/* Increased font size */}
            <p className="mb-6 text-xl">123 Insurance Ave<br />Toronto, ON M5V 2T6<br />Canada</p> {/* Increased font size */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-orange-200 text-2xl"><Facebook size={25} /></a> {/* Increased icon size */}
              <a href="#" className="hover:text-orange-200 text-2xl"><Twitter size={25} /></a> {/* Increased icon size */}
              <a href="#" className="hover:text-orange-200 text-2xl"><LinkedIn size={25} /></a> {/* Increased icon size */}
              <a href="#" className="hover:text-orange-200 text-2xl"><Instagram size={25} /></a> {/* Increased icon size */}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white mt-12 pt-8 text-center">
          <p className="text-2xl">&copy; {new Date().getFullYear()} Think Big Insurance. All rights reserved.</p> {/* Increased font size */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
