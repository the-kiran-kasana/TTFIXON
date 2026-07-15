"use client";
import { useState } from "react";
import { Search, Eye, Download, DollarSign, Clock, Undo2, TrendingUp } from "lucide-react";

const transactions = [
  { id: "#TXN8821", type: "Payment",  party: "Rahul Sharma",    amount: "₹4,500",  gateway: "Razorpay",     status: "Success",   date: "15 Jan 2025" },
  { id: "#TXN8820", type: "Refund",   party: "Priya Mehta",     amount: "₹850",    gateway: "UPI",          status: "Processed", date: "15 Jan 2025" },
  { id: "#TXN8819", type: "Payout",   party: "Suresh Kumar",    amount: "₹3,200",  gateway: "Bank Transfer",status: "Pending",   date: "14 Jan 2025" },
  { id: "#TXN8818", type: "Commission",party: "System",          amount: "₹480",    gateway: "Internal",     status: "Success",   date: "14 Jan 2025" },
  { id: "#TXN8817", type: "Payment",  party: "Amit Verma",      amount: "₹1,200",  gateway: "Card",         status: "Failed",    date: "14 Jan 2025" },
  { id: "#TXN8816", type: "Payout",   party: "Raj Plumbing Co.",amount: "₹2,100",  gateway: "Bank Transfer",status: "Success",   date: "13 Jan 2025" },
  { id: "#TXN8815", type: "Payment",  party: "Sneha Patel",     amount: "₹12,000", gateway: "Razorpay",     status: "Success",   date: "13 Jan 2025" },
  { id: "#TXN8814", type: "Refund",   party: "Karan Nair",      amount: "₹600",    gateway: "UPI",          status: "Processed", date: "12 Jan 2025" },
  { id: "#TXN8813", type: "Withdraw", party: "Ravi Kumar",       amount: "₹8,450",  gateway: "Bank Transfer",status: "Success",   date: "12 Jan 2025" },
  { id: "#TXN8812", type: "Withdraw", party: "Priya Sharma",     amount: "₹12,200", gateway: "Bank Transfer",status: "Pending",   date: "11 Jan 2025" },
  { id: "#TXN8811", type: "Withdraw", party: "Deepak Singh",     amount: "₹5,600",  gateway: "Bank Transfer",status: "Pending",   date: "11 Jan 2025" },
];

const typeColors = {
  Payment:    { background: "#dbeafe", color: "#2563eb" },
  Refund:     { background: "#fee2e2", color: "#dc2626" },
  Payout:     { background: "#f3e8ff", color: "#7c3aed" },
  Commission: { background: "#fef9c3", color: "#ca8a04" },
  Withdraw:   { background: "#dcfce7", color: "#16a34a" },
};

const statusColors = {
  Success: { background: "#dcfce7", color: "#16a34a" },
  Processed: { background: "#dbeafe", color: "#2563eb" },
  Pending: { background: "#fef9c3", color: "#ca8a04" },
  Failed: { background: "#fee2e2", color: "#dc2626" },
};

const stats = [
  { label: "Total Revenue", value: "$45,231", Icon: DollarSign, color: "#6366f1", bg: "#eef2ff" },
  { label: "Pending",       value: "₹12,400", Icon: Clock,      color: "#f59e0b", bg: "#fffbeb" },
  { label: "Refunds",       value: "₹2,100",  Icon: Undo2,      color: "#ef4444", bg: "#fef2f2" },
  { label: "Commission",    value: "$8,920",   Icon: TrendingUp, color: "#10b981", bg: "#ecfdf5" },
];

export default function AllTransactionsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  const filtered = transactions.filter((t) => {
    const matchesType = type === "All" || t.type === type;
    const matchesSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.party.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div style={{}}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>All Transactions</h1>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Complete financial transaction history</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", margin: "4px 0 0" }}>{s.value}</p>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.Icon size={20} color={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...card, marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 12px 10px 34px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }}>
          {["All", "Payment", "Refund", "Payout", "Commission", "Withdraw"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <input type="date" style={{ padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none" }} />
        <input type="date" style={{ padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none" }} />
        <button style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          <Download size={16} /> Export
        </button>
      </div>

      <div style={card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Transaction ID", "Type", "Customer / Provider", "Amount", "Gateway", "Status", "Date", "Action"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#6366f1" }}>{t.id}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ ...typeColors[t.type], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{t.type}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#0f172a" }}>{t.party}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{t.amount}</td>
                <td style={{ padding: "14px 12px", fontSize: 13, color: "#64748b" }}>{t.gateway}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ ...statusColors[t.status], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{t.status}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{t.date}</td>
                <td style={{ padding: "14px 12px" }}>
                  <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#6366f1" }}><Eye size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 14, color: "#94a3b8" }}>Showing 1–8 of 3,421 results</span>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3].map((n) => (
              <button key={n} style={{ background: n === 1 ? "#6366f1" : "#f1f5f9", color: n === 1 ? "#fff" : "#475569", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 14 }}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

