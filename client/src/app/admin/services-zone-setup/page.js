'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchZones, fetchZoneStats, createZone, updateZone, deleteZone, clearActionState } from '@/store/slices/zoneSlice';
import { useAdminAuth } from '@/context/admin/AuthContext';

const card = { background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' };
const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' };

const ALL_SERVICES = ['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Civil Work', 'Interior Design', 'Carpentry', 'AC Repair'];
const PRICING_OPTIONS = ['Standard', 'Surge +10%', 'Surge +20%', 'Discounted'];

const EMPTY_FORM = { name: '', city: '', areas: '', providers: '', enabledServices: [], pricingType: 'Standard', status: 'Active' };

// ─── Zone Create/Edit Modal ───────────────────────────────────────────────────
function ZoneModal({ mode, initialData, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleService = (svc) => {
    setForm((f) => ({
      ...f,
      enabledServices: f.enabledServices.includes(svc)
        ? f.enabledServices.filter((s) => s !== svc)
        : [...f.enabledServices, svc],
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    const areas = form.areas
      ? form.areas.split(',').map((a) => a.trim()).filter(Boolean)
      : [];
    onSubmit({ ...form, areas, providers: Number(form.providers) || 0 });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#fff', borderRadius: '14px', width: '100%', maxWidth: '560px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{mode === 'create' ? '+ Add New Zone' : 'Edit Zone'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#94a3b8' }}>×</button>
        </div>
        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', color: '#dc2626', fontSize: '13px' }}>{error}</div>}
        <form onSubmit={submit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Zone Name *</label>
              <input name="name" required value={form.name} onChange={handle} placeholder="e.g. Mumbai Zone" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>City *</label>
              <input name="city" required value={form.city} onChange={handle} placeholder="e.g. Mumbai" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Providers Count</label>
              <input name="providers" type="number" min="0" value={form.providers} onChange={handle} placeholder="0" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pricing Type</label>
              <select name="pricingType" value={form.pricingType} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                {PRICING_OPTIONS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handle} style={{ ...inputStyle, background: '#fff' }}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Service Areas <span style={{ fontWeight: 400, color: '#94a3b8' }}>(comma-separated)</span></label>
              <input name="areas" value={form.areas} onChange={handle} placeholder="Andheri, Bandra, Dadar, Kurla" style={inputStyle} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Enabled Services</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {ALL_SERVICES.map((svc) => {
                  const on = form.enabledServices.includes(svc);
                  return (
                    <button key={svc} type="button" onClick={() => toggleService(svc)}
                      style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: on ? 'none' : '1px solid #e2e8f0', background: on ? '#6366f1' : '#f8fafc', color: on ? '#fff' : '#64748b' }}>
                      {svc}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" disabled={loading}
              style={{ flex: 1, background: loading ? '#a5b4fc' : '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontWeight: '700', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving…' : mode === 'create' ? 'Create Zone' : 'Save Changes'}
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

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function ConfirmDeleteModal({ zone, onClose, onConfirm, loading }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '420px', width: '100%', padding: '28px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 16px' }}>🗑️</div>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Delete Zone?</h3>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '22px' }}>Are you sure you want to delete <strong>{zone?.name}</strong>? This cannot be undone.</p>
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
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000, background: type === 'success' ? '#16a34a' : '#dc2626', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
      {type === 'success' ? '✅' : '❌'} {message}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', marginLeft: '4px' }}>×</button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServiceZonesSetup() {
  const dispatch = useDispatch();
  const { token } = useAdminAuth();
  const { zones, stats, loading, statsLoading, error, actionLoading, actionError, actionSuccess } = useSelector((s) => s.zones);

  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected]       = useState(null);
  const [modal, setModal]             = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]             = useState(null);

  const load = useCallback(() => {
    if (!token) return;
    dispatch(fetchZones({ token, search, status: statusFilter }));
    dispatch(fetchZoneStats(token));
  }, [dispatch, token, search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  // auto-select first zone
  useEffect(() => {
    if (!selected && zones.length > 0) setSelected(zones[0]);
    if (selected) {
      const fresh = zones.find((z) => z._id === selected._id);
      if (fresh) setSelected(fresh);
    }
  }, [zones]); // eslint-disable-line

  useEffect(() => {
    if (actionSuccess) {
      setToast({ message: actionSuccess, type: 'success' });
      setModal(null); setDeleteTarget(null);
      dispatch(clearActionState());
    }
    if (actionError) setToast({ message: actionError, type: 'error' });
  }, [actionSuccess, actionError, dispatch]);

  const handleCreate = (data) => dispatch(createZone({ token, zoneData: data }));
  const handleUpdate = (data) => {
    if (!modal || modal.mode !== 'edit' || !modal.zone) return;
    dispatch(updateZone({ token, id: modal.zone._id, zoneData: data }));
  };
  const handleDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteZone({ token, id: deleteTarget._id }));
    if (selected?._id === deleteTarget._id) setSelected(null);
  };

  const statCards = [
    { label: 'Total Zones',   value: stats.total,    icon: '🗺️', color: '#6366f1', bg: '#eef2ff' },
    { label: 'Active Zones',  value: stats.active,   icon: '✅', color: '#10b981', bg: '#ecfdf5' },
    { label: 'Inactive Zones',value: stats.inactive, icon: '⏸️', color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Modals */}
      {modal?.mode === 'create' && (
        <ZoneModal mode="create" initialData={EMPTY_FORM}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleCreate} loading={actionLoading} error={actionError} />
      )}
      {modal?.mode === 'edit' && (
        <ZoneModal mode="edit"
          initialData={{ name: modal.zone.name, city: modal.zone.city, areas: (modal.zone.areas || []).join(', '), providers: modal.zone.providers, enabledServices: modal.zone.enabledServices || [], pricingType: modal.zone.pricingType, status: modal.zone.status }}
          onClose={() => { setModal(null); dispatch(clearActionState()); }}
          onSubmit={handleUpdate} loading={actionLoading} error={actionError} />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal zone={deleteTarget}
          onClose={() => { setDeleteTarget(null); dispatch(clearActionState()); }}
          onConfirm={handleDelete} loading={actionLoading} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => { setToast(null); dispatch(clearActionState()); }} />}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Services Zone Setup</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Configure area-wise service zones, providers and pricing</p>
        </div>
        <button onClick={() => setModal({ mode: 'create' })}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          + Add Zone
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>{statsLoading ? '—' : s.value}</p>
            </div>
          </div>
        ))}
        <div style={{ ...card, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input placeholder="🔍 Search zones…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', flex: 1 }} />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none', color: '#475569', background: '#fff', cursor: 'pointer' }}>
            {['All', 'Active', 'Inactive'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', color: '#dc2626', fontSize: '13px' }}>{error}</div>}

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Zone list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>
              <div style={{ display: 'inline-block', width: '22px', height: '22px', border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: '8px', verticalAlign: 'middle' }} />
              Loading…
            </div>
          ) : zones.length === 0 ? (
            <div style={{ ...card, textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
              No zones found.<br />
              <button onClick={() => setModal({ mode: 'create' })} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', marginTop: '8px' }}>Add first zone →</button>
            </div>
          ) : zones.map((z) => (
            <div key={z._id} onClick={() => setSelected(z)}
              style={{ ...card, cursor: 'pointer', borderLeft: `4px solid ${selected?._id === z._id ? '#6366f1' : 'transparent'}`, background: selected?._id === z._id ? '#eef2ff' : '#fff', padding: '16px 20px', transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: '700', color: '#0f172a', margin: 0, fontSize: '14px' }}>📍 {z.name}</p>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '3px 0 0' }}>{z.city} · {z.providers} providers · {(z.areas || []).length} areas</p>
                </div>
                <span style={{ background: z.status === 'Active' ? '#dcfce7' : '#fee2e2', color: z.status === 'Active' ? '#16a34a' : '#dc2626', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>{z.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Zone details */}
        {selected ? (
          <div style={{ ...card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>📍 {selected.name}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setModal({ mode: 'edit', zone: selected })}
                  style={{ background: '#eef2ff', color: '#6366f1', border: 'none', borderRadius: '6px', padding: '6px 14px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>✏️ Edit</button>
                <button onClick={() => setDeleteTarget(selected)}
                  style={{ background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '6px 14px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>🗑️ Delete</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
              {[['City', selected.city], ['Providers', selected.providers], ['Pricing', selected.pricingType], ['Status', selected.status]].map(([k, v]) => (
                <div key={k} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.05em' }}>{k}</p>
                  <p style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: '0 0 10px' }}>Service Areas</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
              {(selected.areas || []).length === 0
                ? <span style={{ fontSize: '13px', color: '#94a3b8' }}>No areas defined.</span>
                : (selected.areas || []).map((a) => (
                    <span key={a} style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>📌 {a}</span>
                  ))}
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#374151', margin: '0 0 10px' }}>Enabled Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ALL_SERVICES.map((svc) => {
                const on = (selected.enabledServices || []).includes(svc);
                return (
                  <div key={svc} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px', color: '#374151' }}>
                    <span>🔧 {svc}</span>
                    <span style={{ background: on ? '#dcfce7' : '#f1f5f9', color: on ? '#16a34a' : '#94a3b8', padding: '2px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '600' }}>
                      {on ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px', minHeight: '200px' }}>
            ← Select a zone to view details
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
