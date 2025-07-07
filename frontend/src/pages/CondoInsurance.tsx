import React from 'react';
import { Link } from 'react-router-dom';

const CondoInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Condominium Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Condo Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          While your condominium building may be covered by a master insurance policy through the condo association, that policy typically only protects the building’s structure and common areas — not the inside of your unit or your personal belongings. That’s where condo insurance comes in.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Condo insurance protects what the association doesn’t: your furniture, appliances, electronics, clothing, and any upgrades or renovations you've made to your unit (like flooring, kitchen cabinets, or fixtures). It also provides liability protection in case someone is injured in your condo or if you accidentally damage another unit.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Whether you're a first-time buyer or a seasoned condo owner, this coverage ensures that your home — and your peace of mind — are fully protected against life’s surprises, from fire and theft to water damage and legal claims.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Condo Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Condo insurance (also known as HO-6 insurance) is a type of homeowners insurance designed specifically for condominium owners. It fills in the gaps left by your condo association’s master policy. While the master policy generally covers common areas and the building exterior, condo insurance protects everything inside your unit.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          A standard condo insurance policy typically includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li><strong>Dwelling coverage</strong> for interior structures like walls, flooring, and fixtures</li>
          <li><strong>Personal property coverage</strong> for your belongings</li>
          <li><strong>Liability coverage</strong> in case someone is injured in your unit</li>
          <li><strong>Loss of use</strong> coverage if you need temporary housing due to a covered event</li>
          <li><strong>Loss assessment</strong> to help cover costs shared by unit owners if the building sustains damage</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Understanding your condo association's master policy is key — it determines what you need to insure personally. A good condo insurance policy helps ensure there are no coverage gaps and that you're financially protected no matter what.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Condo Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Isn't my building already insured?</h3>
          <p className="text-gray-700">
            Yes — your condo association’s master policy typically covers the building structure, roof, and shared areas like lobbies or hallways. However, it does not cover your personal belongings, any renovations you've made to your unit, or your personal liability. Condo insurance ensures those gaps are covered.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What if my condo floods or catches fire?</h3>
          <p className="text-gray-700">
            If the damage occurs inside your unit, such as a kitchen fire or a burst pipe, your condo insurance can help cover repairs, replacements, and even temporary living arrangements. Always check if water damage is covered and whether you need additional flood insurance depending on your location.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What’s the difference between condo and homeowners insurance?</h3>
          <p className="text-gray-700">
            Homeowners insurance covers the entire building structure and the land it sits on. Condo insurance, on the other hand, only covers the interior of your unit and your personal property. Since the building itself is jointly owned, the condo association’s master policy handles shared structural coverage.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How much condo insurance do I need?</h3>
          <p className="text-gray-700">
            The amount you need depends on your personal property value, any upgrades you’ve made, and the details of your condo association’s master policy. A good rule of thumb is to get enough dwelling coverage to rebuild the interior of your unit and enough personal property coverage to replace your belongings in case of a total loss.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/condo"
          className="inline-block bg-[#305399] text-white px-8 py-3 rounded-md hover:bg-[#305399] transition"
        >
          Get a Condo Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default CondoInsurance;
