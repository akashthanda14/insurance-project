import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const ApplicantDetailsForm = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const quote = location.state?.quoteData;

  const onSubmit = async (data) => {
    const res = await fetch('/api/applicant-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        quoteId: quote.id,
        province: quote.destination,
      })
    });
    const result = await res.json();
    console.log(result);
  };

  const applicantDOB = quote?.travelers?.[0]?.dateOfBirth;

  return (
    <div className="max-w-[965px] mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-white bg-[#305399] p-4 rounded-t-xl text-xl font-semibold">
        Enter Your Trip Details
      </h1>
      <p className="flex items-center text-sm text-gray-600 mt-2">
        <span className="mr-2">🔒</span>
        Your information is secure and will not be sold.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* Applicant Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">1. Applicant Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register('firstName')} placeholder="First Name" className="border p-3 rounded" />
            <input {...register('lastName')} placeholder="Last Name" className="border p-3 rounded" />
            <input disabled value={applicantDOB} className="border p-3 rounded bg-gray-100" />
            <input disabled value={quote?.travelers?.[0]?.gender} className="border p-3 rounded bg-gray-100" />
            <input disabled value="APPLICANT" className="border p-3 rounded bg-gray-100" />
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">2. Additional Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register('phoneNumber')} placeholder="Phone Number" className="border p-3 rounded" />
            <input disabled value={quote?.emailAddress} className="border p-3 rounded bg-gray-100" />
            <input {...register('arrivalDate')} type="date" className="border p-3 rounded" />
            <select {...register('hasCanadianHealthInsurance')} className="border p-3 rounded">
              <option value="">Select Health Coverage</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Address Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">3. Your Address in Canada</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input {...register('address')} placeholder="Address" className="border p-3 rounded" />
            <input {...register('suiteNumber')} placeholder="Suite or Apt #" className="border p-3 rounded" />
            <input {...register('city')} placeholder="City" className="border p-3 rounded" />
            <input disabled value={quote?.destination} className="border p-3 rounded bg-gray-100" />
            <input {...register('postalCode')} placeholder="Postal Code" className="border p-3 rounded" />
            <input {...register('canadianPhoneNumber')} placeholder="Telephone in Canada" className="border p-3 rounded" />
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-md">
            Get Quotes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicantDetailsForm;
