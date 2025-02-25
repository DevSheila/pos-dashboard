import { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } from '@/store/orderSlice';
import useDataFetcher from './useDataFetcher';

import apiService from '@/services/apiService';

// Hook for orders data
const useOrders = () => {
    return useDataFetcher(
      state => state.orders,
      fetchOrdersStart,
      fetchOrdersSuccess,
      fetchOrdersFailure,
      apiService.fetchOrders
    );
  };
  

export default useOrders;
