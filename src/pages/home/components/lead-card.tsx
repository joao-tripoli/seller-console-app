import { Button } from '@/components/ui/button';
import ScoreBadge from '@/components/ui/score-badge';

type Props = {
  lead: Lead;
};

const LeadCard = ({ lead }: Props) => {
  return (
    <div className="w-full border border-gray-200 rounded-md p-4 relative">
      <div className="flex items-center gap-2">{lead.name}</div>

      <ScoreBadge score={lead.score} className="absolute top-4 right-4" />

      <div className="flex flex-col items-start gap-0.5 mt-2">
        <span className="text-xs text-gray-400">{lead.company}</span>
        <span className="text-xs text-gray-400">{lead.email}</span>
        <span className="text-xs text-gray-400">{lead.source}</span>
        <span className="text-xs text-gray-400">{lead.status}</span>
      </div>

      <Button className="absolute bottom-4 right-4 bg-blue-400 hover:bg-blue-500 h-8">
        Convert lead
      </Button>
    </div>
  );
};

export default LeadCard;
