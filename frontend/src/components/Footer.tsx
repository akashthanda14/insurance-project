import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#305399] text-white mt-12 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Insurance Section */}
          <div>
            <h3 className="font-bold text-3xl mb-6">Insurance</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/insurance" className="hover:text-orange-200 text-xl">All Insurance</Link>
              </li>
              <li>
                <Link to="/lifeinfo" className="hover:text-orange-200 text-xl">Life Insurance</Link>
              </li>
              <li>
                <Link to="/travelinsuranceinfo" className="hover:text-orange-200 text-xl">Travel Insurance</Link>
              </li>
              <li>
                <Link to="/healthDentalinfo" className="hover:text-orange-200 text-xl">Health & Dental</Link>
              </li>
            </ul>
          </div>
          
          {/* Company Section */}
          <div>
            <h3 className="font-bold text-3xl mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="hover:text-orange-200 text-xl">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-200 text-xl">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources Section */}
          <div>
            <h3 className="font-bold text-3xl mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/PremiumOptions" className="hover:text-orange-200 text-xl">Premium Option 1</Link>
              </li>
              <li>
                <Link to="/PremiumOptions2" className="hover:text-orange-200 text-xl">Premium Option 2</Link>
              </li>
              <li>
                <Link to="/Quoteform" className="hover:text-orange-200 text-xl">Quote Form</Link>
              </li>
              <li>
                <Link to="/Applicantform" className="hover:text-orange-200 text-xl">Applicant Form</Link>
              </li>
              <li>
                <Link to="/Investment" className="hover:text-orange-200 text-xl">Investments</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-3xl mb-6">Contact Us</h3>
            <p className="mb-6 text-xl">
              Mississauga, Ontario, Canada<br />
              Area of Operation: All over Canada
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-orange-200 text-2xl" aria-label="Facebook">
                <Facebook size={25} />
              </a>
              <a href="#" className="hover:text-orange-200 text-2xl" aria-label="Twitter">
                <Twitter size={25} />
              </a>
              <a href="#" className="hover:text-orange-200 text-2xl" aria-label="LinkedIn">
                <LinkedIn size={25} />
              </a>
              <a href="#" className="hover:text-orange-200 text-2xl" aria-label="Instagram">
                <Instagram size={25} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white mt-12 pt-8 text-center">
          <p className="text-2xl">&copy; {new Date().getFullYear()} INVESTOR INSURANCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
