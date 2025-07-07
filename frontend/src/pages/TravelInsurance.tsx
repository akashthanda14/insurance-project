import React from 'react';
import { Link } from 'react-router-dom';

const TravelInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Travel Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Travel Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Whether you're planning a dream vacation, a business trip, or visiting family abroad, travel insurance gives you financial protection and peace of mind every step of the way. From unexpected medical emergencies to trip cancellations or lost luggage, travel insurance helps you recover costs and stay protected from the many uncertainties that can arise while you're away from home.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Traveling without insurance means taking a risk that could turn a simple mishap into a financial crisis — especially if you're in a country where medical costs are high. A single emergency room visit or evacuation could cost thousands of dollars. Travel insurance ensures you’re not caught off guard by surprise expenses.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          With the right coverage, you can explore confidently knowing that your health, belongings, and travel plans are protected. It’s a small investment that makes a big difference when the unexpected happens.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Travel Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Travel insurance is a policy that offers financial protection against travel-related losses and disruptions. It typically includes coverage for medical emergencies, trip cancellations, flight delays, lost baggage, and other travel mishaps. Whether you’re traveling domestically or internationally, having travel insurance gives you the support you need in unpredictable situations.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Most policies allow you to customize your coverage depending on your destination, length of stay, and planned activities. For example, if you're going skiing or hiking, you can include adventure sports coverage. If you're traveling with expensive electronics, you might want additional baggage protection.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Many travel insurance policies also include access to 24/7 emergency assistance services, helping you locate hospitals, translate foreign documents, or make travel arrangements during an emergency.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Travel Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Is travel insurance mandatory?</h3>
          <p className="text-gray-700">
            Travel insurance is not always mandatory, but many countries now require proof of travel health insurance for entry, especially during or after global health concerns. Even if it's not required, it's strongly recommended, as your regular health plan likely won’t cover medical expenses abroad. Travel insurance protects your health and your wallet in case of emergencies.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What does travel insurance cover?</h3>
          <p className="text-gray-700">
            Coverage depends on the policy, but most travel insurance plans include medical expense coverage, emergency evacuation, trip cancellation or interruption, lost or delayed baggage, and accidental death. Some plans also offer travel delay reimbursement, missed connection coverage, and rental car protection. You can often tailor the policy to fit your travel needs and budget.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ When should I buy travel insurance?</h3>
          <p className="text-gray-700">
            It’s best to purchase travel insurance soon after booking your trip. This allows you to take full advantage of coverage, especially for trip cancellation or interruption. Some policies have time-sensitive benefits — like covering pre-existing conditions or allowing for a “cancel for any reason” upgrade — that are only available if purchased within a certain number of days after your initial trip deposit.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What if I need to make a claim while traveling?</h3>
          <p className="text-gray-700">
            If something goes wrong during your trip, contact your insurance provider as soon as possible. Most insurers offer 24/7 assistance hotlines. Be sure to keep all receipts, reports (like police or hospital documents), and proof of delay or cancellation. These documents will help support your claim and speed up the reimbursement process. Many providers also offer mobile apps for easy claims submission.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/travel"
          className="inline-block bg-[#305399] text-white px-8 py-3 rounded-md hover:bg-[#305399] transition"
        >
          Get a Travel Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default TravelInsurance;
