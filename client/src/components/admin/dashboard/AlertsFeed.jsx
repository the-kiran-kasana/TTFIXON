"use client";

const alerts = [
  {
    type: "warning",
    icon: "⚠️",
    title: "High Cancellation Rate",
    message: "Cancellation rate increased by 1.2% in the last 24 hours.",
    time: "10 min ago",
    bg: "#fffbeb",
    border: "#fbbf24",
    color: "#92400e",
  },
  {
    type: "error",
    icon: "🔴",
    title: "Payment Gateway Error",
    message: "3 transactions failed due to payment gateway timeout.",
    time: "25 min ago",
    bg: "#fef2f2",
    border: "#ef4444",
    color: "#991b1b",
  },
  {
    type: "info",
    icon: "ℹ️",
    title: "New Provider Onboarded",
    message: "Kiran Electricals has completed onboarding and is now live.",
    time: "1 hr ago",
    bg: "#eff6ff",
    border: "#3b82f6",
    color: "#1e40af",
  },
];

export default function AlertsFeed() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Alerts</h3>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>Recent system notifications</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {alerts.map((a, i) => (
          <div key={i} style={{
            display: "flex", gap: "12px", padding: "14px 16px",
            background: a.bg, borderRadius: "8px",
            borderLeft: `4px solid ${a.border}`
          }}>
            <span style={{ fontSize: "18px", flexShrink: 0 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: a.color }}>{a.title}</p>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>{a.time}</span>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b" }}>{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
