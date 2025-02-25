import { useMemo } from 'react';

// Hook for paginating data
const usePagination = (data, currentPage, itemsPerPage) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
    
    return { paginatedData, totalPages };
  };

export default usePagination;
