"use client";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { SidebarProvider } from "../../../context/admin/SidebarContext";

export default function AdminShell({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <SidebarProvider>
        <Navbar />
        <Sidebar />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </div>
  );
}
