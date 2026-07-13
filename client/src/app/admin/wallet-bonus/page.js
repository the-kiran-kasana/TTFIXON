"use client";
import { MdAdd, MdVisibility } from "react-icons/md";

const walletData = [
  { user: "Rahul Sharma", initials: "RS", type: "Customer", balance: "₹1,200", bonus: "₹200", reason: "Referral Reward", expiry: "31 Mar 2025", status: "Active" },
  { user: "Suresh Kumar", initials: "SK", type: "Provider", balance: "₹8,400", bonus: "₹500", reason: "Performance Bonus", expiry: "28 Feb 2025", status: "Active" },
  { user: "Priya Mehta", initials: "PM", type: "Customer", balance: "₹450", bonus: "₹100", reason: "Sign-up Bonus", expiry: "31 Jan 2025", status: "Expired" },
  { user: "Raj Plumbing", initials: "RP", type: "Provider", balance: "₹2,100", bonus: "₹300", reason: "Festival Bonus", expiry: "15 Feb 2025", status: "Active" },
  { user: "Sneha Patel", initials: "SP", type: "Customer", balance: "₹3,800", bonus: "₹400", reason: "Loyalty Reward", expiry: "30 Apr 2025", status: "Active" },
  { user: "CleanPro", initials: "CP", type: "Provider", balance: "₹5,600", bonus: "₹0", reason: "—", expiry: "—", status: "Active" },
];

const stats = [
  { label: "Total Wallet Balance", value: "₹1,24,500", icon: "💰" },
  { label: "Bonus Issued", value: "₹8,200", icon: "🎁" },
  { label: "Redeemed", value: "₹45,100", icon: "✅" },
  { label: "Expired", value: "₹2,300", icon: "⏰" },
];

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#8b5cf6"];

export default function WalletBonusPage() {
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  return (
    <div style={{}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Wallet & Bonus Management</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Manage wallet balances and bonus credits</p>
        </div>
        <button style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MdAdd size={18} /> Add Bonus
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "4px 0 0" }}>{s.value}</p>
              </div>
              <div style={{ fontSize: 32 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["User", "Type", "Wallet Balance", "Bonus Amount", "Reason", "Expiry", "Status", "Action"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {walletData.map((w, i) => (
              <tr key={w.user} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: avatarColors[i % avatarColors.length], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{w.initials}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{w.user}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: w.type === "Customer" ? "#dbeafe" : "#f3e8ff", color: w.type === "Customer" ? "#2563eb" : "#7c3aed", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{w.type}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#10b981" }}>{w.balance}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#f59e0b" }}>{w.bonus}</td>
                <td style={{ padding: "14px 12px", fontSize: 13, color: "#475569" }}>{w.reason}</td>
                <td style={{ padding: "14px 12px", fontSize: 13, color: "#475569" }}>{w.expiry}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: w.status === "Active" ? "#dcfce7" : "#fee2e2", color: w.status === "Active" ? "#16a34a" : "#dc2626", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{w.status}</span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#6366f1" }}><MdVisibility size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

