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

function Insurance() {
  // Map each insurance type ID to its image
  const imageMap: Record<string, string> = {
    auto: autoImg,
    home: homeImg,
    business: businessImg,
    life: lifeImg,
    travel: travelImg,
    condo: condoImg,
    tenants: homeImg, // Assuming tenants insurance uses the same image as home insurance, you can change it
  };

  const insuranceTypes = [
    {
      id: 'auto',
      icon: Car,
      title: 'Auto Insurance',
      description: 'Comprehensive coverage for your vehicles with competitive rates and excellent service.',
    },
    {
      id: 'home',
      icon: Home,
      title: 'Home Insurance',
      description: 'Protect your home and belongings with our comprehensive home insurance policies.',
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Insurance',
      description: 'Tailored insurance solutions to protect your business assets and operations.',
    },
    {
      id: 'life',
      icon: Heart,
      title: 'Life Insurance',
      description: "Secure your family's future with our range of life insurance products.",
    },
    {
      id: 'travel',
      icon: Plane,
      title: 'Travel Insurance',
      description: "Travel with peace of mind knowing you're protected wherever you go.",
    },
    {
      id: 'condo',
      icon: Home,
      title: 'Condominium Insurance',
      description: 'Protect your condo unit and personal belongings from unexpected damage, theft, or liability.',
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h3 className="text-6xl lato-bold text-orange-500 mb-4 font-bold text-center">
        Insurance for Everything
      </h3>
      <h4 className='lato-thin text-center mb-16 text-xl text-gray-600'>
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
              className="group bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                         transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={imageSrc}
                  alt={type.title}
                  className="object-cover w-full h-full transition-transform duration-300 
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 
                              group-hover:bg-black/40" />
                <Icon className="absolute top-4 right-4 w-8 h-8 text-white" />
              </div>
              
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 
                             transition-colors duration-300 group-hover:text-orange-500">
                  {type.title}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px]">
                  {type.description}
                </p>
                <div className="text-center">
                  <Link
                    to={`/insurance/${type.id}`}
                    className="inline-block bg-orange-500 text-white px-8 py-3 
                             transition-all duration-300 hover:bg-orange-600 
                             hover:shadow-lg hover:-translate-y-0.5 
                             uppercase text-sm tracking-wider font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Insurance;