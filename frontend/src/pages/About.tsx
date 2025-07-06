import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="prose lg:prose-xl">
          <p className="text-lg text-gray-700 mb-4">
            We are committed to revolutionizing the insurance industry through innovative technology
            and exceptional customer service. Our platform makes it easier than ever to manage your
            insurance needs efficiently and effectively.
          </p>
          <p className="text-lg text-gray-700">
            With years of experience in both insurance and technology, our team brings together
            the expertise needed to deliver a seamless insurance management experience.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About;