"use client";

import { useSidebar } from "../../../context/admin/SidebarContext";

export default function MainContent({ children }) {
    const { collapsed } = useSidebar();
    return (
        <main
            className="mt-16 h-[calc(100vh-64px)] overflow-y-auto bg-gray-100 transition-all duration-300"
            style={{ marginLeft: collapsed ? "64px" : "256px", padding: "24px" }}
        >
            {children}
        </main>
    );
}
