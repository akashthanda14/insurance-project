import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  User, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  DollarSign,
  ExternalLink
} from "lucide-react";

// Type definitions
interface PaymentInfo {
  PaymentMethod: number;
  PaymentTokenId: string;
  CardHolderName: string;
}

interface ClientInfo {
  Gender: string;
  FirstName: string;
  LastName: string;
  BirthDate: string;
  Relationship: string;
}

interface ClientAddressInfo {
  ClientType: string;
  Address: string;
  City: string;
  Prov: string;
  PostalCode: string;
  Email: string;
  Phone: string;
  ClientLookup: ClientInfo[];
}

interface PolicyRequest {
  Payment: PaymentInfo;
  ClientAddrLookup: ClientAddressInfo;
  ProductID: number;
  ApplicationDate: string;
  ArrivalDate: string;
  EffectiveDate: string;
  ExpiryDate: string;
  IsQuoteOnly: boolean;
  Deductible: number;
  SumInsured: number;
  DailyRate: number;
  ScheduleNo: number;
  TripLength: number;
  TotalPremium: number;
  PaymentSchedule?: string;
}

interface PolicyResponse {
  PolicyID: number;
  PolicyNo: string;
  Status: string;
  TotalPremium: number;
  EffectiveDate: string;
  ExpiryDate: string;
}

const API_URL = "https://devweb.desttravel.com/api/visitorquote";
const PAYMENT_IFRAME_URL = "http://devweb.desttravel.com/payment/checkout.aspx";
const AUTH_HEADER = "Basic c2hpa2hhLnNoYXJtYTo4diNGITJxUiR3OUB6TDF4";

