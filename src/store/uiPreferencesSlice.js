import { createSlice } from "@reduxjs/toolkit";

const uiPreferencesSlice = createSlice({
  name: "uiPreferences",
  initialState: {
    activeTab: "orders",
    ordersSortField: "OrderID",
    ordersSortDirection: "asc",
    ordersFilter: "all",
    ordersPage: 1,
    ordersSearch: "",
    transactionsSortField: "TransactionID",
    transactionsSortDirection: "asc",
    transactionsFilter: "all",
    transactionsPage: 1,
    transactionsSearch: "",
    itemsPerPage: 10,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setOrdersSort: (state, action) => {
      const { field, direction } = action.payload;
      state.ordersSortField = field;
      state.ordersSortDirection = direction;
    },
    setOrdersFilter: (state, action) => {
      state.ordersFilter = action.payload;
    },
    setOrdersPage: (state, action) => {
      state.ordersPage = action.payload;
    },
    setOrdersSearch: (state, action) => {
      state.ordersSearch = action.payload;
      state.ordersPage = 1; // Reset to first page when searching
    },
    setTransactionsSort: (state, action) => {
      const { field, direction } = action.payload;
      state.transactionsSortField = field;
      state.transactionsSortDirection = direction;
    },
    setTransactionsFilter: (state, action) => {
      state.transactionsFilter = action.payload;
    },
    setTransactionsPage: (state, action) => {
      state.transactionsPage = action.payload;
    },
    setTransactionsSearch: (state, action) => {
      state.transactionsSearch = action.payload;
      state.transactionsPage = 1; // Reset to first page when searching
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
    setActiveTab,
    setOrdersSort,
    setOrdersFilter,
    setOrdersPage,
    setOrdersSearch,
    setTransactionsSort,
    setTransactionsFilter,
    setTransactionsPage,
    setTransactionsSearch,
    setItemsPerPage
  } = uiPreferencesSlice.actions;
export default uiPreferencesSlice.reducer;
