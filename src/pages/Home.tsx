import React from 'react';
import { ArrowRight} from 'lucide-react';
import { Link } from 'react-router-dom';
import { InfiniteMovingCards } from '../components/InfiniteMovingCards';
import MapComponent from '../components/MapComponent';
import Teams from './Team';
import Insurance from './Insurance';
import Info from '../components/Info'
const Home = () => {
  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <img
            src="src/assets/7197921.jpg"
            alt="Professional insurance consultation"
            className=""
          />
        </div>
        
        <div className="w-full md:w-1/2 text-center flex flex-col gap-4 md:gap-6 lg:gap-8">
          <h1 className="text-4xl md:text-7xl font-black text-[#ff735c] uppercase">
          Protect What 
          </h1>

          <h2 className='md:text-4xl text-2xl lato-thin' >Matters Most.</h2>
          <div>
          <Link
            to="/InsuranceSelection"
            className="inline-flex uppercase lato-bold  items-center bg-[#ff735c] text-white px-12 py-4  text-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Start Your Quote
            <ArrowRight className="ml-2" size={20} />
          </Link>

          </div>
          
        </div>
      </div>
    </div>
    
    <h2  className='md:text-5xl text-4xl lato-bold text-[#4c4b4b] text-center m-24'>Our trusted Insurance partners.</h2>
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
        direction="left" // Scroll direction can be "left" or "right"
        speed="normal" // Speed can be "fast", "normal", or "slow"
        pauseOnHover={true} // Pause the scroll on hover
      />
      <Info/>
      <Insurance/>
      

      <Teams/>
      <MapComponent/>
    
      

    </>
  );
};

export default Home;