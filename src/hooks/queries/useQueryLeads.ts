import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useQueryLeads = () => {
  return useQuery({
    queryKey: [queryKeys.Leads],
    initialData: [],
    queryFn: async () => {
      // Add artificial delay to test loading states
      // Remove this in production or make it conditional
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await fetch('/leads.json'); // relative to public/

      if (!res.ok) throw new Error('Failed to load local JSON');

      const data = (await res.json()) ?? [];

      return data as Lead[];
    },
  });
};

export default useQueryLeads;
