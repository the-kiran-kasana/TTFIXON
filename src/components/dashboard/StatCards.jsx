"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { title: "Revenue", value: "$45,231", change: "+12.5%", up: true, icon: "💰", color: "#6366f1" },
  { title: "Bookings", value: "1,284", change: "+8.3%", up: true, icon: "📅", color: "#10b981" },
  { title: "Providers", value: "156", change: "+5.2%", up: true, icon: "👷", color: "#f59e0b" },
  { title: "Rating", value: "4.8", change: "+0.3%", up: true, icon: "⭐", color: "#ef4444" },
];

export default function StatCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
      {stats.map((s) => (
        <div key={s.title} style={{
          background: "#fff", borderRadius: "12px", padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9",
          transition: "box-shadow 0.2s", cursor: "default"
        }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.12)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "6px", fontWeight: 500 }}>{s.title}</p>
              <p style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>{s.value}</p>
            </div>
            <div style={{ fontSize: "28px", background: "#f8fafc", borderRadius: "10px", padding: "8px", lineHeight: 1 }}>{s.icon}</div>
          </div>
          <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
            {s.up
              ? <TrendingUp size={14} color="#10b981" />
              : <TrendingDown size={14} color="#ef4444" />}
            <span style={{ fontSize: "13px", color: s.up ? "#10b981" : "#ef4444", fontWeight: 600 }}>{s.change}</span>
            <span style={{ fontSize: "13px", color: "#94a3b8", marginLeft: "2px" }}>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
