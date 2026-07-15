'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HardHat, CheckCircle, Clock, Ban, Trash2, Eye, Pencil, RefreshCw } from 'lucide-react';
import {
  fetchServicemen,
  fetchServicemanStats,
  createServiceman,
  updateServiceman,
  deleteServiceman,
  clearActionState,
} from '@/store/slices/servicemanSlice';
import { useAdminAuth } from '@/context/admin/AuthContext';

// ─── Style helpers ────────────────────────────────────────────────────────────
const card = {
  background: '#fff', borderRadius: '12px', padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9',
};
const inputStyle = {
  width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0',
  borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
};
const labelStyle = {
  display: 'block', fontSize: '13px', fontWeight: '600',
  color: '#374151', marginBottom: '5px',
};
const statusStyles = {
  Verified:  { background: '#dcfce7', color: '#16a34a' },
  Pending:   { background: '#fef9c3', color: '#b45309' },
  Suspended: { background: '#fee2e2', color: '#dc2626' },
};

const CATEGORIES = [
  'Electrical', 'Plumbing', 'Cleaning', 'Civil Work',
  'Painting', 'Interior Design', 'Carpentry', 'AC Repair', 'Other',
];
const EMPTY_FORM = {
  name: '', email: '', phone: '', category: '',
  experience: '', address: '', status: 'Pending',
};

// ─── Stars component ──────────────────────────────────────────────────────────
function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span>
      <span style={{ color: '#f59e0b', fontSize: '14px' }}>
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '5px' }}>{Number(rating).toFixed(1)}</span>
    </span>
  );
}

