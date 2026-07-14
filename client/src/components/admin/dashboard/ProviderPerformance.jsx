"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Ravi Kumar", revenue: 12400 },
  { name: "Priya Sharma", revenue: 10800 },
  { name: "Amit Singh", revenue: 9600 },
  { name: "Neha Patel", revenue: 8200 },
  { name: "Suresh Rao", revenue: 7100 },
];

const colors = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export default function ProviderPerformance() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Service Man Performance</h3>
      <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>Top 5 by revenue</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} width={90} />
          <Tooltip formatter={v => [`$${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
