"use client";

// import WeatherWidget from "../../components/dashboard/WeatherWidget";
import StatCards from "../../components/dashboard/StatCards";
import QuickStats from "../../components/dashboard/QuickStats";
import RevenueChart from "../../components/dashboard/RevenueChart";
import BookingStatusChart from "../../components/dashboard/BookingStatusChart";
import ServiceDistribution from "../../components/dashboard/ServiceDistribution";
import ProviderPerformance from "../../components/dashboard/ProviderPerformance";
import KeyMetrics from "../../components/dashboard/KeyMetrics";
import RecentBookings from "../../components/dashboard/RecentBookings";
// import AlertsFeed from "../../components/dashboard/AlertsFeed";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "2px" }}>Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Weather
      <WeatherWidget /> */}

      {/* Stat Cards */}
      <StatCards />

      {/* Quick Stats */}
      <QuickStats />

      {/* Revenue Chart (full width) */}
      <RevenueChart />

      {/* Donut + Pie side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        <BookingStatusChart />
        <ServiceDistribution />
      </div>

      {/* Provider Performance (full width) */}
      <ProviderPerformance />

      {/* Key Metrics */}
      <KeyMetrics />

      {/* Recent Bookings (full width) */}
      <RecentBookings />

      {/* Alerts Feed
      <AlertsFeed /> */}

    </div>
  );
}

