"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { fetchCategories, fetchCategoryStats, createCategory, updateCategory, deleteCategory, toggleCategory, clearActionState } from "@/store/slices/categorySlice";
import { useAdminAuth } from "@/context/admin/AuthContext";

const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };
const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "5px" };

const COLOR_PRESETS = ["#fef3c7","#dbeafe","#fce7f3","#f0fdf4","#f5f3ff","#fff7ed","#e0f2fe","#fdf4ff","#f0fdf4","#fef9c3"];
const EMOJI_PRESETS = ["🎨","🔧","⚡","🛋️","🏗️","🧹","🪚","❄️","🚿","🪟","🔨","💡","🛁","🏠","🌿"];

const EMPTY_FORM = { name: "", emoji: "🔧", color: "#f1f5f9", description: "", subcategories: "", services: "", active: true };

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
function CategoryModal({ mode, initialData, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, subcategories: Number(form.subcategories) || 0, services: Number(form.services) || 0 });
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "520px", padding: "28px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>{mode === "create" ? "+ Add Category" : "Edit Category"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#94a3b8" }}>×</button>
        </div>

        {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "13px" }}>{error}</div>}

        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Category Name *</label>
              <input name="name" required value={form.name} onChange={handle} placeholder="e.g. Plumbing" style={inputStyle} />
            </div>

            {/* Emoji picker */}
            <div>
              <label style={labelStyle}>Emoji</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                {EMOJI_PRESETS.map((em) => (
                  <button key={em} type="button" onClick={() => setForm((f) => ({ ...f, emoji: em }))}
                    style={{ fontSize: "20px", width: "36px", height: "36px", borderRadius: "8px", border: form.emoji === em ? "2px solid #6366f1" : "1px solid #e2e8f0", background: form.emoji === em ? "#eef2ff" : "#fff", cursor: "pointer" }}>
                    {em}
                  </button>
                ))}
              </div>
              <input name="emoji" value={form.emoji} onChange={handle} placeholder="or type emoji" style={{ ...inputStyle, width: "80px" }} />
            </div>

            {/* Color picker */}
            <div>
              <label style={labelStyle}>Card Color</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                {COLOR_PRESETS.map((c) => (
                  <div key={c} onClick={() => setForm((f) => ({ ...f, color: c }))}
                    style={{ width: "28px", height: "28px", borderRadius: "6px", background: c, cursor: "pointer", border: form.color === c ? "2px solid #6366f1" : "2px solid transparent", boxSizing: "border-box" }} />
                ))}
              </div>
              <input name="color" value={form.color} onChange={handle} placeholder="#f1f5f9" style={{ ...inputStyle, width: "110px" }} />
            </div>

            <div>
              <label style={labelStyle}>Subcategories</label>
              <input name="subcategories" type="number" min="0" value={form.subcategories} onChange={handle} placeholder="0" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Services Count</label>
              <input name="services" type="number" min="0" value={form.services} onChange={handle} placeholder="0" style={inputStyle} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" rows={2} value={form.description} onChange={handle} placeholder="Short description…" style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select name="active" value={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.value === "true" }))}
                style={{ ...inputStyle, background: "#fff" }}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Preview */}
          <div style={{ marginTop: "16px", background: form.color || "#f1f5f9", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "32px" }}>{form.emoji}</span>
            <div>
              <p style={{ fontWeight: "700", color: "#0f172a", margin: 0, fontSize: "15px" }}>{form.name || "Category Name"}</p>
              <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0" }}>{form.subcategories || 0} subcategories · {form.services || 0} services</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
            <button type="submit" disabled={loading}
              style={{ flex: 1, background: loading ? "#a5b4fc" : "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "11px", fontWeight: "700", fontSize: "14px", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Saving…" : mode === "create" ? "Create Category" : "Save Changes"}
            </button>
            <button type="button" onClick={onClose}
              style={{ flex: 1, background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "11px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function ConfirmDeleteModal({ cat, onClose, onConfirm, loading }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#fff", borderRadius: "14px", maxWidth: "420px", width: "100%", padding: "28px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>{cat?.emoji}</div>
        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>Delete Category?</h3>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "22px" }}>
          Are you sure you want to delete <strong>{cat?.name}</strong>? This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onConfirm} disabled={loading}
            style={{ flex: 1, background: loading ? "#fca5a5" : "#ef4444", color: "#fff", border: "none", borderRadius: "8px", padding: "11px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Deleting…" : "Delete"}
          </button>
          <button onClick={onClose}
            style={{ flex: 1, background: "#fff", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "11px", fontWeight: "600", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({ active, onToggle }) {
  return (
    <div onClick={onToggle}
      style={{ width: "44px", height: "24px", borderRadius: "12px", background: active ? "#6366f1" : "#e2e8f0", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: active ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 2000, background: type === "success" ? "#16a34a" : "#dc2626", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "10px" }}>
      {type === "success" ? "✅" : "❌"} {message}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer", marginLeft: "4px" }}>×</button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { token } = useAdminAuth();
  const { categories, stats, loading, statsLoading, error, actionLoading, actionError, actionSuccess } =
    useSelector((s) => s.categories);

  const [search, setSearch]             = useState("");
  const [modal, setModal]               = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]               = useState(null);

  const load = useCallback(() => {
    if (!token) return;
    dispatch(fetchCategories({ token, search }));
    dispatch(fetchCategoryStats(token));
  }, [dispatch, token, search]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (actionSuccess) {
      setToast({ message: actionSuccess, type: "success" });
      setModal(null); setDeleteTarget(null);
      dispatch(clearActionState());
    }
    if (actionError) setToast({ message: actionError, type: "error" });
  }, [actionSuccess, actionError, dispatch]);

  const handleCreate = (data) => dispatch(createCategory({ token, categoryData: data }));
  const handleUpdate = (data) => {
    if (!modal || modal.mode !== "edit" || !modal.cat) return;
    dispatch(updateCategory({ token, id: modal.cat._id, categoryData: data }));
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteCategory({ token, id: deleteTarget._id }));
  };
  const handleToggle = (cat) => dispatch(toggleCategory({ token, id: cat._id }));

  const statCards = [
    { label: "Total Categories", value: stats.total,    icon: "📦", color: "#6366f1", bg: "#eef2ff" },
    { label: "Active",           value: stats.active,   icon: "✅", color: "#10b981", bg: "#ecfdf5" },
    { label: "Inactive",         value: stats.inactive, icon: "⏸️", color: "#ef4444", bg: "#fef2f2" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Modals */}
      {modal?.mode === "create" && (
        <CategoryModal mode="create" initialData={EMPTY_FORM}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleCreate} loading={actionLoading} error={actionError} />
      )}
      {modal?.mode === "edit" && (
        <CategoryModal mode="edit"
          initialData={{ name: modal.cat.name, emoji: modal.cat.emoji, color: modal.cat.color, description: modal.cat.description || "", subcategories: modal.cat.subcategories, services: modal.cat.services, active: modal.cat.active }}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleUpdate} loading={actionLoading} error={actionError} />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal cat={deleteTarget}
          onClose={() => { setDeleteTarget(null); dispatch(clearActionState()); }}
          onConfirm={handleDelete} loading={actionLoading} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => { setToast(null); dispatch(clearActionState()); }} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Service Categories</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Manage all service categories and subcategories</p>
        </div>
        <button onClick={() => setModal({ mode: "create" })}
          style={{ background: "#6366f1", color: "#fff", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <MdAdd size={18} /> Add Category
        </button>
      </div>

      {/* Stats + Search row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 24 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ ...card, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: s.color, margin: "2px 0 0" }}>{statsLoading ? "—" : s.value}</p>
            </div>
          </div>
        ))}
        <div style={{ ...card, display: "flex", alignItems: "center", gap: 10 }}>
          <input placeholder="🔍 Search categories…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, margin: 0 }} />
          <button onClick={load} style={{ padding: "9px 12px", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#475569", fontWeight: 600, whiteSpace: "nowrap" }}>
            🔄
          </button>
        </div>
      </div>

      {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#dc2626", fontSize: 13 }}>{error}</div>}

      {/* Cards grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8", fontSize: "14px" }}>
          <div style={{ display: "inline-block", width: "24px", height: "24px", border: "3px solid #e2e8f0", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: "10px", verticalAlign: "middle" }} />
          Loading categories…
        </div>
      ) : categories.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: "60px", color: "#94a3b8" }}>
          No categories found.{" "}
          <button onClick={() => setModal({ mode: "create" })} style={{ color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
            Add first category →
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {categories.map((cat) => (
            <div key={cat._id} style={{ ...card, padding: 0, overflow: "hidden" }}>
              {/* Coloured header */}
              <div style={{ background: cat.color || "#f1f5f9", padding: "22px 24px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 44 }}>{cat.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.name}</h3>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{cat.subcategories} subcategories · {cat.services} services</p>
                  {cat.description && <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat.description}</p>}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "14px 24px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 19, fontWeight: 700, color: "#6366f1" }}>{cat.subcategories}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>Subcategories</div>
                    </div>
                    <div style={{ width: 1, background: "#f1f5f9" }} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 19, fontWeight: 700, color: "#10b981" }}>{cat.services}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>Services</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{cat.active ? "Active" : "Inactive"}</span>
                    <Toggle active={cat.active} onToggle={() => handleToggle(cat)} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setModal({ mode: "edit", cat })}
                    style={{ flex: 1, background: "#f1f5f9", border: "none", borderRadius: 8, padding: "8px 0", cursor: "pointer", color: "#475569", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <MdEdit size={14} /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(cat)}
                    style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center" }}>
                    <MdDelete size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
