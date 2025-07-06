import React from 'react';
import { Link } from 'react-router-dom';

const AutoInsurance: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-[#ff735c]">
      <h1 className="text-4xl font-bold text-center mb-8  }">Auto Insurance</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Do You Need Auto Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
        Auto insurance is more than just a legal obligation — it's a vital safeguard that protects you, your vehicle, and your financial future. Whether you drive every day to work, take weekend road trips, or only use your car occasionally, having reliable auto insurance coverage ensures you’re not left vulnerable in the face of unexpected events.

Every time you get behind the wheel, there’s a risk — even if you’re a cautious driver. Accidents can happen in seconds, and the aftermath can be costly. From minor fender benders to major collisions, the cost of vehicle repairs, medical expenses, and legal fees can quickly add up. Auto insurance helps cover those expenses, so you don't have to shoulder them alone.

But it's not just accidents. Comprehensive auto insurance can also protect you against non-collision-related incidents such as theft, vandalism, fire, or weather damage. Depending on your policy, it may even cover rental cars or towing services.

Most importantly, auto insurance provides peace of mind. Knowing that you're protected allows you to focus on the road ahead with confidence. It’s not just about meeting legal requirements — it’s about safeguarding what matters most: your safety, your passengers, and your financial well-being.


        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What Is Auto Insurance?</h2>
        <p className="text-gray-700 leading-relaxed">
        Auto insurance is a legally binding contract between you and an insurance company that provides financial protection in case of accidents, theft, or other unforeseen events involving your vehicle. By paying a regular premium, you ensure that the insurer will cover specific losses as outlined in your policy, reducing your financial burden in times of need.

A typical auto insurance policy includes various types of coverage, such as liability coverage, which pays for damages or injuries you cause to others; collision coverage, which helps repair or replace your vehicle if it's damaged in an accident; and comprehensive coverage, which protects against non-collision incidents like theft, vandalism, or natural disasters. Additionally, policies may include personal injury protection (PIP) to cover medical expenses for you and your passengers, and uninsured/underinsured motorist coverage to protect you if you're involved in an accident with a driver who lacks sufficient insurance.

Auto insurance is mandatory in most regions, including Canada, where minimum coverage requirements vary by province. Choosing the right policy depends on factors such as your vehicle type, driving history, and financial situation. By maintaining adequate coverage, you ensure peace of mind, knowing that you are financially safeguarded against potential losses on the road.
        </p>
      </section>

      <section className="mb-10">
  <h2 className="text-2xl font-semibold mb-4">Common Questions About Auto Insurance</h2>

  <div className="mb-6">
    <h3 className="text-xl font-medium mb-2">❓ Is auto insurance mandatory?</h3>
    <p className="text-gray-700">
      Yes, in most countries and regions, auto insurance is legally required to operate a vehicle on public roads. At the very least, drivers must carry basic liability coverage, which covers injuries or damage you may cause to others in an accident. Driving without insurance can result in serious consequences, such as hefty fines, license suspension, vehicle impoundment, or even legal action. Beyond the legal requirement, insurance protects you financially if you're involved in a collision or your car causes harm to others. It’s not just about compliance — it’s about being a responsible driver who’s prepared for the unexpected.
    </p>
  </div>

  <div className="mb-6">
    <h3 className="text-xl font-medium mb-2">❓ What types of coverage are available?</h3>
    <p className="text-gray-700">
      Auto insurance offers several types of coverage to suit different needs. The most common include: <strong>Liability coverage</strong> (required by law), which pays for damage or injury you cause to others; <strong>Collision coverage</strong>, which helps pay for damage to your own vehicle after an accident; and <strong>Comprehensive coverage</strong>, which covers non-collision incidents like theft, vandalism, or weather damage. Other options include <strong>Uninsured/underinsured motorist protection</strong> and <strong>Personal Injury Protection (PIP)</strong>, which helps with medical expenses. Choosing the right mix depends on factors like your vehicle’s value, driving habits, and risk tolerance.
    </p>
  </div>

  <div className="mb-6">
    <h3 className="text-xl font-medium mb-2">❓ How are premiums calculated?</h3>
    <p className="text-gray-700">
      Insurance premiums are calculated using a variety of risk-based factors. These include your age, gender, driving history, type of vehicle, usage (daily commute vs. occasional driving), and even your ZIP/postal code. Insurers also look at your claims history and credit score (in some regions). A newer, high-value car might cost more to insure, while a clean driving record could lower your premium. Additionally, the level of coverage and deductible you choose plays a role in the overall cost. The goal is to assess how likely you are to file a claim — and what the cost of that claim might be.
    </p>
  </div>

  <div className="mb-6">
    <h3 className="text-xl font-medium mb-2">❓ What should I do after an accident?</h3>
    <p className="text-gray-700">
      After an accident, your first priority is safety. Check on all passengers and call emergency services if there are any injuries or serious damage. If it's safe, move vehicles out of traffic to avoid further accidents. Exchange information with all parties involved, including names, contact details, license plate numbers, and insurance providers. Take photos of the scene, including vehicle damage and surroundings. Avoid admitting fault at the scene — leave that determination to the insurance companies. Finally, contact your insurance provider as soon as possible to report the incident and begin the claims process. The quicker you act, the smoother the outcome.
    </p>
  </div>
</section>


      <div className="text-center mt-12">
        <Link
          to="/quote/auto"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition"
        >
          Get an Auto Insurance Quote
        </Link>
      </div>
    </div>
  );
};

export default AutoInsurance;
