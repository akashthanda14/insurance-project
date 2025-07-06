import React from 'react';
import { Link } from 'react-router-dom';

const HomeInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Home Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Home Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Your home is one of the most significant investments you'll ever make, and protecting it should be a top priority. Home insurance is essential because it shields you from financial loss caused by unexpected events like fire, theft, natural disasters, and personal liability claims. While it may not be legally required in all areas, most mortgage lenders will mandate it to secure your loan.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Accidents and disasters can strike when you least expect them — a burst pipe, a windstorm, or even a break-in. Home insurance helps cover the cost of repairs or rebuilding your property, replacing your belongings, and even paying for temporary housing if your home becomes uninhabitable. Additionally, it offers liability protection in case someone is injured on your property and decides to take legal action.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Peace of mind is priceless, and home insurance gives you just that. Knowing that your home, your possessions, and your future are protected allows you to live confidently and securely — no matter what life throws your way.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Home Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Home insurance is a contract between you and an insurance provider that offers financial protection against damages or losses related to your property. This includes your physical home structure, personal belongings inside the house, and liability coverage for injuries or damages to others that occur on your property.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          A standard home insurance policy typically covers damage from fire, storms, theft, vandalism, and some natural disasters. It also includes liability coverage, which helps with legal costs and settlements if someone is injured on your property. Additional options like flood insurance, earthquake protection, and extended personal property coverage can be added based on your location and needs.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Your home is more than just a building — it's where memories are made, and families grow. Home insurance protects both your financial investment and your peace of mind. The right policy ensures that when the unexpected happens, you won't be left to deal with the aftermath alone.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Home Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Is home insurance required by law?</h3>
          <p className="text-gray-700">
            Home insurance isn't always legally required, but it is often mandatory if you're financing your home through a mortgage lender. Lenders require coverage to protect their investment in case of damage. Even if you own your home outright, insurance is highly recommended to avoid major out-of-pocket costs after an incident.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What does a standard policy cover?</h3>
          <p className="text-gray-700">
            A standard home insurance policy typically includes coverage for the structure of your home, personal belongings, liability protection, and additional living expenses (if you're forced to move out temporarily due to a covered event). Some policies may also cover detached structures like garages or sheds. Always review your policy to understand the inclusions and limitations.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How is my premium determined?</h3>
          <p className="text-gray-700">
            Premiums are based on several factors such as the value and age of your home, location, construction type, past claims, and selected coverage amounts. Homes in high-risk areas for floods, wildfires, or crime may have higher premiums. Discounts may apply if you have security systems, smoke detectors, or bundle multiple insurance products.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What should I do after property damage?</h3>
          <p className="text-gray-700">
            First, ensure everyone is safe and, if needed, contact emergency services. Then, document the damage with photos or video, and make temporary repairs to prevent further damage if it’s safe to do so. Notify your insurance provider immediately and file a claim. An adjuster will be assigned to assess the damage and guide you through the next steps.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/home"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Get a Home Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default HomeInsurance;
