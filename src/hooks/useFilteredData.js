import { useMemo } from 'react';

// Hook for sorting and filtering data
const useFilteredData = (data, searchTerm, filterField, filterValue, sortField, sortDirection) => {
    return useMemo(() => {
      return data
        .filter(item => {
          // Search across all fields
          const matchesSearch = Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          // Apply field-specific filter
          const matchesFilter = filterValue === 'all' || item[filterField] === filterValue;
          
          return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
          // Sort numerically for number fields
          if (typeof a[sortField] === 'number') {
            return sortDirection === 'asc' 
              ? a[sortField] - b[sortField] 
              : b[sortField] - a[sortField];
          } 
          // Sort alphabetically for string fields
          else {
            return sortDirection === 'asc'
              ? String(a[sortField]).localeCompare(String(b[sortField]))
              : String(b[sortField]).localeCompare(String(a[sortField]));
          }
        });
    }, [data, searchTerm, filterField, filterValue, sortField, sortDirection]);
  };

export default useFilteredData;
