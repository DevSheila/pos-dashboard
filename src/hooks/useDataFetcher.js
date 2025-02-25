import { useDispatch, useSelector } from 'react-redux';
import apiService from '@/services/apiService';

// Hook for data fetching with cache validation
const useDataFetcher = (selector, fetchStartAction, fetchSuccessAction, fetchFailureAction, fetchFunction) => {
    const dispatch = useDispatch();
    const { data, loading, error, lastFetched } = useSelector(selector);
    
    const fetchData = async (forceRefresh = false) => {
      // Check if we need to fetch or can use cached data
      const now = Date.now();
      const isCacheValid = lastFetched && (now - lastFetched < apiService.CACHE_DURATION);
      
      if (!forceRefresh && data.length > 0 && isCacheValid) {
        // Use cached data
        return;
      }
      
      try {
        dispatch(fetchStartAction());
        const result = await fetchFunction();
        dispatch(fetchSuccessAction(result));
      } catch (err) {
        dispatch(fetchFailureAction(err.message || 'Failed to fetch data'));
      }
    };
    
    return { data, loading, error, fetchData, lastFetched };
  };
export default useDataFetcher;