const PolicyPurchase: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [policyResponse, setPolicyResponse] = useState<PolicyResponse | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentTokenReceived, setPaymentTokenReceived] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Form state
  const [coverageType, setCoverageType] = useState<'S' | 'C' | 'F'>('S');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    PaymentMethod: 2,
    PaymentTokenId: '',
    CardHolderName: ''
  });
  
  const [addressInfo, setAddressInfo] = useState({
    Address: '',
    City: '',
    Prov: 'ON',
    PostalCode: '',
    Email: '',
    Phone: ''
  });

  const [primaryClient, setPrimaryClient] = useState<ClientInfo>({
    Gender: 'M',
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Relationship: 'P'
  });

  const [spouseClient, setSpouseClient] = useState<ClientInfo>({
    Gender: 'F',
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Relationship: 'S'
  });

  const [policyDetails, setPolicyDetails] = useState({
    ApplicationDate: new Date().toISOString().split('T')[0],
    ArrivalDate: '',
    EffectiveDate: '',
    ExpiryDate: '',
    SumInsured: 25000,
    Deductible: 0,
    DailyRate: 2.30,
    ScheduleNo: 1,
    TripLength: 365,
    TotalPremium: 839.50
  });

  const provinces = [
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
    { code: 'QC', name: 'Quebec' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'YT', name: 'Yukon' },
    { code: 'NU', name: 'Nunavut' }
  ];

  // Listen for payment token from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== 'http://devweb.desttravel.com') {
        return;
      }

      if (event.data.type === 'PAYMENT_TOKEN') {
        setPaymentInfo(prev => ({
          ...prev,
          PaymentTokenId: event.data.token
        }));
        setPaymentTokenReceived(true);
        setPaymentProcessing(false);
      }

      if (event.data.type === 'PAYMENT_ERROR') {
        setError(event.data.message || 'Payment processing failed');
        setPaymentProcessing(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const clientLookup: ClientInfo[] = [primaryClient];
      if (coverageType === 'C' || coverageType === 'F') {
        clientLookup.push(spouseClient);
      }

      const requestData: PolicyRequest = {
        Payment: paymentInfo,
        ClientAddrLookup: {
          ClientType: coverageType,
          ...addressInfo,
          ClientLookup: clientLookup
        },
        ProductID: 3,
        ApplicationDate: policyDetails.ApplicationDate.split('-').reverse().join('/'),
        ArrivalDate: policyDetails.ArrivalDate.split('-').reverse().join('/'),
        EffectiveDate: policyDetails.EffectiveDate.split('-').reverse().join('/'),
        ExpiryDate: policyDetails.ExpiryDate.split('-').reverse().join('/'),
        IsQuoteOnly: false,
        Deductible: policyDetails.Deductible,
        SumInsured: policyDetails.SumInsured,
        DailyRate: policyDetails.DailyRate,
        ScheduleNo: policyDetails.ScheduleNo,
        TripLength: policyDetails.TripLength,
        TotalPremium: policyDetails.TotalPremium
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': AUTH_HEADER,
          'Content-Type': 'application/json',
          'Accept-Language': 'EN'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData[0]?.Message || `API Error: ${response.status}`);
      }

      const result = await response.json();
      setPolicyResponse(result[0]);
      setSuccess(true);
      setStep(5);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSetup = () => {
    setPaymentProcessing(true);
    setError(null);
    
    // Send payment amount to iframe
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'SETUP_PAYMENT',
        amount: policyDetails.TotalPremium,
        currency: 'CAD'
      }, 'http://devweb.desttravel.com');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <Users className="text-orange-500 mr-3" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Coverage Type</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'S', label: 'Single', desc: 'Individual coverage' },
                { type: 'C', label: 'Couple', desc: 'Two adults coverage' },
                { type: 'F', label: 'Family', desc: 'Family with dependents' }
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => setCoverageType(option.type as 'S' | 'C' | 'F')}
                  className={`p-4 md:p-6 rounded-lg border-2 transition-all duration-200 text-center ${
                    coverageType === option.type
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <h4 className="font-semibold text-base md:text-lg">{option.label}</h4>
                  <p className="text-sm md:text-base text-gray-600">{option.desc}</p>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center">
                  <User className="mr-2 text-orange-500" size={20} />
                  Primary Applicant
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={primaryClient.FirstName}
                    onChange={(e) => setPrimaryClient({...primaryClient, FirstName: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={primaryClient.LastName}
                    onChange={(e) => setPrimaryClient({...primaryClient, LastName: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={primaryClient.BirthDate}
                    onChange={(e) => setPrimaryClient({...primaryClient, BirthDate: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                  <select
                    value={primaryClient.Gender}
                    onChange={(e) => setPrimaryClient({...primaryClient, Gender: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              </div>

              {(coverageType === 'C' || coverageType === 'F') && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center">
                    <Users className="mr-2 text-orange-500" size={20} />
                    Spouse/Partner
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={spouseClient.FirstName}
                      onChange={(e) => setSpouseClient({...spouseClient, FirstName: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={spouseClient.LastName}
                      onChange={(e) => setSpouseClient({...spouseClient, LastName: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={spouseClient.BirthDate}
                      onChange={(e) => setSpouseClient({...spouseClient, BirthDate: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    />
                    <select
                      value={spouseClient.Gender}
                      onChange={(e) => setSpouseClient({...spouseClient, Gender: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <MapPin className="text-orange-500 mr-3" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Contact Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={addressInfo.Address}
                  onChange={(e) => setAddressInfo({...addressInfo, Address: e.target.value})}
                  className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={addressInfo.City}
                    onChange={(e) => setAddressInfo({...addressInfo, City: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                  <select
                    value={addressInfo.Prov}
                    onChange={(e) => setAddressInfo({...addressInfo, Prov: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  >
                    {provinces.map(prov => (
                      <option key={prov.code} value={prov.code}>{prov.name}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={addressInfo.PostalCode}
                  onChange={(e) => setAddressInfo({...addressInfo, PostalCode: e.target.value})}
                  className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-orange-500 flex-shrink-0" size={20} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={addressInfo.Email}
                    onChange={(e) => setAddressInfo({...addressInfo, Email: e.target.value})}
                    className="flex-1 rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-orange-500 flex-shrink-0" size={20} />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={addressInfo.Phone}
                    onChange={(e) => setAddressInfo({...addressInfo, Phone: e.target.value})}
                    className="flex-1 rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <Calendar className="text-orange-500 mr-3" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Policy Details</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Policy Dates</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
                    <input
                      type="date"
                      value={policyDetails.ArrivalDate}
                      onChange={(e) => setPolicyDetails({...policyDetails, ArrivalDate: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                    <input
                      type="date"
                      value={policyDetails.EffectiveDate}
                      onChange={(e) => setPolicyDetails({...policyDetails, EffectiveDate: e.target.value})}
                      className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={policyDetails.ExpiryDate}
                    onChange={(e) => setPolicyDetails({...policyDetails, ExpiryDate: e.target.value})}
                    className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 md:p-6">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <DollarSign className="mr-2 text-orange-500" size={20} />
                Premium Summary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Sum Insured:</span>
                  <p className="font-semibold">${policyDetails.SumInsured.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Deductible:</span>
                  <p className="font-semibold">${policyDetails.Deductible}</p>
                </div>
                <div>
                  <span className="text-gray-600">Trip Length:</span>
                  <p className="font-semibold">{policyDetails.TripLength} days</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Premium:</span>
                  <p className="font-bold text-base md:text-lg text-orange-600">${policyDetails.TotalPremium}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <CreditCard className="text-orange-500 mr-3" size={24} />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">Payment Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={paymentInfo.CardHolderName}
                  onChange={(e) => setPaymentInfo({...paymentInfo, CardHolderName: e.target.value})}
                  className="w-full rounded-md px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                />
                
                {!paymentTokenReceived && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Secure Payment Processing</h4>
                      <button
                        onClick={handlePaymentSetup}
                        disabled={paymentProcessing}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                      >
                        {paymentProcessing ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Processing...
                          </>
                        ) : (
                          <>
                            <ExternalLink size={16} />
                            Setup Payment
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <iframe
                        ref={iframeRef}
                        src={PAYMENT_IFRAME_URL}
                        className="w-full h-96 border-0"
                        title="DTG Payment Checkout"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                  </div>
                )}

                {paymentTokenReceived && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={20} />
                      <div>
                        <h4 className="font-semibold text-green-800">Payment Method Verified</h4>
                        <p className="text-green-700 text-sm">Your payment information has been securely processed.</p>
                        <p className="text-xs text-green-600 mt-1">Token: {paymentInfo.PaymentTokenId.substring(0, 10)}...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 md:p-6">
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <DollarSign className="mr-2 text-orange-500" size={20} />
                Final Payment Summary
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Coverage Type:</span>
                  <p className="font-semibold">{coverageType === 'S' ? 'Single' : coverageType === 'C' ? 'Couple' : 'Family'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Sum Insured:</span>
                  <p className="font-semibold">${policyDetails.SumInsured.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Trip Length:</span>
                  <p className="font-semibold">{policyDetails.TripLength} days</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Premium:</span>
                  <p className="font-bold text-base md:text-lg text-orange-600">${policyDetails.TotalPremium}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Policy Created Successfully!</h3>
            
            {policyResponse && (
              <div className="bg-green-50 rounded-lg p-4 md:p-6 text-left">
                <h4 className="font-semibold text-lg mb-4">Policy Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <span className="text-gray-600">Policy Number:</span>
                    <p className="font-semibold break-all">{policyResponse.PolicyNo}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Policy ID:</span>
                    <p className="font-semibold">{policyResponse.PolicyID}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-semibold">{policyResponse.Status}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Premium:</span>
                    <p className="font-semibold">${policyResponse.TotalPremium}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        <motion.header
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <FileText className="text-orange-500 mr-3" size={32} />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Purchase Policy
            </h1>
          </div>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Complete your travel insurance policy purchase in just a few steps
          </p>
        </motion.header>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8 overflow-x-auto">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 min-w-max px-4">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                  step >= stepNum ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 5 && (
                  <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 ${
                    step > stepNum ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.section
          className="bg-white rounded-lg shadow-md p-4 md:p-8 mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderStep()}
        </motion.section>

        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 md:p-6 mb-6 flex items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              role="alert"
            >
              <AlertCircle className="mr-3 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-bold text-sm md:text-base">Error</h3>
                <p className="text-sm md:text-base">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!success && (
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`w-full sm:w-auto px-6 py-3 rounded-md font-semibold transition-all duration-200 text-sm md:text-base ${
                step === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                if (step === 4 && paymentTokenReceived) {
                  handleSubmit();
                } else if (step === 4 && !paymentTokenReceived) {
                  setError('Please complete payment setup first');
                } else {
                  setStep(step + 1);
                }
              }}
              disabled={loading || (step === 4 && !paymentTokenReceived)}
              className={`w-full sm:w-auto px-6 py-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base ${
                loading || (step === 4 && !paymentTokenReceived)
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Processing...
                </>
              ) : step === 4 ? (
                'Purchase Policy'
              ) : (
                'Next'
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default PolicyPurchase;
