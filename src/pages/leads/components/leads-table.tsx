import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';

import ScoreBadge from '@/components/ui/score-badge';
import { type ColumnDef } from '@tanstack/react-table';

type Props = {
  leads: Lead[];
  isLoading: boolean;
  onLeadClick: (lead: Lead) => void;
  onConvertLead: (lead: Lead) => void;
};

const LeadsTable = ({
  leads,
  isLoading,
  onLeadClick,
  onConvertLead,
}: Props) => {
  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ getValue }) => (
        <div className="text-left">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ getValue }) => (
        <div className="text-left">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ getValue }) => (
        <div className="text-left">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ getValue }) => (
        <div className="text-left">{getValue() as string}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <Badge variant={getValue() as Lead['status']}>
          {getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'score',
      header: 'Score',
      cell: ({ getValue }) => <ScoreBadge score={getValue() as number} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const lead = row.original;

        return (
          <Button
            className="bg-blue-400 hover:bg-blue-500 h-8 group-hover:bg-blue-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onConvertLead(lead);
            }}
          >
            Convert lead
          </Button>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={leads}
      isLoading={isLoading}
      onRowClick={onLeadClick}
    />
  );
};

export default LeadsTable;
