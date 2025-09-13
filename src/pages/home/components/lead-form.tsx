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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const leadUpdateSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  status: z.enum(['active', 'pending', 'inactive'], {
    error: 'Please select a status',
  }),
});

type LeadUpdateFormData = z.infer<typeof leadUpdateSchema>;

type Props = Pick<DrawerProps, 'open' | 'onClose'> & {
  lead: Lead | null;
};

const LeadForm = ({ open, onClose, lead }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<LeadUpdateFormData>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      email: lead?.email || '',
      status: (lead?.status as 'active' | 'pending' | 'inactive') || 'active',
    },
  });

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      reset({
        email: lead.email,
        status: lead.status as 'active' | 'pending' | 'inactive',
      });
    }
  }, [lead, reset]);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleFormSubmit = async (data: LeadUpdateFormData) => {
    try {
      console.log(data);
      onClose?.();
      reset();
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const handleClose = () => {
    onClose?.();
    reset();
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
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4 p-4"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>

              <Select
                value={watch('status')}
                onValueChange={(value) =>
                  setValue('status', value as 'active' | 'pending' | 'inactive')
                }
              >
                <SelectTrigger
                  className={cn(
                    errors.status ? 'border-red-500' : '',
                    'w-full min-w-full'
                  )}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          </form>
        </div>

        <DrawerFooter className="mt-auto">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-400 hover:bg-blue-500"
          >
            {isSubmitting ? 'Updating...' : 'Update Lead'}
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
