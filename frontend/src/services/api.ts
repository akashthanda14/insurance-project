import axios from 'axios';

type TravelerInput = {
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  relationship: 'APPLICANT' | 'SPOUSE';
  preExistingCondition: boolean;
};

type QuoteInput = {
  requiresMedical: boolean;
  destination: string;
  startDate: string;
  numberOfTravelers: number;
  emailAddress: string;
  travelers: TravelerInput[];
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api/quotes',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quoteService = {
  async createQuote(data: QuoteInput): Promise<void> {
    console.log('Submitting quote data:', data);
    
    try {
        const response = await api.post('/', data);

      
      if (response.status !== 200 && response.status !== 201) {
        console.error('Server response:', response.data);
        throw new Error(`Failed to create quote: ${response.status} ${response.statusText}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error in createQuote:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create quote';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },
};