"use client";
import { TrendingUp, DollarSign, Activity, Zap } from "lucide-react";

const metrics = [
  { label: "Conversion Rate", value: "24.8%", Icon: TrendingUp, desc: "Leads to bookings", color: "#6366f1", bg: "#eef2ff" },
  { label: "Avg Booking Value", value: "$167", Icon: DollarSign, desc: "Per transaction", color: "#10b981", bg: "#ecfdf5" },
  { label: "Active Users", value: "2,847", Icon: Activity, desc: "Last 30 days", color: "#f59e0b", bg: "#fffbeb" },
  { label: "Response Time", value: "2.4m", Icon: Zap, desc: "Avg provider reply", color: "#3b82f6", bg: "#eff6ff" },
];

export default function KeyMetrics() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
      {metrics.map((m) => (
        <div key={m.label} style={{
          background: "#fff", borderRadius: "12px", padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9",
          borderTop: `3px solid ${m.color}`
        }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
            <m.Icon size={20} color={m.color} />
          </div>
          <p style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{m.value}</p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginTop: "4px" }}>{m.label}</p>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{m.desc}</p>
        </div>
      ))}
    </div>
  );
}
