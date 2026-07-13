"use client";

const metrics = [
  { label: "Conversion Rate", value: "24.8%", icon: "📈", desc: "Leads to bookings", color: "#6366f1" },
  { label: "Avg Booking Value", value: "$167", icon: "💵", desc: "Per transaction", color: "#10b981" },
  { label: "Active Users", value: "2,847", icon: "🟢", desc: "Last 30 days", color: "#f59e0b" },
  { label: "Response Time", value: "2.4m", icon: "⚡", desc: "Avg provider reply", color: "#3b82f6" },
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
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>{m.icon}</div>
          <p style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{m.value}</p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginTop: "4px" }}>{m.label}</p>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{m.desc}</p>
        </div>
      ))}
    </div>
  );
}
