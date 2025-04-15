import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Lock, AlertCircle, UserPlus, X } from 'lucide-react';

type Traveler = {
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  relationship: 'APPLICANT' | 'SPOUSE';
  preExistingCondition: boolean;
};

type QuoteFormValues = {
  requiresMedical: boolean;
  numberOfTravelers: string;
  destination: string;
  startDate: string;
  travelers: Traveler[];
  emailAddress: string;
  receiveOffers: boolean;
};

const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon'
];

const QuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const [maxTravelers, setMaxTravelers] = useState(8);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormValues>({
    defaultValues: {
      requiresMedical: false,
      numberOfTravelers: '1',
      destination: '',
      startDate: today,
      travelers: [
        {
          dateOfBirth: '',
          gender: 'MALE',
          relationship: 'APPLICANT',
          preExistingCondition: false
        }
      ],
      emailAddress: '',
      receiveOffers: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelers"
  });

  const requiresMedical = watch('requiresMedical');
  const numberOfTravelers = watch('numberOfTravelers');

  useEffect(() => {
    const newMaxTravelers = requiresMedical === true ? 2 : 8;
    setMaxTravelers(newMaxTravelers);
    
    if (Number(numberOfTravelers) > newMaxTravelers) {
      setValue('numberOfTravelers', String(newMaxTravelers));
    }
  }, [requiresMedical]);

  useEffect(() => {
    const currentNumber = Number(numberOfTravelers);
    const currentLength = fields.length;

    if (currentNumber > currentLength) {
      // Add more travelers
      for (let i = currentLength; i < currentNumber; i++) {
        append({
          dateOfBirth: '',
          gender: 'MALE',
          relationship: i === 0 ? 'APPLICANT' : 'SPOUSE',
          preExistingCondition: false
        });
      }
    } else if (currentNumber < currentLength) {
      // Remove excess travelers
      for (let i = currentLength - 1; i >= currentNumber; i--) {
        remove(i);
      }
    }
  }, [numberOfTravelers]);

  const onSubmit = async (data: QuoteFormValues) => {
    console.log('Form data:', data);
    navigate('/plans', { state: { formData: data } });
  };

  return (
    <div className="max-w-[965px] mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Enter your trip details</h1>
        <span className="inline-flex items-center text-gray-600">
          <Lock className="h-4 w-4 mr-2" />
          Your information is secure and will not be sold
        </span>
        <div className="mt-4 border-b border-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          {/* Medical Coverage Question */}
          <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium text-gray-700">
              Do you require medical coverage for Parent/Grandparent Super Visa?
            </label>
            <div className="flex gap-4">
              <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="radio"
                  {...register('requiresMedical')}
                  value="true"
                  className="h-4 w-4 text-orange-600 border-gray-300"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="radio"
                  {...register('requiresMedical')}
                  value="false"
                  className="h-4 w-4 text-orange-600 border-gray-300"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium text-gray-700">
              Number of Travelers
            </label>
            <div className="border rounded-md">
              <select
                {...register('numberOfTravelers')}
                className="w-full px-4 py-3 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                {[...Array(maxTravelers)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium text-gray-700">
              Primary Destination in Canada
            </label>
            <div className="border rounded-md">
              <select
                {...register('destination', { required: 'Please select a destination' })}
                className="w-full px-4 py-3 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Province</option>
                {PROVINCES.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium text-gray-700">
              Start Date of Coverage
            </label>
            <div className="border rounded-md">
              <input
                type="date"
                min={today}
                {...register('startDate', { required: 'Start date is required' })}
                className="w-full px-4 py-3 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Travelers Section */}
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Traveler {index + 1}
                </h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="border rounded-md">
                    <input
                      type="date"
                      {...register(`travelers.${index}.dateOfBirth` as const, {
                        required: 'Date of birth is required'
                      })}
                      className="w-full px-4 py-3 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        {...register(`travelers.${index}.gender` as const)}
                        value="MALE"
                        className="h-4 w-4 text-orange-600 border-gray-300"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        {...register(`travelers.${index}.gender` as const)}
                        value="FEMALE"
                        className="h-4 w-4 text-orange-600 border-gray-300"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
                  <label className="block text-sm font-medium text-gray-700">
                    Pre-existing Medical Condition
                  </label>
                  <div className="flex gap-4">
                    <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        {...register(`travelers.${index}.preExistingCondition` as const)}
                        value="true"
                        className="h-4 w-4 text-orange-600 border-gray-300"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex-1 border rounded-md p-4 cursor-pointer hover:border-orange-500 transition-colors">
                      <input
                        type="radio"
                        {...register(`travelers.${index}.preExistingCondition` as const)}
                        value="false"
                        className="h-4 w-4 text-orange-600 border-gray-300"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Email Address */}
          <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-[1fr_2fr] sm:gap-4 sm:items-start">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="border rounded-md">
              <input
                type="email"
                {...register('emailAddress', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </div>

        {/* Form Errors */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-6">
            <div className="flex items-center text-red-800 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Please correct the following errors:</span>
            </div>
            <ul className="list-disc list-inside text-sm text-red-700">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Get Quotes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;