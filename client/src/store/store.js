import { configureStore } from "@reduxjs/toolkit";
import vendorReducer    from "./slices/vendorSlice";
import servicemanReducer from "./slices/servicemanSlice";
import zoneReducer      from "./slices/zoneSlice";
import categoryReducer  from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    vendors:    vendorReducer,
    servicemen: servicemanReducer,
    zones:      zoneReducer,
    categories: categoryReducer,
  },
});
