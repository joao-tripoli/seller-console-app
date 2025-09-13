import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import useQueryOpportunities from '@/hooks/queries/useQueryOpportunities';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'accountName',
    header: 'Account',
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'stage',
    header: 'Stage',
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: 'amount',
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return (
        <div className="text-left">
          {amount ? `$${amount.toLocaleString()}` : 'N/A'}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const OpportunitiesTable = () => {
  const { data, isLoading } = useQueryOpportunities();

  return <DataTable columns={columns} data={data} isLoading={isLoading} />;
};

export default OpportunitiesTable;
