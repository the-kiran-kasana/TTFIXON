"use client";

import Image from "next/image";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSidebar } from "../../context/SidebarContext";
import {
    MdDashboard, MdCalendarMonth, MdPercent, MdConfirmationNumber,
    MdAccountBalanceWallet, MdCampaign, MdAdsClick, MdPhotoLibrary,
    MdNotifications, MdHowToReg, MdHandyman, MdPayments, MdMap,
    MdCategory, MdHomeRepairService, MdGroup, MdWallet, MdStar,
    MdSubscriptions, MdManageAccounts, MdBadge, MdPersonAdd,
    MdReceiptLong, MdBarChart, MdAnalytics, MdGavel, MdFolder,
} from "react-icons/md";

const navItems = [
    { href: "/dashboard",               label: "Dashboard",               Icon: MdDashboard,            color: "#60a5fa" },
    { href: "/booking",                 label: "Booking",                 Icon: MdCalendarMonth,        color: "#4ade80" },
    { href: "/discount",                label: "Discount",                Icon: MdPercent,              color: "#fb923c" },
    { href: "/coupons",                 label: "Coupons",                 Icon: MdConfirmationNumber,   color: "#f472b6" },
    { href: "/wallet-bonus",            label: "Wallet Bonus",            Icon: MdAccountBalanceWallet, color: "#facc15" },
    { href: "/campaigns",               label: "Campaigns",               Icon: MdCampaign,             color: "#f87171" },
    { href: "/advertisements",          label: "Advertisements",          Icon: MdAdsClick,             color: "#c084fc" },
    { href: "/promotional-banners",     label: "Promotional Banners",     Icon: MdPhotoLibrary,         color: "#22d3ee" },
    { href: "/send-notifications",      label: "Send Notification",       Icon: MdNotifications,        color: "#fbbf24" },
    { href: "/onboarding-request",      label: "Onboarding Request",      Icon: MdHowToReg,             color: "#2dd4bf" },
    { href: "/providers",               label: "Providers",               Icon: MdHandyman,             color: "#a3e635" },
    { href: "/withdraws",               label: "Withdraws",               Icon: MdPayments,             color: "#34d399" },
    { href: "/services-zone-setup",     label: "Services Zone Setup",     Icon: MdMap,                  color: "#38bdf8" },
    { href: "/categories",              label: "Categories",              Icon: MdCategory,             color: "#a78bfa" },
    { href: "/services",                label: "Services",                Icon: MdHomeRepairService,    color: "#fdba74" },
    { href: "/customers",               label: "Customers",               Icon: MdGroup,                color: "#93c5fd" },
    { href: "/customer-wallet",         label: "Customer Wallet",         Icon: MdWallet,               color: "#fde047" },
    { href: "/loyalty-point",           label: "Loyalty Point",           Icon: MdStar,                 color: "#facc15" },
    { href: "/subscription-management", label: "Subscription Management", Icon: MdSubscriptions,        color: "#fb7185" },
    { href: "/employee-role-setup",     label: "Employee Role Setup",     Icon: MdManageAccounts,       color: "#818cf8" },
    { href: "/employee-list",           label: "Employee List",           Icon: MdBadge,                color: "#86efac" },
    { href: "/add-new-employee",        label: "Add New Employee",        Icon: MdPersonAdd,            color: "#67e8f9" },
    { href: "/all-transactions",        label: "All Transactions",        Icon: MdReceiptLong,          color: "#d8b4fe" },
    { href: "/reports",                 label: "Reports",                 Icon: MdBarChart,             color: "#f9a8d4" },
    { href: "/analytics",               label: "Analytics",               Icon: MdAnalytics,            color: "#5eead4" },
    { href: "/legal-pages",             label: "Legal Pages",             Icon: MdGavel,                color: "#fca5a5" },
    { href: "/file-manager",            label: "File Manager",            Icon: MdFolder,               color: "#fcd34d" },
];

export default function Sidebar() {
    const { collapsed, toggle } = useSidebar();

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
                overflow: "visible"
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
                        zIndex: 100
                    }}
                >
                    {collapsed ? (
                        <MdChevronRight size={24} color="#ffffff" />
                    ) : (
                        <MdChevronLeft size={24} color="#ffffff" />
                    )}
                </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto sidebar-right-scroll">
                <nav className="py-4">
                    {navItems.map(({ href, label, Icon, color }) => (
                        <Link
                            key={href}
                            href={href}
                            title={collapsed ? label : ""}
                            className="flex items-center py-3 transition-colors hover:bg-[#334155] mx-2 rounded-lg"
                            style={{
                                justifyContent: collapsed ? "center" : "flex-start",
                                paddingLeft: collapsed ? "0" : "24px",
                                paddingRight: collapsed ? "0" : "16px",
                            }}
                        >
                            <Icon size={22} color={color} style={{ flexShrink: 0 }} />
                            {!collapsed && (
                                <span style={{ color: "#ffffff", fontSize: "15px", fontWeight: "500", marginLeft: "14px", whiteSpace: "nowrap" }}>
                                    {label}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
