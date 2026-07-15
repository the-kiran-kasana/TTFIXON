"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { hydrate } from "./slices/userAuthSlice";

/**
 * Single Redux Provider for the entire app.
 * - On mount it hydrates the user auth state from localStorage.
 * - Used in both the admin layout and the user layout.
 */
export default function ReduxProvider({ children }) {
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      store.dispatch(hydrate());
      hydrated.current = true;
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
