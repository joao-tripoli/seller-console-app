import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/data-table';
import useQueryLeads from '@/hooks/queries/useQueryLeads';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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
    accessorKey: 'score',
    cell: ({ getValue }) => (
      <div className="text-left">{getValue() as string}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const LeadsTable = () => {
  const { data } = useQueryLeads();

  return <DataTable columns={columns} data={data} />;
};

export default LeadsTable;
