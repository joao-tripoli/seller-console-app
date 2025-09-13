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
import { Search, SortAsc, SortDesc, X } from 'lucide-react';
import LeadForm from './components/lead-form';
import LeadsList from './components/leads-list';
import useLeads from './hooks/useLeads';

const home = () => {
  const {
    filteredLeads,
    clearAllFilters,
    hasActiveFilters,
    status,
    setStatus,
    search,
    setSearch,
    sort,
    setSort,
    selectedLead,
    setSelectedLead,
  } = useLeads();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-left">Leads</h1>

        <LeadForm open={!!selectedLead} onClose={() => setSelectedLead(null)} />

        <div className="flex items-center gap-2">
          {/* Clear All Filters Button */}
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

          {/* Status Select */}
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

      <LeadsList leads={filteredLeads} onLeadClick={setSelectedLead} />
      {/* <LeadsTable /> */}
    </div>
  );
};

export default home;
