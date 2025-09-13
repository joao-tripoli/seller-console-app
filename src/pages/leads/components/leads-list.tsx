import LeadCard from './lead-card';

type Props = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
};

const LeadsList = ({ leads, onLeadClick, onConvertLead }: Props) => {
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
