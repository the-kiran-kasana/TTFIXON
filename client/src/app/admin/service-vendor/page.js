'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVendors,
  fetchVendorStats,
  createVendor,
  updateVendor,
  deleteVendor,
  clearActionState,
} from '@/store/slices/vendorSlice';
import { useAdminAuth } from '@/context/admin/AuthContext';

// ─── Style helpers ────────────────────────────────────────────────────────────
const card = {
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  border: '1px solid #f1f5f9',
};

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '5px',
};

const statusStyles = {
  Active:    { background: '#dcfce7', color: '#16a34a' },
  Pending:   { background: '#fef9c3', color: '#b45309' },
  Suspended: { background: '#fee2e2', color: '#dc2626' },
};

// ─── Empty form ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: '',
  category: '',
  contactEmail: '',
  phone: '',
  serviceMen: '',
  revenue: '',
  address: '',
  status: 'Pending',
};

const CATEGORIES = [
  'Electrical', 'Plumbing', 'Cleaning', 'Civil Work',
  'Painting', 'Interior Design', 'Carpentry', 'AC Repair', 'Other',
];

// ─── Modal ────────────────────────────────────────────────────────────────────
function VendorModal({ mode, initialData, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      serviceMen: Number(form.serviceMen) || 0,
      revenue: Number(form.revenue) || 0,
    });
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '540px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            {mode === 'create' ? '+ Add New Vendor' : 'Edit Vendor'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#94a3b8', lineHeight: 1 }}>×</button>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Vendor Name *</label>
              <input name="name" required value={form.name} onChange={handle} placeholder="e.g. Raj Electricals" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <select name="category" required value={form.category} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Contact Email *</label>
              <input name="contactEmail" type="email" required value={form.contactEmail} onChange={handle} placeholder="vendor@company.com" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Phone *</label>
              <input name="phone" required value={form.phone} onChange={handle} placeholder="+91 98765 43210" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Service Men</label>
              <input name="serviceMen" type="number" min="0" value={form.serviceMen} onChange={handle} placeholder="0" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Revenue (₹)</label>
              <input name="revenue" type="number" min="0" value={form.revenue} onChange={handle} placeholder="0" style={inputStyle} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Address</label>
              <textarea name="address" rows={2} value={form.address} onChange={handle} placeholder="Full address..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                {['Active', 'Pending', 'Suspended'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, background: loading ? '#a5b4fc' : '#6366f1',
                color: '#fff', border: 'none', borderRadius: '8px',
                padding: '11px', fontWeight: '700', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Saving…' : mode === 'create' ? 'Create Vendor' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── View Details Modal ───────────────────────────────────────────────────────
