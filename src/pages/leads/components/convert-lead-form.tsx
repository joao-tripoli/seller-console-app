import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  type DrawerProps,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAddOpportunity from '@/hooks/mutations/useAddOpportunity';
import useScreenSize from '@/hooks/useScreenSize';
import { cn } from '@/lib/utils';

const opportunitySchema = z.object({
  name: z.string().min(1, 'Please enter an opportunity name'),
  stage: z.string().min(1, 'Please select a stage'),
  amount: z.number().positive().optional(),
  accountName: z.string().min(1, 'Please enter an account name'),
});

type OpportunityFormData = z.infer<typeof opportunitySchema>;

type Props = Pick<DrawerProps, 'open' | 'onClose'> & {
  lead: Lead | null;
};

const ConvertLeadForm = ({ open, onClose, lead }: Props) => {
  const isMobile = useScreenSize();
  const { mutate } = useAddOpportunity();

  const form = useForm<OpportunityFormData>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      name: lead?.name || '',
      stage: '',
      amount: undefined,
      accountName: lead?.company || '',
    },
  });

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        stage: '',
        amount: undefined,
        accountName: lead.company,
      });
    }
  }, [lead, form]);

  const handleFormSubmit = useCallback(
    async (data: OpportunityFormData) => {
      if (!lead) return;

      const opportunityId = Date.now();

      const opportunity: Opportunity = {
        id: opportunityId,
        name: data.name,
        stage: data.stage,
        amount: data.amount,
        accountName: data.accountName,
      };

      mutate(opportunity, {
        onSuccess: () => {
          onClose?.();
          form.reset();
        },
      });
    },
    [lead, onClose, form]
  );

  const handleClose = () => {
    onClose?.();
    form.reset();
  };

  return (
    <Drawer
      direction={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={handleClose}
    >
      <DrawerContent className={cn('flex flex-col', isMobile && 'h-screen')}>
        <DrawerHeader>
          <DrawerTitle>Convert Lead to Opportunity</DrawerTitle>
          <DrawerDescription>
            Create a new opportunity from {lead?.name}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-4 p-4"
              id="convert-lead-form"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opportunity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter opportunity name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prospecting">Prospecting</SelectItem>
                        <SelectItem value="qualification">
                          Qualification
                        </SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="negotiation">Negotiation</SelectItem>
                        <SelectItem value="closed-won">Closed Won</SelectItem>
                        <SelectItem value="closed-lost">Closed Lost</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter the expected deal amount"
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === '' ? undefined : parseFloat(value)
                            );
                          }}
                          className="pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DrawerFooter className="mt-auto">
          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500"
            form="convert-lead-form"
          >
            Convert Lead
          </Button>

          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConvertLeadForm;
