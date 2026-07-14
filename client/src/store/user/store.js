import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./authSlice";

export const makeUserStore = () =>
  configureStore({
    reducer: {
      userAuth: userAuthReducer,
    },
  });
