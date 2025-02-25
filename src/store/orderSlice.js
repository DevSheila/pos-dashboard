import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.lastFetched = Date.now();
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
    fetchOrdersStart, 
    fetchOrdersSuccess, 
    fetchOrdersFailure 
  } = ordersSlice.actions;
export default ordersSlice.reducer;
