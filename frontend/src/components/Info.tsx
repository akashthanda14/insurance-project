import React, { useState, useRef, useEffect } from 'react';
import { Clock, Mail, Phone, X, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const nameRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isModalOpen && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isModalOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Form validation
  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmissionStatus('idle');
    setFormErrors({});
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmissionStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📩 Email Submitted:', formData);
      setSubmissionStatus('success');
      
      // Auto-close after success
      setTimeout(() => {
        closeModal();
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 transform transition-all duration-300 hover:shadow-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
              <div className="w-20 h-1 bg-gradient-to-r from-[#305399] to-[#253A66] rounded-full"></div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Need assistance with your insurance needs? Our dedicated team is here to help you find the perfect coverage. 
              Reach out to us and experience personalized service that puts your peace of mind first.
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-[#305399] p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold text-lg">Phone Support</p>
                  <a href="tel:+16476162106" className="text-[#305399] hover:text-[#253A66] transition-colors">
                    +1 (647) 61-621-06
                  </a>
                  <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-[#305399] p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold text-lg">Email Us</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#305399] hover:text-[#253A66] transition-colors underline decoration-2 underline-offset-2"
                  >
                    info@investorinsurance.ca
                  </button>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-[#305399] p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
               <div className="text-gray-700">
  <p className="font-semibold text-lg">Visit Our Office</p>
  <p>Mississauga, Ontario, Canada</p>
  <p>Area of Operation: All over Canada</p>
</div>

              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="bg-[#253A66] p-3 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold text-lg">Business Hours</p>
                  <div className="space-y-1">
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p>Saturday: 10:00 AM – 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-inner space-y-6 border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About INVESTOR INSURANCE</h2>
            
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                At <span className="font-semibold text-[#305399]">INVESTOR INSURANCE</span>, we believe that great insurance 
                coverage shouldn't be complicated. Since our founding, we've been dedicated to providing comprehensive, 
                affordable insurance solutions that protect what matters most to you.
              </p>
              
              <p>
                Whether you're protecting your home, auto, business, or planning for life's unexpected moments, 
                our experienced team works tirelessly to find the right coverage at the right price.
              </p>
              
              <p>
                We pride ourselves on exceptional customer service, transparent communication, and building 
                lasting relationships with our clients. Your peace of mind is our priority.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-[#305399]">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-[#305399]">50K+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleModalClick}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative transform transition-all duration-300 scale-100 animate-in"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            {submissionStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    ref={nameRef}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#305399] focus:outline-none transition-colors ${
                      formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#305399] focus:outline-none transition-colors ${
                      formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#305399] focus:outline-none transition-colors ${
                      formErrors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="What is this regarding?"
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#305399] focus:outline-none transition-colors resize-none ${
                      formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {submissionStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submissionStatus === 'loading'}
                  className="w-full bg-[#305399] text-white py-3 rounded-lg hover:bg-[#253A66] transition-colors font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submissionStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
