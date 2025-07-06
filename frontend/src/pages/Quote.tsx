import React from 'react';
import {
  Car,
  Home,
  HeartPulse,
  Briefcase,
  Globe,
  UserRound,
  Building2,
  Building,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';

const insuranceTypes = [
  { name: 'Auto Insurance', icon: Car },
  { name: 'Home Insurance', icon: Home },
  { name: 'Condo Insurance', icon: Building },
  { name: 'Tenants Insurance', icon: Building2 },
  { name: 'Health Insurance', icon: HeartPulse },
  { name: 'Life Insurance', icon: UserRound },
  { name: 'Business Insurance', icon: Briefcase },
  { name: 'Travel Insurance', icon: Globe },
  { name: 'Other', icon: ShieldCheck }
];

const InsuranceSelection = () => {
  const handleSelect = (type: string) => {
    console.log(`Selected: ${type}`);
    // You can redirect or open modal here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        <span className="text-orange-500">Choose</span> Your Insurance Type
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {insuranceTypes.map(({ name, icon: Icon }) => (
          <div
            key={name}
            onClick={() => handleSelect(name)}
            className="flex flex-col items-center justify-center bg-white border border-orange-100 hover:border-orange-400 hover:shadow-md transition-all duration-300 rounded-2xl p-6 cursor-pointer group"
          >
            <Icon className="w-14 h-14 text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
            <p className="text-base font-medium text-gray-800 group-hover:text-orange-600 text-center">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceSelection;
