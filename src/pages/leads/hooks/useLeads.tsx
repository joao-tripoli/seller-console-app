import useQueryLeads from '@/hooks/queries/useQueryLeads';
import useDebounce from '@/hooks/useDebounce';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useCallback, useMemo, useState } from 'react';

// Define the filter state type
type FilterState = {
  sort: 'asc' | 'desc' | '';
  search: string;
  status: string;
};

// localStorage key for filters
const FILTERS_STORAGE_KEY = 'leads-filters';

const useLeads = () => {
  // Use localStorage for filter persistence
  const [filters, setFilters] = useLocalStorage<FilterState>(
    FILTERS_STORAGE_KEY,
    {
      sort: '',
      search: '',
      status: '',
    }
  );

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);

  const { data: leads } = useQueryLeads();

  // Debounce the search term with 300ms delay
  const debouncedSearch = useDebounce(filters.search, 300);

  // Individual setters for each filter
  const setSort = useCallback(
    (sort: 'asc' | 'desc' | '') => {
      setFilters((prev) => ({ ...prev, sort }));
    },
    [setFilters]
  );

  const setSearch = useCallback(
    (search: string) => {
      setFilters((prev) => ({ ...prev, search }));
    },
    [setFilters]
  );

  const setStatus = useCallback(
    (status: string) => {
      setFilters((prev) => ({ ...prev, status }));
    },
    [setFilters]
  );

  const clearAllFilters = useCallback(() => {
    setFilters({
      sort: '',
      search: '',
      status: '',
    });
  }, [setFilters]);

  const hasActiveFilters =
    filters.search !== '' || filters.status !== '' || filters.sort !== '';

  const filteredLeads = useMemo(() => {
    if (!leads) return [];

    let filtered = leads;

    // Filter by search term (name or company) using debounced search
    filtered = leads.filter((lead) => {
      const searchTerm = debouncedSearch.toLowerCase();

      return (
        lead.name.toLowerCase().includes(searchTerm) ||
        lead.company.toLowerCase().includes(searchTerm)
      );
    });

    if (filters.status && filters.status !== '') {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    // Sort by score
    return filtered.sort((a, b) => {
      if (filters.sort === '') {
        return 0;
      }

      if (filters.sort === 'asc') {
        return a.score - b.score;
      }
      return b.score - a.score;
    });
  }, [leads, filters.sort, debouncedSearch, filters.status]);

  const handleConvertLead = useCallback((lead: Lead) => {
    setLeadToConvert(lead);
  }, []);

  const handleCloseConvertForm = useCallback(() => {
    setLeadToConvert(null);
  }, []);

  return {
    filteredLeads,
    clearAllFilters,
    hasActiveFilters,
    status: filters.status,
    setStatus,
    search: filters.search,
    setSearch,
    sort: filters.sort,
    setSort,
    selectedLead,
    setSelectedLead,
    leadToConvert,
    handleConvertLead,
    handleCloseConvertForm,
  };
};

export default useLeads;
