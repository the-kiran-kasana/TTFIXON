"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = {
  Day: [
    { name: "6am", revenue: 1200, bookings: 8 },
    { name: "9am", revenue: 3400, bookings: 22 },
    { name: "12pm", revenue: 5200, bookings: 38 },
    { name: "3pm", revenue: 4100, bookings: 29 },
    { name: "6pm", revenue: 6800, bookings: 47 },
    { name: "9pm", revenue: 3200, bookings: 21 },
  ],
  Week: [
    { name: "Mon", revenue: 8200, bookings: 54 },
    { name: "Tue", revenue: 11400, bookings: 78 },
    { name: "Wed", revenue: 9800, bookings: 63 },
    { name: "Thu", revenue: 14200, bookings: 95 },
    { name: "Fri", revenue: 16800, bookings: 112 },
    { name: "Sat", revenue: 13200, bookings: 88 },
    { name: "Sun", revenue: 7600, bookings: 51 },
  ],
  Month: [
    { name: "Week 1", revenue: 32000, bookings: 214 },
    { name: "Week 2", revenue: 41000, bookings: 278 },
    { name: "Week 3", revenue: 38000, bookings: 256 },
    { name: "Week 4", revenue: 45231, bookings: 312 },
  ],
  Year: [
    { name: "Jan", revenue: 38000, bookings: 256 },
    { name: "Feb", revenue: 42000, bookings: 284 },
    { name: "Mar", revenue: 35000, bookings: 238 },
    { name: "Apr", revenue: 51000, bookings: 345 },
    { name: "May", revenue: 47000, bookings: 318 },
    { name: "Jun", revenue: 58000, bookings: 392 },
    { name: "Jul", revenue: 62000, bookings: 418 },
    { name: "Aug", revenue: 54000, bookings: 365 },
    { name: "Sep", revenue: 49000, bookings: 331 },
    { name: "Oct", revenue: 67000, bookings: 452 },
    { name: "Nov", revenue: 72000, bookings: 486 },
    { name: "Dec", revenue: 45231, bookings: 305 },
  ],
};

const filters = ["Day", "Week", "Month", "Year"];

export default function RevenueChart() {
  const [active, setActive] = useState("Month");

  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Revenue & Bookings</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "2px" }}>Performance overview</p>
        </div>
        <div style={{ display: "flex", gap: "6px", background: "#f8fafc", padding: "4px", borderRadius: "8px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: "6px 14px", borderRadius: "6px", border: "none", fontSize: "13px", fontWeight: 500, cursor: "pointer",
              background: active === f ? "#6366f1" : "transparent",
              color: active === f ? "#fff" : "#64748b",
              transition: "all 0.2s"
            }}>{f}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data[active]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }} />
          <Legend wrapperStyle={{ fontSize: "13px" }} />
          <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" name="Revenue ($)" />
          <Area type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} fill="url(#colorBookings)" name="Bookings" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
