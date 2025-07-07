import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InfiniteMovingCards } from '../components/InfiniteMovingCards';
import MapComponent from '../components/MapComponent';
import Teams from './Team';
import Insurance from './Insurance';
import Info from '../components/Info';
// Remove: import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/family-home.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'
        }}
      >
        {/* Remove the entire navbar div block */}
        
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
            <div className="mt-8">
              <Link
                to="/PremiumOptions"
                className="inline-flex uppercase lato-bold items-center bg-[#305399] text-white px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold hover:bg-[#253A66] transition-colors duration-300 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Quote
                <ArrowRight className="ml-2" size={20} />
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
        <Teams />
        <MapComponent />
      </div>
    </>
  );
};

export default Home;
