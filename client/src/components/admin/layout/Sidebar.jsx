"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  LayoutDashboard, CalendarDays, Percent, Ticket,
  Wallet, Megaphone, MousePointerClick, Image as ImageIcon,
  Bell, UserCheck, Wrench, Map,
  LayoutGrid, Hammer, Users, Star,
  CreditCard, Settings, UserPlus, BadgeCheck,
  ReceiptText, BarChart2, LineChart, Scale, FolderOpen,
  Store, Landmark, Banknote, ArrowDownToLine,
} from "lucide-react";
import { useSidebar } from "../../../context/admin/SidebarContext";

// Regular nav items
const navItems = [
    { href: "/admin-dashboard",               label: "Dashboard",               Icon: LayoutDashboard,  color: "#60a5fa" },
    { href: "/admin/booking",                 label: "Booking",                 Icon: CalendarDays,     color: "#4ade80" },
    { href: "/admin/services",                label: "Services",                Icon: Hammer,           color: "#fdba74" },
    { href: "/admin/service-man",             label: "Service Man",             Icon: Wrench,           color: "#a3e635" },
    { href: "/admin/service-vendor",          label: "Service Vendor",          Icon: Store,            color: "#fb923c" },
    { href: "/admin/services-zone-setup",     label: "Services Zone Setup",     Icon: Map,              color: "#38bdf8" },
    { href: "/admin/customers",               label: "Customers",               Icon: Users,            color: "#93c5fd" },
    { href: "/admin/customer-wallet",         label: "Customer Wallet",         Icon: Wallet,           color: "#fde047" },
    { href: "/admin/categories",              label: "Categories",              Icon: LayoutGrid,       color: "#a78bfa" },
    { href: "/admin/employee-list",           label: "Employee List",           Icon: BadgeCheck,       color: "#86efac" },
    { href: "/admin/employee-role-setup",     label: "Employee Role Setup",     Icon: Settings,         color: "#818cf8" },
    { href: "/admin/add-new-employee",        label: "Add New Employee",        Icon: UserPlus,         color: "#67e8f9" },
    { href: "/admin/loyalty-point",           label: "Loyalty Point",           Icon: Star,             color: "#facc15" },
    { href: "/admin/subscription-management", label: "Subscription Management", Icon: CreditCard,       color: "#fb7185" },
];

// Items rendered after the Transactions group
const navItemsAfter = [
    { href: "/admin/reports",                 label: "Reports",                 Icon: BarChart2,        color: "#f9a8d4" },
    { href: "/admin/analytics",               label: "Analytics",               Icon: LineChart,        color: "#5eead4" },
    { href: "/admin/legal-pages",             label: "Legal Pages",             Icon: Scale,            color: "#fca5a5" },
    { href: "/admin/wallet-bonus",            label: "Wallet Bonus",            Icon: Wallet,           color: "#facc15" },
    { href: "/admin/campaigns",               label: "Campaigns",               Icon: Megaphone,        color: "#f87171" },
    { href: "/admin/advertisements",          label: "Advertisements",          Icon: MousePointerClick, color: "#c084fc" },
    { href: "/admin/promotional-banners",     label: "Promotional Banners",     Icon: ImageIcon,        color: "#22d3ee" },
    { href: "/admin/send-notifications",      label: "Send Notification",       Icon: Bell,             color: "#fbbf24" },
    { href: "/admin/onboarding-request",      label: "Onboarding Request",      Icon: UserCheck,        color: "#2dd4bf" },
    { href: "/admin/discount",                label: "Discount",                Icon: Percent,          color: "#fb923c" },
    { href: "/admin/coupons",                 label: "Coupons",                 Icon: Ticket,           color: "#f472b6" },
    { href: "/admin/file-manager",            label: "File Manager",            Icon: FolderOpen,       color: "#fcd34d" },
];

// Transaction sub-items
const transactionChildren = [
    { href: "/admin/all-transactions", label: "All Transactions", Icon: ReceiptText,       color: "#d8b4fe" },
    { href: "/admin/withdraws",        label: "Withdraw",         Icon: ArrowDownToLine,   color: "#34d399" },
];

