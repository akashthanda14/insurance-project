import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Calendar, Clock, Users, Globe, Shield, DollarSign } from "lucide-react";
import type { PremiumOption } from "../types";

const API_URL = "https://devweb.desttravel.com/api/visitorquote/premiumoptions";
const AUTH_HEADER = "Basic c2hpa2hhLnNoYXJtYTo4diNGITJxUiR3OUB6TDF4";

const defaultParams = {
  applicationDate: "2025-01-20",
  tripDays: 365,
  age: 25,
  familyPlan: false,
  language: "EN",
};

export const PremiumOptions: React.FC = () => {
  const [params, setParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PremiumOption[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const fetchPremiums = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const url = `${API_URL}?applicationDate=${params.applicationDate}&tripDays=${params.tripDays}&age=${params.age}&familyPlan=${params.familyPlan}`;
      const res = await fetch(url, {
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
          "Accept-Language": params.language,
        },
      });
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const result: PremiumOption[] = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-['Montserrat']">
      <div className="container mx-auto px-4 py-8">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="text-[#305399] mr-3" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Premium Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized travel insurance premium quotes tailored to your specific needs
          </p>
        </motion.header>

        <motion.section
          className="bg-white rounded-lg shadow-md p-8 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-8">
            <Shield className="text-[#305399] mr-3" size={32} />
            <h2 className="text-2xl font-bold text-gray-800">
              Enter Your Details
            </h2>
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchPremiums();
            }}
            className="space-y-8"
          >
            {/* First Row - Date and Trip Days */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="applicationDate" className="flex items-center text-lg font-semibold text-gray-700">
                  <Calendar className="mr-2text-[#305399]" size={20} />
                  Application Date
                </label>
                <input
                  id="applicationDate"
                  type="date"
                  name="applicationDate"
                  value={params.applicationDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md px-4 py-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tripDays" className="flex items-center text-lg font-semibold text-gray-700">
                  <Clock className="mr-2text-[#305399]" size={20} />
                  Trip Duration (Days)
                </label>
                <input
                  id="tripDays"
                  type="number"
                  name="tripDays"
                  value={params.tripDays}
                  min={1}
                  max={365}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md px-4 py-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Second Row - Age and Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="age" className="flex items-center text-lg font-semibold text-gray-700">
                  <Users className="mr-2text-[#305399]" size={20} />
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={params.age}
                  min={0}
                  max={120}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md px-4 py-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="language" className="flex items-center text-lg font-semibold text-gray-700">
                  <Globe className="mr-2text-[#305399]" size={20} />
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={params.language}
                  onChange={handleChange}
                  className="w-full rounded-md px-4 py-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#305399] focus:border-transparent transition-all duration-200"
                >
                  <option value="EN">English</option>
                  <option value="FR">French</option>
                </select>
              </div>
            </div>

            {/* Third Row - Family Plan and Submit Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label htmlFor="familyPlan" className="flex items-center text-lg font-semibold text-gray-700">
                  <Users className="mr-2text-[#305399]" size={20} />
                  Family Plan
                </label>
                <div className="flex items-center space-x-3 py-3">
                  <input
                    id="familyPlan"
                    type="checkbox"
                    name="familyPlan"
                    checked={params.familyPlan}
                    onChange={handleChange}
                    className="w-5 h-5text-[#305399] border-gray-300 rounded focus:ring-[#305399] focus:ring-2"
                  />
                  <span className="text-lg text-gray-700">
                    {params.familyPlan ? "Yes, include family coverage" : "Individual coverage only"}
                  </span>
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md px-8 py-4 text-xl font-semibold bg-[#305399] text-white shadow-md transition-all duration-200 hover:bg-[#305399] focus:outline-none focus:ring-2 focus:ring-[#305399] focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg"
                }`}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
              >
                {loading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Loading Premium Options...
                  </motion.span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Calculator size={24} />
                    Calculate Premium Options
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </motion.section>

        <AnimatePresence>
          {error && (
            <motion.section
              className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 mb-8 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              role="alert"
              aria-live="polite"
            >
              <h3 className="text-xl font-bold mb-2">Error Occurred</h3>
              <p className="text-lg">{error}</p>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {data && (
            <motion.section
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-800 text-white p-6">
                <div className="flex items-center justify-center">
                  <DollarSign className="mr-3" size={32} />
                  <h2 className="text-2xl font-bold text-center">
                    Available Premium Options
                  </h2>
                </div>
                <p className="text-center mt-2 text-gray-300">
                  Choose the best option for your travel insurance needs
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Sum Insured</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Schedule</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Trip Days</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Daily Rate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Base Rate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$0 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$250 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$500 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$1000 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$2500 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$5000 Deductible</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">$10000 Deductible</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className={`hover:bg-orange-50 transition-colors duration-200 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ${row.SumInsured.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.ScheduleNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.TripDays}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.DailyRate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Rate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible0}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible250}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible500}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible1000}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible2500}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible5000}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${row.Deductible10000}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
