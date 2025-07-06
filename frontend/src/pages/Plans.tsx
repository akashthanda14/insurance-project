import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { fetchInsurancePlans } from '../services/insuranceClient';

type InsurancePlan = {
  id: string;
  companyName: string;
  pricePerTraveler: number;
  coverageDetails: string;
};

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<InsurancePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  useEffect(() => {
    const getPlans = async () => {
      try {
        const data = await fetchInsurancePlans();
        setPlans(data);
      } catch (err) {
        setError('Failed to load insurance plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getPlans();
  }, []);

  const totalTravelers = formData?.travelers.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Shield className="h-6 w-6 text-blue-600 mr-2" />
          Available Plans
        </h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Quote
        </button>
      </div>

      {formData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Quote Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-800">
                <strong>Number of Travelers:</strong> {totalTravelers}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Pre-existing Conditions:</strong>{' '}
                {formData.travelers.filter(t => t.preExistingCondition).length} traveler(s)
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading available plans...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && plans.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map(plan => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.companyName}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600">{plan.coverageDetails}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      ${plan.pricePerTraveler.toFixed(2)}
                      <span className="text-sm text-gray-500 font-normal">/traveler</span>
                    </div>
                    <button
                      onClick={() =>
                        navigate('/Applicantform', { state: { formData, selectedPlan: plan } })
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Buy Now
                    </button>
                  </div>
                  {totalTravelers > 1 && (
                    <p className="text-sm text-gray-500">
                      Total: ${(plan.pricePerTraveler * totalTravelers).toFixed(2)} for {totalTravelers} travelers
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && plans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No insurance plans available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Plans;
