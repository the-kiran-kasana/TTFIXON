"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { adminAuthApi } from "@/lib/adminApi";

const TOKEN_KEY = "admin_token";
const ADMIN_KEY = "admin_user";

const AdminAuthContext = createContext(null);

function setCookie(name, value, days = 7) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate auth state from localStorage on first mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedAdmin = localStorage.getItem(ADMIN_KEY);
      if (savedToken) setToken(savedToken);
      if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
    } catch {
      // ignore corrupt storage
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await adminAuthApi.login(email, password);
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    // cookie lets proxy.js gate navigation server-side
    setCookie(TOKEN_KEY, data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    deleteCookie(TOKEN_KEY);
  }, []);

  const value = {
    admin,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return ctx;
}
