"use client";
import { MdTrendingUp, MdTrendingDown, MdLightbulb, MdBarChart, MdPeople, MdLocationOn } from "react-icons/md";

const kpis = [
  { label: "Revenue Growth", value: "+12.5%", trend: "up", sub: "vs last month", color: "#10b981", bg: "#f0fdf4", icon: <MdTrendingUp size={28} color="#10b981" /> },
  { label: "Booking Growth", value: "+8.3%", trend: "up", sub: "vs last month", color: "#6366f1", bg: "#eef2ff", icon: <MdBarChart size={28} color="#6366f1" /> },
  { label: "Customer Retention", value: "78%", trend: "up", sub: "industry avg 65%", color: "#f59e0b", bg: "#fffbeb", icon: <MdPeople size={28} color="#f59e0b" /> },
  { label: "Provider Utilization", value: "82%", trend: "up", sub: "+5% vs last quarter", color: "#3b82f6", bg: "#eff6ff", icon: <MdLocationOn size={28} color="#3b82f6" /> },
];

const topServices = [
  { name: "Deep Cleaning", pct: 92, bookings: 415 },
  { name: "AC Service", pct: 85, bookings: 521 },
  { name: "Wiring Fix", pct: 74, bookings: 302 },
  { name: "Pipe Repair", pct: 68, bookings: 189 },
  { name: "Wall Painting", pct: 60, bookings: 234 },
];

const topAreas = [
  { name: "Mumbai - Andheri", pct: 88, demand: "Very High" },
  { name: "Delhi - Dwarka", pct: 76, demand: "High" },
  { name: "Bangalore - Koramangala", pct: 71, demand: "High" },
  { name: "Chennai - Adyar", pct: 58, demand: "Medium" },
  { name: "Hyderabad - Banjara Hills", pct: 52, demand: "Medium" },
];

const insights = [
  { icon: "🤖", title: "Demand Surge Expected", desc: "Cleaning services demand predicted to rise 35% next weekend based on seasonal trends.", color: "#eef2ff", border: "#c7d2fe" },
  { icon: "📉", title: "Churn Risk Alert", desc: "42 customers haven't booked in 90+ days. Consider sending a re-engagement offer.", color: "#fff7ed", border: "#fed7aa" },
  { icon: "💡", title: "Pricing Opportunity", desc: "Electrical services in Bangalore are underpriced by ~18% compared to market benchmarks.", color: "#f0fdf4", border: "#bbf7d0" },
];

export default function AnalyticsPage() {
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  return (
    <div style={{}}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Analytics & Reports</h1>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Business performance overview</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ ...card, background: k.bg, border: `1px solid ${k.color}22` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, fontWeight: 600 }}>{k.label}</p>
              {k.icon}
            </div>
            <p style={{ fontSize: 32, fontWeight: 800, color: k.color, margin: 0 }}>{k.value}</p>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "6px 0 0" }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Top Services */}
        <div style={card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Top Services by Demand</h3>
          {topServices.map((s) => (
            <div key={s.name} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.name}</span>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{s.bookings} bookings</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 999, height: 8 }}>
                <div style={{ width: `${s.pct}%`, background: "linear-gradient(90deg, #6366f1, #818cf8)", borderRadius: 999, height: 8 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Areas */}
        <div style={card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Top Areas by Demand</h3>
          {topAreas.map((a) => (
            <div key={a.name} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{a.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: a.demand === "Very High" ? "#dc2626" : a.demand === "High" ? "#f59e0b" : "#10b981" }}>{a.demand}</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 999, height: 8 }}>
                <div style={{ width: `${a.pct}%`, background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 999, height: 8 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div style={{ ...card }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <MdLightbulb size={22} color="#f59e0b" />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>AI Predictive Insights</h3>
          <span style={{ background: "#fef9c3", color: "#ca8a04", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>BETA</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {insights.map((ins) => (
            <div key={ins.title} style={{ background: ins.color, border: `1px solid ${ins.border}`, borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{ins.icon}</div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{ins.title}</h4>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{ins.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

