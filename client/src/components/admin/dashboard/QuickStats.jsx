"use client";

const quick = [
  { title: "New Customers", value: "284", icon: "👥", color: "#6366f1", bg: "#eef2ff" },
  { title: "Pending Payments", value: "₹24,500", icon: "⏳", color: "#f59e0b", bg: "#fffbeb" },
  { title: "Completion Rate", value: "94.8%", icon: "✅", color: "#10b981", bg: "#ecfdf5" },
  { title: "Cancellation Rate", value: "3.2%", icon: "❌", color: "#ef4444", bg: "#fef2f2" },
];

export default function QuickStats() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
      {quick.map((q) => (
        <div key={q.title} style={{
          background: "#fff", borderRadius: "12px", padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: "14px"
        }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: q.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
            {q.icon}
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#64748b", fontWeight: 500, marginBottom: "4px" }}>{q.title}</p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: q.color }}>{q.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
