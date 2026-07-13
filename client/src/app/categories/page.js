"use client";
import { useState } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

const categories = [
  { name: "Painting", emoji: "🎨", subcategories: 6, services: 24, active: true, color: "#fef3c7" },
  { name: "Plumbing", emoji: "🔧", subcategories: 4, services: 18, active: true, color: "#dbeafe" },
  { name: "Electrical", emoji: "⚡", subcategories: 8, services: 32, active: true, color: "#fce7f3" },
  { name: "Interior Design", emoji: "🛋️", subcategories: 5, services: 20, active: false, color: "#f0fdf4" },
  { name: "Civil Work", emoji: "🏗️", subcategories: 7, services: 28, active: true, color: "#f5f3ff" },
  { name: "Cleaning", emoji: "🧹", subcategories: 3, services: 12, active: true, color: "#fff7ed" },
];

export default function CategoriesPage() {
  const [cats, setCats] = useState(categories);
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  const toggle = (i) => setCats((prev) => prev.map((c, idx) => idx === i ? { ...c, active: !c.active } : c));

  return (
    <div style={{}}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Service Categories</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Manage all service categories and subcategories</p>
        </div>
        <button style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MdAdd size={18} /> Add Category
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {cats.map((cat, i) => (
          <div key={cat.name} style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ background: cat.color, padding: "24px 24px 16px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48 }}>{cat.emoji}</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 }}>{cat.name}</h3>
                <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
                  {cat.subcategories} subcategories · {cat.services} services
                </p>
              </div>
            </div>
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#6366f1" }}>{cat.subcategories}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Subcategories</div>
                  </div>
                  <div style={{ width: 1, background: "#f1f5f9" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#10b981" }}>{cat.services}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Services</div>
                  </div>
                </div>
                {/* Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{cat.active ? "Active" : "Inactive"}</span>
                  <div
                    onClick={() => toggle(i)}
                    style={{ width: 44, height: 24, borderRadius: 12, background: cat.active ? "#6366f1" : "#e2e8f0", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
                  >
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: cat.active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, background: "#f1f5f9", border: "none", borderRadius: 8, padding: "8px 0", cursor: "pointer", color: "#475569", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <MdEdit size={15} /> Edit
                </button>
                <button style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#ef4444" }}>
                  <MdDelete size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

