import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ScoreBadge from '@/components/ui/score-badge';

type Props = {
  lead: Lead;
  onLeadClick: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
};

const LeadCard = ({ lead, onLeadClick, onConvertLead }: Props) => {
  return (
    <div
      className="w-full border border-gray-200 rounded-md p-4 relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] hover:border-blue-200 hover:bg-blue-50/20 group"
      onClick={() => onLeadClick(lead)}
    >
      <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
        {lead.name}
      </div>

      <ScoreBadge score={lead.score} className="absolute top-4 right-4" />

      <div className="flex flex-col items-start gap-0.5 mt-2">
        <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
          {lead.company}
        </span>
        <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
          {lead.email}
        </span>
        <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
          {lead.source}
        </span>
        <Badge variant={lead.status}>{lead.status}</Badge>
      </div>

      <Button
        className="absolute bottom-4 right-4 bg-blue-400 hover:bg-blue-500 h-8 group-hover:bg-blue-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onConvertLead(lead);
        }}
      >
        Convert lead
      </Button>
    </div>
  );
};

export default LeadCard;
