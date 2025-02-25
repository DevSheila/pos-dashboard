
import apiService from "@/services/apiService";
import {
  fetchTransactionsStart,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} from "@/store/transactionsSlice";
import useDataFetcher from "./useDataFetcher";

// Hook for transactions data
const useTransactions = () => {
  return useDataFetcher(
    (state) => state.transactions,
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFailure,
    apiService.fetchTransactions
  );
};

export default useTransactions;
