// src/hooks/queries/useQueryOpportunities.ts
import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useQueryOpportunities = () => {
  return useQuery({
    queryKey: [queryKeys.Opportunities],
    initialData: [],
    queryFn: async () => {
      // Add artificial delay to test loading states
      // Remove this in production or make it conditional
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // Get opportunities from localStorage
        const storedOpportunities = localStorage.getItem('opportunities');

        if (storedOpportunities) {
          const data = JSON.parse(storedOpportunities);
          return data as Opportunity[];
        }

        // Return empty array if no opportunities are stored
        return [] as Opportunity[];
      } catch (error) {
        console.warn('Error reading opportunities from localStorage:', error);
        return [] as Opportunity[];
      }
    },
  });
};

export default useQueryOpportunities;
