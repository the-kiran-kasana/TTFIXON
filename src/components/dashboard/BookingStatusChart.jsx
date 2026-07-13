"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 892, color: "#10b981" },
  { name: "In Progress", value: 156, color: "#6366f1" },
  { name: "Scheduled", value: 236, color: "#f59e0b" },
  { name: "Cancelled", value: 45, color: "#ef4444" },
];

export default function BookingStatusChart() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Booking Status</h3>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>Distribution overview</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
        {data.map(d => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "#64748b" }}>{d.name}</span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", marginLeft: "auto" }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
