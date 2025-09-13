import LeadCard from './lead-card';

type Props = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
};

const LeadsList = ({ leads, onLeadClick }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onLeadClick={onLeadClick} />
      ))}
    </div>
  );
};

export default LeadsList;
