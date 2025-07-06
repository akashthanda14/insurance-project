import React, { useState, useRef, useEffect } from 'react';
import { Clock, Mail, Phone, X } from 'lucide-react';

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isModalOpen && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    console.log('📩 Email Submitted:', data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-10">
            <h4 className="text-4xl font-bold text-gray-800">Contact Us</h4>

            <p className="text-gray-600 text-lg">
              Need help? Reach out to our team directly and we’ll get back to you as soon as possible. We’re available throughout the week to assist with your inquiries, provide support, or guide you through our services.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-orange-600" />
                <div className="text-gray-700">
                  <p className="font-semibold">Phone</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-orange-600" />
                <div className="text-gray-700">
                  <p className="font-semibold">Email</p>
                  <p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-orange-500 underline hover:text-orange-600"
                    >
                      contact@innovatetech.com
                    </button>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-orange-600" />
                <div className="text-gray-700">
                  <p className="font-semibold">Business Hours</p>
                  <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
                  <p>Sat: 10:00 AM – 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner space-y-4">
            <h4 className="text-3xl font-semibold text-gray-800 mb-2">About Us</h4>
            <p className="text-gray-700 text-lg">
              At <span className="font-semibold text-orange-500">InnovateTech</span>, we’re more than just a tech company — we’re your growth partner. Since 2015, we've specialized in custom digital solutions, web apps, and tech consulting.
            </p>
            <p className="text-gray-700 text-lg">
              Whether you’re launching a startup or scaling an enterprise, our team provides tailored strategies that solve real problems and drive measurable results.
            </p>
            <p className="text-gray-700 text-lg">
              We pride ourselves on clarity, transparency, and long-term relationships. Let’s build something extraordinary together.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>

            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send us a Message</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  ref={nameRef}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 transition font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
