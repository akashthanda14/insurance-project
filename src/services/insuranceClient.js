export const fetchInsurancePlans = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/insurance/plans');
      
      if (!response.ok) {
        throw new Error('Failed to fetch insurance plans');
      }
  
      const data = await response.json();
      
      // Mock data since the API is not available
      return [
        {
          id: '1',
          companyName: 'Global Travel Shield',
          pricePerTraveler: 149.99,
          coverageDetails: 'Comprehensive coverage including medical expenses, trip cancellation, and emergency evacuation. 24/7 worldwide assistance.'
        },
        {
          id: '2',
          companyName: 'SafeJourney Plus',
          pricePerTraveler: 129.99,
          coverageDetails: 'Essential coverage with medical benefits, baggage protection, and travel delay compensation. Ideal for budget-conscious travelers.'
        },
        {
          id: '3',
          companyName: 'Premium Traveler Guard',
          pricePerTraveler: 199.99,
          coverageDetails: 'Premium protection with extensive medical coverage, adventure sports coverage, and premium concierge services.'
        },
        {
          id: '4',
          companyName: 'Senior Travelers Protect',
          pricePerTraveler: 179.99,
          coverageDetails: 'Specialized coverage for seniors including pre-existing conditions, extended medical coverage, and emergency medical evacuation.'
        }
      ];
    } catch (error) {
      console.error('Error fetching insurance plans:', error);
      throw error;
    }
  };