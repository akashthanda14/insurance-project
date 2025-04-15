import React from 'react';
import { Link } from 'react-router-dom';

const TenantsInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Tenants Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Tenants Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Many renters assume their landlord's insurance covers them — but that's not the case. While landlords insure the building structure, their policy won’t protect your personal belongings or cover your liability. That's where tenants insurance comes in. It provides essential protection for your furniture, electronics, clothing, and more.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Whether it’s fire, theft, water damage, or even a guest getting injured in your unit, tenants insurance helps you stay financially secure in unpredictable situations. It also offers coverage for temporary housing if your rental becomes uninhabitable due to a covered loss.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Even if you don’t own much, replacing your essentials can be expensive. Tenants insurance is an affordable way to protect what you own and give you peace of mind every day you live in your rental.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Tenants Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Tenants insurance, also known as renter’s insurance, is a policy designed specifically for people who rent their homes. It protects your personal belongings from risks like fire, theft, vandalism, and water damage — and it goes further by covering your liability if someone is injured in your rental or if you accidentally cause damage to another unit.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          A typical policy includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li><strong>Personal property coverage</strong> for items like furniture, electronics, and clothes</li>
          <li><strong>Liability protection</strong> in case you're legally responsible for injury or damage</li>
          <li><strong>Additional living expenses</strong> to help with costs if you’re temporarily displaced</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          It’s easy to get and surprisingly affordable — making it one of the smartest decisions any tenant can make.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Tenants Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Isn’t my landlord’s insurance enough?</h3>
          <p className="text-gray-700">
            No — your landlord’s insurance only covers the physical building, not your personal belongings or any liability you might face. If your laptop, clothing, or furniture is damaged or stolen, tenants insurance is what helps you recover.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What does tenants insurance cost?</h3>
          <p className="text-gray-700">
            It’s one of the most affordable insurance options. Premiums can start as low as $15–$25 per month depending on your coverage amount, location, and provider. For a relatively low cost, you get thousands of dollars in protection.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What types of things are covered?</h3>
          <p className="text-gray-700">
            Tenants insurance covers personal items like furniture, electronics, kitchenware, decor, and even your bicycle or laptop — both inside and outside your home. It also covers hotel costs if you’re displaced, and legal fees if you’re sued due to an accident on your rental property.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Do I need tenants insurance if I live with roommates?</h3>
          <p className="text-gray-700">
            Yes — but your policy only covers *your* belongings unless your roommates are specifically listed. Each roommate should have their own renters insurance policy unless your provider allows shared policies (and you agree on limits and responsibilities).
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/tenants"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Get a Tenants Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default TenantsInsurance;
