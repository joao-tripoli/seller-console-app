import { queryKeys } from '@/constants';
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import useLocalStorage from '../useLocalStorage';

type Params = UseMutationOptions<Opportunity, Error, Omit<Opportunity, 'id'>>;

const useAddOpportunity = (params?: Params) => {
  const queryClient = useQueryClient();

  const [_, setOpportunities] = useLocalStorage<Opportunity[]>(
    queryKeys.Opportunities,
    []
  );

  return useMutation({
    mutationFn: async (newOpportunity: Omit<Opportunity, 'id'>) => {
      // Add artificial delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a unique ID
      const id = Date.now() + Math.random();

      const opportunityWithId: Opportunity = {
        ...newOpportunity,
        id,
      };

      // Save to localStorage
      setOpportunities((prev) => [...prev, opportunityWithId]);

      return opportunityWithId;
    },
    ...params,
    onSuccess: (data, variables, context) => {
      params?.onSuccess?.(data, variables, context);
      toast.success('Lead converted to Opportunity successfully');

      // Update the query cache if there's an opportunities query
      queryClient.setQueryData(
        [queryKeys.Opportunities],
        (old: Opportunity[] = []) => [...old, data]
      );
    },
    onError: (error, variables, context) => {
      params?.onError?.(error, variables, context);
      toast.error('Failed to add opportunity');
    },
  });
};

export default useAddOpportunity;