// ─── Create / Edit Modal ──────────────────────────────────────────────────────
function ServicemanModal({ mode, initialData, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, experience: Number(form.experience) || 0 });
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '540px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            {mode === 'create' ? '+ Add New Service Man' : 'Edit Service Man'}
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
              <label style={labelStyle}>Full Name *</label>
              <input name="name" required value={form.name} onChange={handle} placeholder="e.g. Ravi Kumar" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handle} placeholder="ravi@example.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input name="phone" required value={form.phone} onChange={handle} placeholder="+91 98765 43210" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select name="category" required value={form.category} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Experience (years)</label>
              <input name="experience" type="number" min="0" value={form.experience} onChange={handle} placeholder="0" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                {['Verified', 'Pending', 'Suspended'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Address</label>
              <textarea name="address" rows={2} value={form.address} onChange={handle} placeholder="Full address..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" disabled={loading}
              style={{ flex: 1, background: loading ? '#a5b4fc' : '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving…' : mode === 'create' ? 'Create Service Man' : 'Save Changes'}
            </button>
            <button type="button" onClick={onClose}
              style={{ flex: 1, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── View Details Modal ───────────────────────────────────────────────────────
function ServicemanViewModal({ sm, onClose, onEdit }) {
  const st = statusStyles[sm.status] || statusStyles.Pending;
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
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)', borderRadius: '16px 16px 0 0', padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose}
            style={{ position: 'absolute', top: '14px', right: '16px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '6px', width: '30px', height: '30px', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '800', color: '#fff', flexShrink: 0 }}>
              {sm.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#fff', margin: '0 0 4px' }}>{sm.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: '20px' }}>{sm.category}</span>
                <span style={{ ...st, padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{sm.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>
          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: '#fffbeb', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '20px', fontWeight: '800', color: '#f59e0b', margin: '0 0 2px' }}>{Number(sm.rating).toFixed(1)}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Rating</p>
            </div>
            <div style={{ background: '#eef2ff', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1', margin: '0 0 2px' }}>{sm.totalJobs}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Total Jobs</p>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: '800', color: '#16a34a', margin: '0 0 2px' }}>₹{Number(sm.revenue).toLocaleString('en-IN')}</p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Revenue</p>
            </div>
          </div>

          {row('Email', sm.email)}
          {row('Phone', sm.phone)}
          {row('Experience', sm.experience ? `${sm.experience} yr${sm.experience !== 1 ? 's' : ''}` : null)}
          {row('Address', sm.address)}
          {row('Vendor', sm.vendorId?.name)}
          {row('Joined', sm.createdAt ? new Date(sm.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null)}

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={onEdit}
              style={{ flex: 1, background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              Edit
            </button>
            <button onClick={onClose}
              style={{ flex: 1, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function ConfirmDeleteModal({ sm, onClose, onConfirm, loading }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '420px', width: '100%', padding: '28px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Trash2 size={26} color="#ef4444" />
        </div>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Delete Service Man?</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '22px' }}>
          Are you sure you want to delete <strong>{sm?.name}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onConfirm} disabled={loading}
            style={{ flex: 1, background: loading ? '#fca5a5' : '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
          <button onClick={onClose}
            style={{ flex: 1, background: '#fff', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '11px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000,
      background: type === 'success' ? '#16a34a' : '#dc2626', color: '#fff',
      padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px',
    }}>
      {type === 'success' ? '' : ''} {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', marginLeft: '4px' }}>×</button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServiceManPage() {
  const dispatch = useDispatch();
  const { token } = useAdminAuth();
  const { servicemen, total, stats, loading, statsLoading, error, actionLoading, actionError, actionSuccess } =
    useSelector((s) => s.servicemen);

  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modal, setModal]             = useState(null); // null | {mode:'create'} | {mode:'edit', sm}
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget]   = useState(null);
  const [toast, setToast]             = useState(null);

  // ── Load ───────────────────────────────────────────────────────────────────
  const load = useCallback(() => {
    if (!token) return;
    dispatch(fetchServicemen({ token, search, status: statusFilter }));
    dispatch(fetchServicemanStats(token));
  }, [dispatch, token, search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  // ── Success / error toasts ─────────────────────────────────────────────────
  useEffect(() => {
    if (actionSuccess) {
      setToast({ message: actionSuccess, type: 'success' });
      setModal(null);
      setDeleteTarget(null);
      dispatch(clearActionState());
    }
    if (actionError) setToast({ message: actionError, type: 'error' });
  }, [actionSuccess, actionError, dispatch]);

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleCreate = (data) => dispatch(createServiceman({ token, servicemanData: data }));
  const handleUpdate = (data) => {
    if (!modal || modal.mode !== 'edit' || !modal.sm) return;
    dispatch(updateServiceman({ token, id: modal.sm._id, servicemanData: data }));
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteServiceman({ token, id: deleteTarget._id }));
  };

  // ── Stat cards ─────────────────────────────────────────────────────────────
  const statCards = [
    { label: 'Total Service Men', value: stats.total,     Icon: HardHat,      color: '#6366f1', bg: '#eef2ff' },
    { label: 'Verified',          value: stats.verified,  Icon: CheckCircle,  color: '#10b981', bg: '#ecfdf5' },
    { label: 'Pending Approval',  value: stats.pending,   Icon: Clock,        color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Suspended',         value: stats.suspended, Icon: Ban,          color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Modals ── */}
      {viewTarget && (
        <ServicemanViewModal
          sm={viewTarget}
          onClose={() => setViewTarget(null)}
          onEdit={() => { setModal({ mode: 'edit', sm: viewTarget }); setViewTarget(null); }}
        />
      )}
      {modal?.mode === 'create' && (
        <ServicemanModal mode="create" initialData={EMPTY_FORM}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleCreate} loading={actionLoading} error={actionError} />
      )}
      {modal?.mode === 'edit' && (
        <ServicemanModal mode="edit"
          initialData={{
            name: modal.sm.name, email: modal.sm.email, phone: modal.sm.phone,
            category: modal.sm.category, experience: modal.sm.experience,
            address: modal.sm.address || '', status: modal.sm.status,
          }}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleUpdate} loading={actionLoading} error={actionError} />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal sm={deleteTarget}
          onClose={() => { setDeleteTarget(null); dispatch(clearActionState()); }}
          onConfirm={handleDelete} loading={actionLoading} />
      )}
      {toast && (
        <Toast message={toast.message} type={toast.type}
          onClose={() => { setToast(null); dispatch(clearActionState()); }} />
      )}

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Service Man</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage all registered service men</p>
        </div>
        <button onClick={() => setModal({ mode: 'create' })}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          + Add Service Man
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <s.Icon size={20} color={s.color} />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>{statsLoading ? '—' : s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div style={card}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input placeholder="Search service men..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '260px', outline: 'none' }} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#475569', background: '#fff', cursor: 'pointer' }}>
            {['All', 'Verified', 'Pending', 'Suspended'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <button onClick={load}
            style={{ padding: '9px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#475569', fontWeight: '600' }}>
            Refresh
          </button>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#94a3b8', alignSelf: 'center' }}>
            {total} service man{total !== 1 ? 'men' : ''}
          </span>
        </div>

        {/* Error */}
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
                {['Service Man', 'Category', 'Rating', 'Total Jobs', 'Revenue', 'Experience', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                    <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: '10px', verticalAlign: 'middle' }} />
                    Loading service men…
                  </td>
                </tr>
              ) : servicemen.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '14px' }}>
                    No service men found.{' '}
                    <button onClick={() => setModal({ mode: 'create' })} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                      Add your first one →
                    </button>
                  </td>
                </tr>
              ) : servicemen.map((sm, i) => (
                <tr key={sm._id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#16a34a', flexShrink: 0 }}>
                        {sm.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p style={{ margin: 0 }}>{sm.name}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: '400' }}>{sm.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{sm.category}</td>
                  <td style={{ padding: '14px 12px' }}><Stars rating={sm.rating} /></td>
                  <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{sm.totalJobs}</td>
                  <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#16a34a', whiteSpace: 'nowrap' }}>₹{Number(sm.revenue).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{sm.experience ? `${sm.experience} yr${sm.experience !== 1 ? 's' : ''}` : '—'}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ ...(statusStyles[sm.status] || statusStyles.Pending), padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{sm.status}</span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setViewTarget(sm)}
                        style={{ padding: '5px 10px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                        View
                      </button>
                      <button onClick={() => setModal({ mode: 'edit', sm })}
                        style={{ padding: '5px 10px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                        Edit
                      </button>
                      <button onClick={() => setDeleteTarget(sm)}
                        style={{ padding: '5px 10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
