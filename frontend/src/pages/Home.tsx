import React from 'react';
import { ArrowRight, Contact, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InfiniteMovingCards } from '../components/InfiniteMovingCards';
import MapComponent from '../components/MapComponent';
import Teams from './Team';
import Insurance from './Insurance';
import Info from '../components/Info';
import InvestmentProducts from '../components/Investment';
import ContactForm from '../components/ContactUs';
import { InsuranceOptions } from '../components/SelectInsurance';

const Home = () => {
  return (
    <>
      {/* Hero Section with Responsive Background Images */}
      <div 
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dmt4dj8ft/image/upload/v1751907296/Pokecut_1751907266056_dkeky6.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* Desktop Background Image Override */}
        <div 
          className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmt4dj8ft/image/upload/v1751906950/family-home_1_w6roxi.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        {/* Centered Content */}
        <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase mb-4 md:mb-6 drop-shadow-lg">
              Protect What
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl lato-thin mb-6 md:mb-8 text-white drop-shadow-lg">
              Matters Most.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/InsuranceOptions"
                className="inline-flex uppercase lato-bold items-center bg-[#305399] text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold hover:bg-[#253A66] transition-all duration-300 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto min-w-[200px] justify-center"
              >
                Start Your Quote
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/SavingsRetirementCalculators"
                className="inline-flex uppercase lato-bold items-center bg-[#28a745] text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold hover:bg-[#218838] transition-all duration-300 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto min-w-[200px] justify-center"
              >
                Savings Calculator
                <Calculator className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your content */}
      <div className="bg-white">
        <h2 className="md:text-5xl text-4xl lato-bold text-[#4c4b4b] text-center m-24">
          Our trusted Insurance partners.
        </h2>
        
         <InfiniteMovingCards
          items={[
            "https://www.thebig.ca/shared/media/partners/43/58f674b1-ffc6-46f2-b4c6-c346ae732b22.webp",
            "https://www.thebig.ca/shared/media/partners/48/ffd646e7-1c71-4693-a6e9-213c21158aea.webp",
            "https://www.thebig.ca/shared/media/partners/47/71142fd1-5bff-4e13-9147-b659ee598f4f.webp",
            "https://www.thebig.ca/shared/media/partners/65/b024d619-8d09-41a1-b4a6-9a6a51eb73d6.webp",
            "https://www.thebig.ca/shared/media/partners/60/7d3bd5e6-ae11-4a83-a251-5a4538f0068e.webp",
            "https://www.thebig.ca/shared/media/partners/56/3dace7ca-7a30-41af-bc3e-89fb1cd9a95e.webp",
            "https://www.thebig.ca/shared/media/partners/34/ecbdfdf4-bc95-40e4-afc0-6897bc24b8ca.webp",
            "https://www.thebig.ca/shared/media/partners/31/668ef1ec-bf7c-4e55-80d2-e8bc7fe5f601.webp",
            "https://www.thebig.ca/shared/media/partners/36/c94d0c27-5901-4f87-8096-934e031b2726.webp",
            "https://www.thebig.ca/shared/media/partners/72/ab29fb78-303d-477b-a5d6-7da01f805d18.webp",
          ]}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
        
        <Info />
        <Insurance />
        <InvestmentProducts/>
        <Teams />
        <MapComponent />
        <ContactForm/>
        
      </div>
    </>
  );
};

export default Home;
