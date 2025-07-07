import React, { useState } from 'react';
import {
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Calculator,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ===== TYPE DEFINITIONS =====
interface PaymentSchedule {
  ScheduleId: number;
  PolicyId: number;
  SeqNo: number;
  PaymentType: 'M' | 'A';
  ScheduleDate: string;
  PaymentAmount: number;
  PaymentStatus: 'N' | 'P' | 'F' | string;
  CreateDate: string | null;
  UpdateDate: string | null;
  LastUserID: string | null;
  MonerisTokenId: string | null;
  CardHolder: string | null;
  PaymentResponseCode: string | null;
  Notice: number;
  PaidToDate: string | null;
  NotifiedData: string | null;
  CardNo: string | null;
  CardExpiryMonth: string | null;
  CardExpiryYear: string | null;
  CardType: string | null;
  OldMonerisTokenId: string | null;
  WaiveProcessingFee: boolean;
}

interface PremiumOptionsRequest {
  totalPremium: number;
  firstPaymentDate: string;
  startDate: string;
  endDate: string;
  paymentType: 'M' | 'A';
}

interface PremiumSummary {
  totalPremium: number;
  monthlyCharge: number;
  depositAmount: number;
  subsequentAmount: number;
  totalPayments: number;
}

// ===== ENVIRONMENT VARIABLES (Set in .env file) =====
// REACT_APP_API_BASE_URL=https://devweb.desttravel.com
// REACT_APP_API_ENDPOINT=/api/visitorquote/premiumoptions
// REACT_APP_API_USERNAME=your_username
// REACT_APP_API_PASSWORD=your_password
// REACT_APP_API_LANGUAGE=EN

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const API_USERNAME = import.meta.env.VITE_API_USERNAME;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;
const API_LANGUAGE = import.meta.env.VITE_API_LANGUAGE;



function getBasicAuthHeader(username: string, password: string): string {
  return 'Basic ' + btoa(`${username}:${password}`);
}

// ===== API SERVICE FUNCTION =====
async function fetchPremiumOptionsAPI(params: PremiumOptionsRequest): Promise<PaymentSchedule[]> {
  const formatDateForAPI = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const queryParams = new URLSearchParams({
    totalPremium: params.totalPremium.toString(),
    firstPaymentDate: formatDateForAPI(params.firstPaymentDate),
    startDate: formatDateForAPI(params.startDate),
    endDate: formatDateForAPI(params.endDate),
    paymentType: params.paymentType,
  }).toString();

  const url = `${API_BASE_URL}${API_ENDPOINT}?${queryParams}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: getBasicAuthHeader(API_USERNAME, API_PASSWORD),
      'Content-Type': 'application/json',
      'Accept-Language': API_LANGUAGE,
      Accept: 'application/json',
    },
    mode: 'cors',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Expected JSON response but received: ${contentType}`);
  }

  const data: PaymentSchedule[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid API response format: expected an array of payment schedules');
  }

  return data;
}

