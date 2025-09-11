import DataTable from '@/components/ui/data-table';
import useQueryLeads from '@/hooks/queries/useQueryLeads';
import { type ColumnDef } from '@tanstack/react-table';

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
];

const LeadsTable = () => {
  const { data } = useQueryLeads();

  return <DataTable columns={columns} data={data} />;
};

export default LeadsTable;
