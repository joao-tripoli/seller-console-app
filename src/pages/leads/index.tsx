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
import { cn } from '@/lib/utils';
import { List, Search, SortAsc, SortDesc, Table, X } from 'lucide-react';
import { lazy, Suspense } from 'react';
import ConvertLeadForm from './components/convert-lead-form';
import LeadForm from './components/lead-form';
import LeadsList from './components/leads-list';
import useLeads from './hooks/useLeads';

const LeadsTable = lazy(() => import('./components/leads-table'));

const Leads = () => {
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
    leadToConvert,
    handleConvertLead,
    handleCloseConvertForm,
    isMobile,
    view,
    setView,
    isLoading,
  } = useLeads();

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2 mb-4">
        <div className="order-1 col-span-2 sm:col-span-3 lg:col-span-1 flex items-center gap-2 justify-between">
          <h1 className="text-3xl text-left">Leads</h1>

          {/* View Toggle Button - only shows on desktop */}
          {!isMobile && (
            <div className="flex border rounded-md">
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
                className="rounded-r-none border-r"
              >
                <List className="h-4 w-4" />
              </Button>

              <Button
                variant={view === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('table')}
                className="rounded-l-none"
              >
                <Table className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Clear All Filters Button - only shows when needed */}
        <div
          className={cn('order-2 col-span-1', !hasActiveFilters && 'invisible')}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-9 px-3 w-full sm:w-auto"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>

        {/* Sort Button */}
        <div className="order-4 sm:order-4 lg:order-5 col-span-1">
          <Button
            variant="outline"
            onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}
            className="w-full"
          >
            Score
            {sort === 'asc' ? <SortAsc /> : <SortDesc />}
          </Button>
        </div>

        {/* Status Select */}
        <div className="order-5 sm:order-5 col-span-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
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
        </div>

        {/* Search Input */}
        <div className="order-6 lg:order-6 col-span-3 sm:col-span-3 ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />

            <Input
              placeholder="Search by name or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Conditionally render based on view and mobile status */}
      {view === 'list' ? (
        <LeadsList
          leads={filteredLeads}
          onLeadClick={setSelectedLead}
          onConvertLead={handleConvertLead}
          isLoading={isLoading}
        />
      ) : (
        <Suspense
          fallback={
            <div className="flex justify-center p-8">Loading table...</div>
          }
        >
          <LeadsTable
            leads={filteredLeads}
            isLoading={isLoading}
            onLeadClick={setSelectedLead}
            onConvertLead={handleConvertLead}
          />
        </Suspense>
      )}

      <LeadForm
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />

      <ConvertLeadForm
        open={!!leadToConvert}
        onClose={handleCloseConvertForm}
        lead={leadToConvert}
      />
    </div>
  );
};

export default Leads;
