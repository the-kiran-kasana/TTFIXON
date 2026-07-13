"use client";
import { MdAdd, MdEdit, MdDelete, MdContentCopy } from "react-icons/md";

const coupons = [
  { code: "SAVE100", type: "Flat", discount: "₹100", minOrder: "₹500", used: "234", limit: "500", valid: "31 Jan 2025", status: "Active" },
  { code: "FIRST20", type: "%", discount: "20%", minOrder: "₹300", used: "89", limit: "200", valid: "28 Feb 2025", status: "Active" },
  { code: "CLEAN50", type: "Flat", discount: "₹50", minOrder: "₹200", used: "412", limit: "1000", valid: "15 Jan 2025", status: "Expired" },
  { code: "SUMMER15", type: "%", discount: "15%", minOrder: "₹400", used: "156", limit: "300", valid: "31 Mar 2025", status: "Active" },
  { code: "PAINT200", type: "Flat", discount: "₹200", minOrder: "₹1,000", used: "67", limit: "100", valid: "20 Jan 2025", status: "Expired" },
  { code: "NEW25", type: "%", discount: "25%", minOrder: "₹250", used: "0", limit: "500", valid: "30 Apr 2025", status: "Inactive" },
];

const statusColors = {
  Active: { background: "#dcfce7", color: "#16a34a" },
  Expired: { background: "#fee2e2", color: "#dc2626" },
  Inactive: { background: "#f1f5f9", color: "#94a3b8" },
};

const stats = [
  { label: "Active Coupons", value: "12", icon: "🎟️" },
  { label: "Total Used", value: "3,421", icon: "📊" },
  { label: "Revenue Impact", value: "₹45,200", icon: "💰" },
  { label: "Expired", value: "8", icon: "⏰" },
];

export default function CouponsPage() {
  const card = { background: "#fff", borderRadius: 12, padding: 24,marginTop: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  return (
    <div style={{}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Coupons & Promotions</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Create and manage discount coupons</p>
        </div>
        <button style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MdAdd size={18} /> Create Coupon
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "4px 0 0" }}>{s.value}</p>
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
              {["Code", "Type", "Discount", "Min Order", "Used / Limit", "Valid Until", "Status", "Actions"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14, background: "#f1f5f9", padding: "4px 8px", borderRadius: 6, color: "#6366f1" }}>{c.code}</span>
                    <MdContentCopy size={14} style={{ color: "#94a3b8", cursor: "pointer" }} />
                  </div>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: c.type === "Flat" ? "#dbeafe" : "#f3e8ff", color: c.type === "Flat" ? "#2563eb" : "#7c3aed", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{c.type}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#10b981" }}>{c.discount}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{c.minOrder}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#0f172a" }}>
                  <span style={{ fontWeight: 600 }}>{c.used}</span>
                  <span style={{ color: "#94a3b8" }}> / {c.limit}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{c.valid}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ ...statusColors[c.status], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{c.status}</span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#f59e0b" }}><MdEdit size={15} /></button>
                    <button style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#ef4444" }}><MdDelete size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

