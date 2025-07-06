import React from 'react';
import { Link } from 'react-router-dom';

const LifeInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#ff735c]">
      <h1 className="text-4xl font-bold text-center mb-8">Life Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Life Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Life insurance provides financial protection for your loved ones in case of your unexpected passing. It helps cover funeral expenses, outstanding debts, and ensures your family can maintain their standard of living without financial hardship. Without life insurance, your family may struggle to cope with the financial burden during an already difficult time.
          <br />
          Life insurance acts as a financial safety net, providing peace of mind knowing that your loved ones will have financial security even when you're not there. It also helps you leave a legacy, whether by supporting your children's education, paying off a mortgage, or covering other future expenses.
          <br />
          Whether you’re just starting a family, buying a home, or thinking about retirement, life insurance is an essential tool to ensure financial stability for your dependents. It’s never too early to secure your family’s future.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Life Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
          Life insurance is a contract between you and an insurance company, where you pay premiums in exchange for a death benefit to be paid to your beneficiaries when you pass away. It’s designed to help your family cover expenses such as funeral costs, living expenses, debt, and any other financial needs that may arise after your death.
          <br />
          There are two main types of life insurance: <strong>Term life insurance</strong> and <strong>Whole life insurance</strong>.
          <br />
          <strong>Term life insurance</strong> offers coverage for a specified period (e.g., 10, 20, or 30 years). It's often the most affordable option, and it provides a death benefit if the insured passes away within the term.
          <br />
          <strong>Whole life insurance</strong> offers coverage for your entire lifetime, as long as premiums are paid. In addition to a death benefit, it can also build cash value over time that you can borrow against or withdraw.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Common Questions About Life Insurance</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Is life insurance necessary?</h3>
          <p className="text-gray-700">
            Life insurance is essential if you have dependents who rely on your income. It ensures that your family or loved ones won’t be burdened by financial stress if something happens to you.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ What type of life insurance is best for me?</h3>
          <p className="text-gray-700">
            The best type of life insurance depends on your financial situation, goals, and the needs of your dependents. Term life insurance is great if you need coverage for a specific period, while whole life insurance is ideal if you want lifelong coverage and the opportunity to build cash value.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ How much life insurance do I need?</h3>
          <p className="text-gray-700">
            The amount of life insurance you need depends on factors such as your income, the number of dependents, and outstanding debts. A general rule of thumb is to have a policy that covers 10-15 times your annual income.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">❓ Can I change my life insurance policy later?</h3>
          <p className="text-gray-700">
            Yes, you can adjust your life insurance coverage later in life if your needs change. Many policies allow you to increase or decrease coverage, change beneficiaries, or convert a term policy to a whole life policy.
          </p>
        </div>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/quote/life"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Get a Life Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default LifeInsurance;
