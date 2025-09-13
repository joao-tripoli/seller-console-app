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
  FormDescription,
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
import useMutateLead from '@/hooks/mutations/useMutateLead';
import useScreenSize from '@/hooks/useScreenSize';
import { cn } from '@/lib/utils';

const leadUpdateSchema = z.object({
  email: z.email('Please enter a valid email address'),
  status: z.enum(['active', 'pending', 'inactive'], {
    error: 'Please select a status',
  }),
});

type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;

type Props = Pick<DrawerProps, 'open' | 'onClose'> & {
  lead: Lead | null;
};

const LeadForm = ({ open, onClose, lead }: Props) => {
  const isMobile = useScreenSize();

  const { mutate, isPending } = useMutateLead();

  const form = useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      email: lead?.email || '',
      status: (lead?.status as 'active' | 'pending' | 'inactive') || 'active',
    },
  });

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      form.reset({
        email: lead.email,
        status: lead.status as 'active' | 'pending' | 'inactive',
      });
    }
  }, [lead, form]);

  const handleFormSubmit = useCallback(
    async (data: LeadUpdateFormData) => {
      if (!lead) return;

      const newLead: Lead = {
        ...lead,
        ...data,
      };

      mutate(newLead, {
        onSuccess: () => {
          onClose?.();
          form.reset();
        },
      });
    },
    [lead, mutate, onClose, form]
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
          <DrawerTitle>Update Lead</DrawerTitle>
          <DrawerDescription>
            Update the email and status for {lead?.name}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-4 p-4"
              id="lead-form"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      Enter the lead's email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      Select the current status of the lead
                    </FormDescription>
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
            disabled={isPending}
            className="bg-blue-400 hover:bg-blue-500"
            form="lead-form"
          >
            {isPending ? 'Updating...' : 'Update Lead'}
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

export default LeadForm;
