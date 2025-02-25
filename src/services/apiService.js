import sampleOrders from "../data/order_data.json";
import sampleTransactions from "../data/transaction_data.json";

// API service with cache control
const apiService = {
  // Cache duration in milliseconds (5 minutes)
  CACHE_DURATION: 5 * 60 * 1000,

  // Fetch orders with cache validation
  async fetchOrders() {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleOrders);
      }, 500); // Simulate network delay
    });
  },

  // Fetch transactions with cache validation
  async fetchTransactions() {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleTransactions);
      }, 500); // Simulate network delay
    });
  },
};

export default apiService;