function NavLink({ href, label, Icon, color, collapsed, indent = false }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            title={collapsed ? label : ""}
            className="flex items-center py-3 transition-colors hover:bg-[#334155] mx-2 rounded-lg"
            style={{
                justifyContent: collapsed ? "center" : "flex-start",
                paddingLeft: collapsed ? "0" : indent ? "36px" : "24px",
                paddingRight: collapsed ? "0" : "16px",
                background: isActive ? "#1e293b" : "transparent",
            }}
        >
            <Icon size={indent ? 18 : 22} color={color} style={{ flexShrink: 0 }} />
            {!collapsed && (
                <span style={{
                    color: isActive ? "#ffffff" : "#cbd5e1",
                    fontSize: indent ? "13px" : "15px",
                    fontWeight: indent ? "400" : "500",
                    marginLeft: "14px",
                    whiteSpace: "nowrap",
                }}>
                    {label}
                </span>
            )}
        </Link>
    );
}

export default function Sidebar() {
    const { collapsed, toggle } = useSidebar();
    const pathname = usePathname();

    // Auto-open the group if we're on a transaction page
    const isOnTransaction = transactionChildren.some(c => pathname === c.href);
    const [txOpen, setTxOpen] = useState(isOnTransaction);

    return (
        <aside
            className="fixed top-0 left-0 h-screen bg-[#000000] z-50 flex flex-col transition-all duration-300"
            style={{ width: collapsed ? "64px" : "256px" }}
        >
            {/* Header — Logo + Hamburger */}
            <div style={{
                height: "64px",
                minHeight: "64px",
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #334155",
                flexShrink: 0,
                paddingLeft: "12px",
                paddingRight: "12px",
                background: "#000000",
                overflow: "visible",
            }}>
                {!collapsed && (
                    <Image
                        src="/Ondemand-icon.png"
                        alt="Logo"
                        width={100}
                        height={36}
                        loading="eager"
                        style={{ width: "100px", height: "auto", flexShrink: 0 }}
                    />
                )}
                <button
                    onClick={toggle}
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "6px",
                        border: "2px solid #475569",
                        background: "#334155",
                        color: "#ffffff",
                        cursor: "pointer",
                        flexShrink: 0,
                        zIndex: 100,
                    }}
                >
                    {collapsed ? (
                        <ChevronRight size={24} color="#ffffff" />
                    ) : (
                        <ChevronLeft size={24} color="#ffffff" />
                    )}
                </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto sidebar-right-scroll">
                <nav className="py-4">

                    {/* Regular items before Transactions */}
                    {navItems.map(item => (
                        <NavLink key={item.href} {...item} collapsed={collapsed} />
                    ))}

                    {/* ── Transactions Group ── */}
                    <button
                        onClick={() => { if (!collapsed) setTxOpen(o => !o); }}
                        title={collapsed ? "Transactions" : ""}
                        className="flex items-center w-full py-3 transition-colors hover:bg-[#334155] mx-2 rounded-lg"
                        style={{
                            width: "calc(100% - 16px)",
                            justifyContent: collapsed ? "center" : "flex-start",
                            paddingLeft: collapsed ? "0" : "24px",
                            paddingRight: collapsed ? "0" : "16px",
                            background: isOnTransaction ? "#1e293b" : "transparent",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <Banknote size={22} color="#d8b4fe" style={{ flexShrink: 0 }} />
                        {!collapsed && (
                            <>
                                <span style={{ color: "#cbd5e1", fontSize: "15px", fontWeight: "500", marginLeft: "14px", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
                                    Transactions
                                </span>
                                {txOpen
                                    ? <ChevronUp size={18} color="#94a3b8" />
                                    : <ChevronDown size={18} color="#94a3b8" />
                                }
                            </>
                        )}
                    </button>

                    {/* Sub-items — shown when expanded (or always show icons when collapsed) */}
                    {(txOpen || collapsed) && transactionChildren.map(item => (
                        <NavLink key={item.href} {...item} collapsed={collapsed} indent={!collapsed} />
                    ))}

                    {/* Items after Transactions */}
                    {navItemsAfter.map(item => (
                        <NavLink key={item.href} {...item} collapsed={collapsed} />
                    ))}

                </nav>
            </div>
        </aside>
    );
}

