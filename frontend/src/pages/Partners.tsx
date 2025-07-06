import React from 'react';
import { Shield } from 'lucide-react';

function Partners() {
  const partners = [
    {
      name: 'Global Insurance Co.',
      description: 'Leading provider of comprehensive insurance solutions',
      specialty: 'Auto & Home Insurance',
    },
    {
      name: 'SecureLife Insurance',
      description: 'Specialists in life and health insurance coverage',
      specialty: 'Life & Health Insurance',
    },
    {
      name: 'Business Shield',
      description: 'Expert commercial insurance solutions',
      specialty: 'Business Insurance',
    },
    {
      name: 'TravelSafe Insurance',
      description: 'Worldwide travel coverage and assistance',
      specialty: 'Travel Insurance',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h1>
        <p className="text-xl text-gray-600">
          We work with leading insurance providers to offer you the best coverage options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-8 flex items-start space-x-6"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{partner.name}</h2>
              <p className="text-gray-600 mb-3">{partner.description}</p>
              <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                {partner.specialty}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-8">
          Want to become a partner? We're always looking to expand our network of trusted insurance providers.
        </p>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors">
          Partner With Us
        </button>
      </div>
    </div>
  );
}

export default Partners;