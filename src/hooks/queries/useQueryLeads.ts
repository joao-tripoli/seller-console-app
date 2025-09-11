import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const useQueryLeads = () => {
  return useQuery({
    queryKey: [queryKeys.Leads],
    initialData: [],
    queryFn: async () => {
      const res = await fetch('/leads.json'); // relative to public/

      if (!res.ok) throw new Error('Failed to load local JSON');

      const data = (await res.json()) ?? [];

      return data as Lead[];
    },
  });
};

export default useQueryLeads;
