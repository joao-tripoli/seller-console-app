import { queryKeys } from '@/constants';
import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';

type Params = UseMutationOptions<Lead, Error, Lead>;

const useMutateLead = (params?: Params) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedLead: Lead) => {
      // Add artificial delay to simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return updatedLead;
    },
    ...params,
    onSuccess: (data, variables, context) => {
      params?.onSuccess?.(data, variables, context);

      queryClient.setQueryData([queryKeys.Leads], (old: Lead[] = []) =>
        old.map((lead) => (lead.id === data.id ? data : lead))
      );
    },
  });
};

export default useMutateLead;
