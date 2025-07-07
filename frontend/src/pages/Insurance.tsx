import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home, Briefcase, Heart, Plane } from 'lucide-react';

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
}

function Insurance() {
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
      description:
        'Comprehensive coverage for your vehicles with competitive rates and excellent service.',
    },
    {
      id: 'home',
      icon: Home,
      title: 'Home Insurance',
      description:
        'Protect your home and belongings with our comprehensive home insurance policies.',
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Insurance',
      description:
        'Tailored insurance solutions to protect your business assets and operations.',
    },
    {
      id: 'life',
      icon: Heart,
      title: 'Life Insurance',
      description:
        "Secure your family's future with our range of life insurance products.",
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel Insurance',
      description:
        "Travel with peace of mind knowing you're protected wherever you go.",
    },
    {
      id: 'condo',
      icon: Home,
      title: 'Condominium Insurance',
      description:
        'Protect your condo unit and personal belongings from unexpected damage, theft, or liability.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h3 className="text-6xl lato-bold text-[#305399] mb-4 font-bold text-center">
        Insurance for Everything
      </h3>
      <h4 className="lato-thin text-center mb-16 text-xl text-gray-600">
        Explore the insurance products to get a quote.
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {insuranceTypes.map((type) => {
          const Icon = type.icon;
          const imageSrc = imageMap[type.id];

          return (
            <div
              key={type.id}
              id={type.id}
              className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-full max-w-md mx-auto"
            >
              <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={imageSrc}
                  alt={type.title}
                />
                <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                  <Icon className="text-white w-6 h-6" />
                </div>
              </div>

              <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                  {type.title}
                </h4>
                <p className="text-sm font-semibold text-slate-500 uppercase">
                  Insurance
                </p>
                <p className="text-base text-slate-600 mt-4 font-light">
                  {type.description}
                </p>
              </div>

              <div className="flex justify-center p-6 pt-2 gap-7">
                <Link
                  to={`/insurance/${type.id}`}
                  className="min-w-32 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 hover:bg-slate-700"
                >
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Insurance;
