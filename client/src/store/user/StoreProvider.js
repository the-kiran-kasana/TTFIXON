"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeUserStore } from "./store";
import { hydrate } from "./authSlice";

/**
 * Wraps the user (customer) app in a Redux Provider and rehydrates the
 * auth state from localStorage on mount.
 */
export default function UserStoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeUserStore();
  }

  useEffect(() => {
    storeRef.current.dispatch(hydrate());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
