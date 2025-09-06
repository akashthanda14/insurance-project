import React from "react";

const products = [
  {
    id: "rrsp",
    name: "RRSP",
    image: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752041474/RRSP_xw5zyy.jpg",
    description: "Save for retirement with tax advantages and flexible investment options.",
  },
  {
    id: "resp",
    name: "RESP",
    image: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752041473/RESP_rdrjkg.jpg",
    description: "Invest in your child’s education and benefit from government grants.",
  },
  {
    id: "tfsa",
    name: "TFSA",
    image: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752041474/TFSA_o5h3ey.jpg",
    description: "Grow your savings tax-free and access your funds anytime.",
  },
  {
    id: "fhsa",
    name: "FHSA",
    image: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752041472/FHSA_nghcsj.jpg",
    description: "First Home Savings Account with tax-free withdrawals for your future home.",
  },
  {
    id: "segfunds",
    name: "Segregated Funds",
    image: "https://res.cloudinary.com/dmt4dj8ft/image/upload/v1752041474/Segregated_Funds_rrgfzv.jpg",
    description: "Investments with insurance protection and potential creditor protection.",
  },
];

const InvestmentProducts: React.FC = () => (
  <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Montserrat']">
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      {/* Header */}
      <header className="text-center mb-10 lg:mb-16">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#305399] p-4 rounded-full mb-4 shadow-lg">
            <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#305399] leading-tight">
            Investment Products
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full mt-4"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          Grow your wealth with trusted Canadian solutions.
        </p>
      </header>

      {/* Product Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                draggable="false"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-[#305399] mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 flex-1">{product.description}</p>
              <button className="bg-[#305399] text-white py-2 px-6 rounded-xl font-semibold hover:bg-[#253A66] transition-all duration-200 shadow-md">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="mt-12 lg:mt-16 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-2xl p-8 lg:p-12 text-white text-center">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Need Guidance Choosing Your Investment?
        </h2>
        <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Our advisors can help you select the right product for your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href="tel:+16476162106"
            className="bg-white text-[#305399] py-3 px-8 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-lg block text-center"
          >
            Speak to an Advisor
          </a>
          <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-xl font-bold hover:bg-white hover:text-[#305399] transition-all duration-200">
            Compare Products
          </button>
        </div>
      </section>
    </div>
  </main>
);

export default InvestmentProducts;
