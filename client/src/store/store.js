import { configureStore } from "@reduxjs/toolkit";

// Admin slices
import vendorReducer     from "./slices/vendorSlice";
import servicemanReducer from "./slices/servicemanSlice";
import zoneReducer       from "./slices/zoneSlice";
import categoryReducer   from "./slices/categorySlice";
import customersReducer  from "./slices/customersSlice";

// User slices
import userAuthReducer   from "./slices/userAuthSlice";

export const store = configureStore({
  reducer: {
    // ── admin ──────────────────────────────────────
    vendors:    vendorReducer,
    servicemen: servicemanReducer,
    zones:      zoneReducer,
    categories: categoryReducer,
    customers:  customersReducer,
    // ── user ───────────────────────────────────────
    userAuth:   userAuthReducer,
  },
});
