import React from 'react';

const Teams = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h3 className="text-4xl md:text-6xl font-bold mb-16 md:mb-32 text-gray-800 text-center">
        <span className="uppercase text-orange-500">Thanks</span> to the Team
      </h3>

      <div className="flex flex-col md:flex-row gap-12 md:gap-12">
        {/* Team Member Card */}
        <div className="flex flex-col items-center group">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop"
            alt="Team member 1"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg transform transition-transform duration-300 group-hover:scale-105"
          />
          <p className="mt-4 text-lg md:text-xl font-semibold text-gray-700 group-hover:text-orange-500 transition-colors duration-300">
            Sarah Chen
          </p>
          <p className="text-sm md:text-base text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
            Sales Expert
          </p>
        </div>

        {/* Team Member Card */}
        <div className="flex flex-col items-center group">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop"
            alt="Team member 2"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg transform transition-transform duration-300 group-hover:scale-105"
          />
          <p className="mt-4 text-lg md:text-xl font-semibold text-gray-700 group-hover:text-orange-500 transition-colors duration-300">
            James Wilson
          </p>
          <p className="text-sm md:text-base text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
            Senior Consultant
          </p>
        </div>

        {/* Team Member Card */}
        <div className="flex flex-col items-center group">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop"
            alt="Team member 3"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg transform transition-transform duration-300 group-hover:scale-105"
          />
          <p className="mt-4 text-lg md:text-xl font-semibold text-gray-700 group-hover:text-orange-500 transition-colors duration-300">
            Emily Taylor
          </p>
          <p className="text-sm md:text-base text-gray-600 group-hover:text-orange-500 transition-colors duration-300">
            Product Manager
          </p>
        </div>
      </div>
    </div>
  );
};

export default Teams;