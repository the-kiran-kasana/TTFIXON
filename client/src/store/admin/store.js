import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./customersSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      customers: customersReducer,
    },
  });
