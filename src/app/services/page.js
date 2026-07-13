"use client";
import { useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdVisibility } from "react-icons/md";

const tabs = ["All", "Painting", "Plumbing", "Electrical", "Interior", "Civil", "Cleaning"];

const services = [
  { name: "Wall Painting", category: "Painting", price: "₹3,500", duration: "4 hrs", providers: 12, bookings: 234, status: "Active" },
  { name: "Pipe Repair", category: "Plumbing", price: "₹600", duration: "1 hr", providers: 8, bookings: 189, status: "Active" },
  { name: "Wiring Fix", category: "Electrical", price: "₹800", duration: "2 hrs", providers: 15, bookings: 302, status: "Active" },
  { name: "Full Home Interior", category: "Interior", price: "₹45,000", duration: "7 days", providers: 5, bookings: 56, status: "Active" },
  { name: "Ceiling Repair", category: "Civil", price: "₹5,200", duration: "6 hrs", providers: 6, bookings: 78, status: "Inactive" },
  { name: "Deep Cleaning", category: "Cleaning", price: "₹2,200", duration: "3 hrs", providers: 20, bookings: 415, status: "Active" },
  { name: "Bathroom Tiling", category: "Civil", price: "₹8,000", duration: "2 days", providers: 4, bookings: 44, status: "Active" },
  { name: "AC Service", category: "Electrical", price: "₹1,200", duration: "2 hrs", providers: 18, bookings: 521, status: "Active" },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  const filtered = activeTab === "All" ? services : services.filter((s) => s.category === activeTab);

  return (
    <div style={{}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Services</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Manage all available services</p>
        </div>
        <button style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MdAdd size={18} /> Add Service
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ padding: "8px 18px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: activeTab === t ? "#6366f1" : "#fff", color: activeTab === t ? "#fff" : "#64748b", boxShadow: activeTab === t ? "0 2px 8px rgba(99,102,241,0.3)" : "0 1px 3px rgba(0,0,0,0.06)" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Service Name", "Category", "Base Price", "Duration", "Providers", "Bookings", "Status", "Actions"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.name} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{s.name}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{s.category}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#6366f1" }}>{s.price}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{s.duration}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a", textAlign: "center" }}>{s.providers}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a", textAlign: "center" }}>{s.bookings}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: s.status === "Active" ? "#dcfce7" : "#f1f5f9", color: s.status === "Active" ? "#16a34a" : "#94a3b8", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{s.status}</span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#6366f1" }}><MdVisibility size={15} /></button>
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

