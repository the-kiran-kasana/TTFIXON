"use client";

import { usePathname } from "next/navigation";
import { AdminAuthProvider } from "@/context/admin/AuthContext";
import AdminAuthGuard from "@/components/admin/auth/AdminAuthGuard";
import AdminShell from "@/components/admin/layout/AdminShell";
import StoreProvider from "@/store/admin/StoreProvider";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <StoreProvider>
      <AdminAuthProvider>
        {isLoginPage ? (
          children
        ) : (
          <AdminAuthGuard>
            <AdminShell>{children}</AdminShell>
          </AdminAuthGuard>
        )}
      </AdminAuthProvider>
    </StoreProvider>
  );
}