function VendorViewModal({ vendor, onClose, onEdit }) {
  const st = statusStyles[vendor.status] || statusStyles.Pending;
  const row = (label, value) => (
    <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9', padding: '11px 0' }}>
      <span style={{ width: '140px', flexShrink: 0, fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '2px' }}>{label}</span>
      <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '500', wordBreak: 'break-all' }}>{value || '—'}</span>
    </div>
  );

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

        {/* Header banner */}
        <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', borderRadius: '16px 16px 0 0', padding: '24px 24px 20px', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '14px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', width: '30px', height: '30px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
          >×</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
              {vendor.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#fff', margin: '0 0 4px' }}>{vendor.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: '20px' }}>{vendor.category}</span>
                <span style={{ ...st, padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{vendor.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>
          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: '#f0f4ff', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1', margin: '0 0 2px' }}>{vendor.serviceMen}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Service Men</p>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', margin: '0 0 2px' }}>₹{Number(vendor.revenue).toLocaleString('en-IN')}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Total Revenue</p>
            </div>
          </div>

          {/* Detail rows */}
          <div>
            {row('Contact Email', vendor.contactEmail)}
            {row('Phone', vendor.phone)}
            {row('Address', vendor.address)}
            {row('Member Since', vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null)}
            {row('Last Updated', vendor.updatedAt ? new Date(vendor.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null)}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={onEdit}
              style={{ flex: 1, background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              ✏️ Edit Vendor
            </button>
            <button
              onClick={onClose}
              style={{ flex: 1, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function ConfirmDeleteModal({ vendor, onClose, onConfirm, loading }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '420px', width: '100%', padding: '28px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 16px' }}>🗑️</div>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Delete Vendor?</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '22px' }}>
          Are you sure you want to delete <strong>{vendor?.name}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{ flex: 1, background: loading ? '#fca5a5' : '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
          <button
            onClick={onClose}
            style={{ flex: 1, background: '#fff', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === 'success' ? '#16a34a' : '#dc2626';
  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000,
      background: bg, color: '#fff', padding: '12px 20px', borderRadius: '10px',
      fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', gap: '10px',
    }}>
      {type === 'success' ? '✅' : '❌'} {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', marginLeft: '4px' }}>×</button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServiceVendorPage() {
  const dispatch = useDispatch();
  const { token } = useAdminAuth();

  const { vendors, total, stats, loading, statsLoading, error, actionLoading, actionError, actionSuccess } = useSelector((s) => s.vendors);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal] = useState(null); // null | { mode: 'create' } | { mode: 'edit', vendor }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }

  // ── Load data ──────────────────────────────────────────────────────────────
  const load = useCallback(() => {
    if (!token) return;
    dispatch(fetchVendors({ token, search, status: statusFilter }));
    dispatch(fetchVendorStats(token));
  }, [dispatch, token, search, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  // ── Handle action success / error toasts ──────────────────────────────────
  useEffect(() => {
    if (actionSuccess) {
      setToast({ message: actionSuccess, type: 'success' });
      setModal(null);
      setDeleteTarget(null);
      dispatch(clearActionState());
    }
    if (actionError) {
      setToast({ message: actionError, type: 'error' });
    }
  }, [actionSuccess, actionError, dispatch]);

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleCreate = (formData) => {
    dispatch(createVendor({ token, vendorData: formData }));
  };

  const handleUpdate = (formData) => {
    if (!modal || modal.mode !== 'edit' || !modal.vendor) return;
    dispatch(updateVendor({ token, id: modal.vendor._id, vendorData: formData }));
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteVendor({ token, id: deleteTarget._id }));
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const statCards = [
    { label: 'Total Vendors',    value: stats.total,     icon: '🏪', color: '#6366f1', bg: '#eef2ff' },
    { label: 'Active Vendors',   value: stats.active,    icon: '✅', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Pending Approval', value: stats.pending,   icon: '⏳', color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Suspended',        value: stats.suspended, icon: '🚫', color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Modals */}
      {viewTarget && (
        <VendorViewModal
          vendor={viewTarget}
          onClose={() => setViewTarget(null)}
          onEdit={() => { setModal({ mode: 'edit', vendor: viewTarget }); setViewTarget(null); }}
        />
      )}
      {modal?.mode === 'create' && (
        <VendorModal
          mode="create"
          initialData={EMPTY_FORM}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleCreate}
          loading={actionLoading}
          error={actionError}
        />
      )}
      {modal?.mode === 'edit' && (
        <VendorModal
          mode="edit"
          initialData={{
            name: modal.vendor.name,
            category: modal.vendor.category,
            contactEmail: modal.vendor.contactEmail,
            phone: modal.vendor.phone,
            serviceMen: modal.vendor.serviceMen,
            revenue: modal.vendor.revenue,
            address: modal.vendor.address || '',
            status: modal.vendor.status,
          }}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleUpdate}
          loading={actionLoading}
          error={actionError}
        />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal
          vendor={deleteTarget}
          onClose={() => { setDeleteTarget(null); dispatch(clearActionState()); }}
          onConfirm={handleDelete}
          loading={actionLoading}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => { setToast(null); dispatch(clearActionState()); }} />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Service Vendor</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage registered vendor companies and their service men</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'create' })}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          + Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>
                {statsLoading ? '—' : s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={card}>
        {/* Filters row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            placeholder="🔍 Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '260px', outline: 'none' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#475569', background: '#fff', cursor: 'pointer' }}
          >
            {['All', 'Active', 'Pending', 'Suspended'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button
            onClick={load}
            style={{ padding: '9px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#475569', fontWeight: '600' }}
          >
            🔄 Refresh
          </button>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#94a3b8', alignSelf: 'center' }}>
            {total} vendor{total !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Vendor Name', 'Category', 'Contact Email', 'Phone', 'Service Men', 'Revenue', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                    <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: '10px', verticalAlign: 'middle' }} />
                    Loading vendors…
                  </td>
                </tr>
              ) : vendors.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                    No vendors found. <button onClick={() => setModal({ mode: 'create' })} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Add your first vendor →</button>
                  </td>
                </tr>
              ) : (
                vendors.map((v, i) => (
                  <tr key={v._id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#6366f1', flexShrink: 0 }}>
                          {v.name.charAt(0).toUpperCase()}
                        </div>
                        {v.name}
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{v.category}</td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{v.contactEmail}</td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>{v.phone}</td>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{v.serviceMen}</td>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#16a34a', whiteSpace: 'nowrap' }}>₹{Number(v.revenue).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ ...(statusStyles[v.status] || statusStyles.Pending), padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{v.status}</span>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setViewTarget(v)}
                          style={{ padding: '5px 12px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          👁️ View
                        </button>
                        <button
                          onClick={() => setModal({ mode: 'edit', vendor: v })}
                          style={{ padding: '5px 12px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(v)}
                          style={{ padding: '5px 12px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
