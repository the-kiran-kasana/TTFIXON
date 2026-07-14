"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/admin/AuthContext";

/**
 * Client-side guard: blocks rendering of the admin panel until the admin
 * is authenticated. Redirects to /admin/login otherwise.
 * (proxy.js enforces the same rule server-side; this covers client transitions.)
 */
export default function AdminAuthGuard({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  return children;
}
