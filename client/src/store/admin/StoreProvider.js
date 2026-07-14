"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

/**
 * Wraps the admin app in a Redux Provider. The store is created once per
 * client (kept in a ref) so it survives re-renders but is not shared across
 * requests on the server.
 */
export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
