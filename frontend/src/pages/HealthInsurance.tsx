import React from 'react';
import { Link } from 'react-router-dom';

const HealthInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Health Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Health Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Health insurance is one of the most important forms of protection you can have. Medical care is expensive, and even a single unexpected illness or emergency can lead to overwhelming bills. Health insurance provides financial coverage for doctor visits, hospital stays, prescription medications, diagnostic tests, surgeries, and preventive care.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Whether you're young and healthy or managing ongoing medical conditions, having a health insurance plan ensures that you can access the care you need without worrying about the cost. It also encourages regular checkups and preventive services, helping detect and manage health issues early before they become serious — or more costly to treat.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          In many regions, health insurance is either required by law or strongly incentivized with tax credits. More importantly, it provides peace of mind for you and your family, knowing you're covered when life takes an unexpected turn.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Health Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Health insurance is a contract between you and an insurer that helps pay for medical expenses. It works by covering a portion of your healthcare costs in exchange for a monthly premium. Depending on your policy, it can cover routine visits, emergency care, surgery, specialist services, and even alternative treatments.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Most health insurance plans have a network of doctors and hospitals. When you visit in-network providers, you benefit from lower negotiated rates. Plans typically include features such as deductibles (the amount you pay before insurance kicks in), co-pays (a set fee for visits or prescriptions), and out-of-pocket maximums that cap your total annual costs.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Health insurance isn't just a safety net for serious illness — it's also a tool for wellness and preventive care. Many plans cover regular screenings, vaccines, mental health services, and maternity care, giving you comprehensive support at every stage of life.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Health Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Is health insurance mandatory?</h3>
          <p className="text-gray-700">
            In many countries, health insurance is required either by law or as a condition of accessing public services. Even where it's not legally required, going without health coverage can be a major risk. Medical emergencies, surgeries, and long-term care are extremely costly without insurance, making even routine health needs unaffordable for many.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What does a typical policy cover?</h3>
          <p className="text-gray-700">
            A standard health insurance policy covers doctor visits, hospital stays, emergency services, surgery, lab tests, prescriptions, mental health care, and preventive services like vaccines and checkups. Some plans also include dental, vision, maternity, and rehabilitation. The exact benefits depend on your provider, your location, and the plan you choose.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How much does health insurance cost?</h3>
          <p className="text-gray-700">
            Costs vary widely based on your age, location, plan type, and whether you're applying individually or through an employer. You'll typically pay a monthly premium, plus other costs like deductibles, co-pays, or coinsurance. Some countries or provinces offer public plans or subsidies to make coverage more affordable for individuals and families.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Can I keep my plan if I move or change jobs?</h3>
          <p className="text-gray-700">
            If you’re covered through your employer, your plan may end when you change jobs. However, some providers offer portability options, or you can switch to an individual or government-backed plan. If you’re self-employed or relocating, it's important to explore your new region’s health insurance requirements and coverage options to ensure continued protection.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/health"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Get a Health Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default HealthInsurance;
