import React from 'react';
import { Link } from 'react-router-dom';

const BusinessInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#4c4b4b]">
      <h1 className="text-4xl font-bold text-center mb-8">Business Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Business Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Running a business involves numerous risks, from property damage to employee injuries, legal liabilities, and unexpected disruptions. Without business insurance, a single unexpected event could result in significant financial loss, potentially threatening the survival of your business. 
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Business insurance is designed to protect your assets, operations, and workforce from these risks. Whether you operate a small business or a large corporation, having the right coverage is crucial to ensuring that you’re prepared for whatever challenges may arise.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          With the right policy, you can safeguard your business from a variety of risks, including property damage, employee injuries, theft, lawsuits, and more. Business insurance can also provide peace of mind, knowing that if the unexpected happens, you’ll be covered.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Business Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Business insurance is a type of insurance policy that helps protect businesses from financial losses due to events such as property damage, theft, liability claims, and employee injuries. It includes various types of coverage depending on the nature and size of your business, including:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li><strong>General Liability Insurance:</strong> Protects against claims of bodily injury or property damage caused by your business operations.</li>
          <li><strong>Property Insurance:</strong> Covers damage or loss to your business property, including equipment, inventory, and buildings.</li>
          <li><strong>Workers' Compensation Insurance:</strong> Provides coverage for employees who are injured on the job and helps cover medical costs and lost wages.</li>
          <li><strong>Professional Liability Insurance:</strong> Protects your business from claims of negligence or malpractice in the services you provide.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Business insurance can be customized to fit the needs of your specific business, and many insurers offer bundled packages to help protect against multiple risks.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Business Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Do I need business insurance if I’m a small business owner?</h3>
          <p className="text-gray-700">
            Yes, regardless of your business size, business insurance is essential. Even small businesses face risks that could financially jeopardize their operations. Insurance helps protect you from lawsuits, property damage, and employee injuries, ensuring you stay afloat even in difficult circumstances.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How much does business insurance cost?</h3>
          <p className="text-gray-700">
            The cost of business insurance varies based on several factors, including the type of business, the size of your company, location, industry risks, and the coverage limits you choose. Small businesses may pay as little as $400 to $500 annually for a basic liability policy, while larger businesses may pay much more.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What types of coverage should I get for my business?</h3>
          <p className="text-gray-700">
            The types of coverage you need depend on the nature of your business. Common policies for most businesses include general liability, property insurance, workers' compensation, and professional liability insurance. If you operate in a specialized field, you may need additional coverage like cyber liability or commercial auto insurance.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How do I know if my business insurance is enough?</h3>
          <p className="text-gray-700">
            The right amount of coverage depends on the risks associated with your business. Consider factors such as the size of your operations, the value of your property, the number of employees, and the industry you’re in. A risk assessment with an insurance agent can help you determine if you need more coverage.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/business"
          className="inline-block bg-[#305399] text-white px-8 py-3 rounded-md hover:bg-[#305399] transition"
        >
          Get a Business Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default BusinessInsurance;
