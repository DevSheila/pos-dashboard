import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice";
import transactionsReducer from "./transactionsSlice";
import uiPreferencesReducer from "./uiPreferencesSlice";

export const store = configureStore({
    reducer: {
      orders: ordersReducer,
      transactions: transactionsReducer,
      uiPreferences: uiPreferencesReducer
    }
  });