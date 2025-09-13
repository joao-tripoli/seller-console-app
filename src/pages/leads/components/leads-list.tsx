import { Skeleton } from '@/components/ui/skeleton';
import LeadCard from './lead-card';

type Props = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
  isLoading: boolean;
};

const LeadCardSkeleton = () => {
  return (
    <div className="w-full border border-gray-200 rounded-md p-4 relative">
      <Skeleton className="h-5 w-3/4 mb-2" />

      <Skeleton className="absolute top-4 right-4 h-6 w-12 rounded-full" />

      <div className="flex flex-col items-start gap-0.5 mt-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-16 mt-1" />
      </div>

      <Skeleton className="absolute bottom-4 right-4 h-8 w-24" />
    </div>
  );
};

const LeadsList = ({ leads, onLeadClick, onConvertLead, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <LeadCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onLeadClick={onLeadClick}
          onConvertLead={onConvertLead}
        />
      ))}
    </div>
  );
};

export default LeadsList;