// ===== MAIN COMPONENT =====
const PremiumOptions: React.FC = () => {
  const [requestParams, setRequestParams] = useState<PremiumOptionsRequest>({
    totalPremium: 1226.4,
    firstPaymentDate: new Date().toISOString().split('T')[0],
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    paymentType: 'M',
  });

  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>([]);
  const [summary, setSummary] = useState<PremiumSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPremiumOptionsAPI(requestParams);
      setPaymentSchedules(data);

      if (data.length > 0) {
        const totalPayments = data.length;
        const depositAmount = data[0]?.PaymentAmount || 0;
        const subsequentAmount = data[1]?.PaymentAmount || 0;
        const monthlyCharge = requestParams.paymentType === 'M' ? requestParams.totalPremium / 12 : 0;

        setSummary({
          totalPremium: requestParams.totalPremium,
          monthlyCharge,
          depositAmount,
          subsequentAmount,
          totalPayments,
        });
      } else {
        setSummary(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error occurred');
      setPaymentSchedules([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PremiumOptionsRequest, value: string | number) => {
    setRequestParams((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'startDate' && { firstPaymentDate: String(value) }),
    }));
  };

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getPaymentStatusDisplay = (status: string): { text: string; color: string } => {
    switch (status) {
      case 'N':
        return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
      case 'P':
        return { text: 'Paid', color: 'bg-green-100 text-green-800' };
      case 'F':
        return { text: 'Failed', color: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#305399] to-[#253A66] text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">Premium Payment</h1>
          <h2 className="text-2xl md:text-4xl lato-thin mb-6">Options & Schedule</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Review your monthly payment schedule and choose the best option for your insurance coverage.
          </p>
        </div>
      </header>

      {/* Input Form */}
      <section className="container mx-auto px-4 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          aria-labelledby="calculate-payment-schedule"
        >
          <h3 id="calculate-payment-schedule" className="text-2xl font-bold text-[#305399] mb-6 flex items-center">
            <Calculator className="mr-2" size={24} />
            Calculate Your Payment Schedule
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="totalPremium" className="block text-sm font-medium text-gray-700 mb-2">
                Total Premium
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="totalPremium"
                  name="totalPremium"
                  type="number"
                  step="0.01"
                  value={requestParams.totalPremium}
                  onChange={(e) => handleInputChange('totalPremium', parseFloat(e.target.value) || 0)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#305399] focus:border-transparent"
                  placeholder="1226.40"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={requestParams.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#305399] focus:border-transparent"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={requestParams.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#305399] focus:border-transparent"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type
              </label>
              <select
                id="paymentType"
                name="paymentType"
                value={requestParams.paymentType}
                onChange={(e) => handleInputChange('paymentType', e.target.value as 'M' | 'A')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#305399] focus:border-transparent"
                required
                aria-required="true"
              >
                <option value="M">Monthly</option>
                <option value="A">Annual</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#305399] text-white px-8 py-3 rounded-md hover:bg-[#253A66] transition-colors duration-200 font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Clock className="animate-spin mr-2" size={20} />
                  Calling API...
                </>
              ) : (
                <>
                  🚀 Calculate Payment Schedule
                  <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <section
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center mb-2">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <span className="font-medium text-red-700">Error</span>
            </div>
            <p className="text-red-700 text-sm">{error}</p>
          </section>
        )}

        {/* Summary */}
        {summary && (
          <section className="bg-white rounded-lg shadow-lg p-6 mb-8" aria-labelledby="payment-summary-title">
            <h3
              id="payment-summary-title"
              className="text-2xl font-bold text-[#305399] mb-6 flex items-center"
            >
              <DollarSign className="mr-2" size={24} />
              Payment Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-[#305399]">{formatCurrency(summary.totalPremium)}</div>
                <div className="text-sm text-gray-600">Total Premium</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(summary.depositAmount)}</div>
                <div className="text-sm text-gray-600">Initial Deposit</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(summary.subsequentAmount)}</div>
                <div className="text-sm text-gray-600">Monthly Payment</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{summary.totalPayments}</div>
                <div className="text-sm text-gray-600">Total Payments</div>
              </div>
            </div>
          </section>
        )}

        {/* Payment Schedule Table */}
        {paymentSchedules.length > 0 && (
          <section
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            aria-labelledby="payment-schedule-title"
          >
            <div className="p-6 border-b border-gray-200">
              <h3
                id="payment-schedule-title"
                className="text-2xl font-bold text-[#305399] flex items-center"
              >
                <CreditCard className="mr-2" size={24} />
                Monthly Payment Schedule
              </h3>
              <p className="text-gray-600 mt-2">
                Your complete payment schedule for the policy term ({paymentSchedules.length} payments)
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-describedby="payment-schedule-description">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentSchedules.map((schedule) => {
                    const statusDisplay = getPaymentStatusDisplay(schedule.PaymentStatus);

                    return (
                      <tr key={schedule.SeqNo} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{schedule.SeqNo}</div>
                            {schedule.SeqNo === 1 && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Deposit
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(schedule.ScheduleDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(schedule.PaymentAmount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}
                          >
                            <Clock className="mr-1" size={12} />
                            {statusDisplay.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.PaymentType === 'M' ? 'Monthly' : 'Annual'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Action Buttons */}
        {paymentSchedules.length > 0 && (
          <section className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" aria-label="Action buttons">
            <Link
              to="/PolicyPurchase"
              className="bg-[#305399] text-white px-8 py-3 rounded-md hover:bg-[#253A66] transition-colors duration-200 font-medium shadow-md text-center flex items-center justify-center"
            >
              <CheckCircle className="mr-2" size={20} />
              Proceed to Purchase
            </Link>

            <button
              onClick={() => window.print()}
              className="bg-gray-600 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium shadow-md flex items-center justify-center"
            >
              <FileText className="mr-2" size={20} />
              Print Schedule
            </button>
          </section>
        )}
      </section>
    </main>
  );
};

export default PremiumOptions;
