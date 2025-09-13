import useQueryLeads from '@/hooks/queries/useQueryLeads';
import { useCallback, useMemo, useState } from 'react';

const useLeads = () => {
  const [sort, setSort] = useState<'asc' | 'desc' | ''>('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data: leads } = useQueryLeads();

  const clearAllFilters = useCallback(() => {
    setSort('');
    setSearch('');
    setStatus('');
  }, []);

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

  return {
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
  };
};

export default useLeads;
