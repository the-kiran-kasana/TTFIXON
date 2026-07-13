"use client";

// import WeatherWidget from "./WeatherWidget";
import StatCards from "./StatCards";
import QuickStats from "./QuickStats";
import RevenueChart from "./RevenueChart";
import BookingStatusChart from "./BookingStatusChart";
import ServiceDistribution from "./ServiceDistribution";
import ProviderPerformance from "./ProviderPerformance";
import KeyMetrics from "./KeyMetrics";
import RecentBookings from "./RecentBookings";
// import AlertsFeed from "./AlertsFeed";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
        <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "2px" }}>Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
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
