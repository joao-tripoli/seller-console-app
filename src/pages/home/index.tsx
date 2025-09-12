import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useQueryLeads from '@/hooks/queries/useQueryLeads';
import { Search, SortAsc, SortDesc, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import LeadsList from './components/leads-list';

const home = () => {
  const [sort, setSort] = useState<'asc' | 'desc' | ''>('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const { data: leads } = useQueryLeads();

  const clearAllFilters = () => {
    setSort('');
    setSearch('');
    setStatus('');
  };

  const hasActiveFilters = search !== '' || status !== '' || sort !== '';

  const filteredLeads = useMemo(() => {
    if (!leads) return [];

    let filtered = leads;

    // Filter by search term (name or company)
    filtered = leads.filter((lead) => {
      const searchTerm = search.toLowerCase();

      return (
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm)
      );
    });

    if (status && status !== '') {
      filtered = filtered.filter((lead) => lead.status === status);
    }

    // Sort by score
    return filtered.sort((a, b) => {
      if (sort === '') {
        return 0;
      }

      if (sort === 'asc') {
        return a.score - b.score;
      }
      return b.score - a.score;
    });
  }, [leads, sort, search, status]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-left">Leads</h1>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-9 px-3"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              placeholder="Search by name or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
          >
            Score
            {sort === 'asc' ? <SortAsc /> : <SortDesc />}
          </Button>
        </div>
      </div>

      <LeadsList leads={filteredLeads} />
      {/* <LeadsTable /> */}
    </div>
  );
};

export default home;
