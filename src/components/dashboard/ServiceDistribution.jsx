"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Plumbing", value: 35, color: "#6366f1" },
  { name: "Painting", value: 25, color: "#10b981" },
  { name: "Electrical", value: 20, color: "#f59e0b" },
  { name: "Interior", value: 15, color: "#3b82f6" },
  { name: "Others", value: 5, color: "#94a3b8" },
];

export default function ServiceDistribution() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Service Distribution</h3>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>By category</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} paddingAngle={2} dataKey="value" label={({ name, value }) => `${value}%`} labelLine={false}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
