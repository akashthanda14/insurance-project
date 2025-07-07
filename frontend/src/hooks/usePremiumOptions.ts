// hooks/usePremiumOptions.ts
import { useState, useEffect } from 'react';
import { PaymentSchedule, PremiumOptionsRequest, ApiResponse, PremiumSummary } from '../types/paymentSchedule';

export const usePremiumOptions = (requestParams?: PremiumOptionsRequest) => {
  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<PremiumSummary | null>(null);

  const fetchPremiumOptions = async (params: PremiumOptionsRequest) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        totalPremium: params.totalPremium.toString(),
        firstPaymentDate: params.firstPaymentDate,
        startDate: params.startDate,
        endDate: params.endDate,
        paymentType: params.paymentType,
      });

      const response = await fetch(`/api/visitorquote/premiumoptions?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'EN',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaymentSchedule[] = await response.json();
      setPaymentSchedules(data);

      // Calculate summary
      if (data.length > 0) {
        const totalPremium = params.totalPremium;
        const monthlyCharge = totalPremium / 12;
        const depositAmount = data[0]?.PaymentAmount || 0;
        const subsequentAmount = data[1]?.PaymentAmount || 0;

        setSummary({
          totalPremium,
          monthlyCharge,
          depositAmount,
          subsequentAmount,
          totalPayments: data.length,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestParams) {
      fetchPremiumOptions(requestParams);
    }
  }, [requestParams]);

  return {
    paymentSchedules,
    loading,
    error,
    summary,
    fetchPremiumOptions,
  };
};
export { PremiumOptionsRequest };

