'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminAuth } from '@/context/admin/AuthContext';
import { fetchCustomers, createCustomer, clearCreateError } from '@/store/admin/customersSlice';

const CATEGORY_OPTIONS = ['Painting', 'Plumbing', 'Electrical', 'Interior Design', 'Civil Work', 'Cleaning'];

const card = {
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  border: '1px solid #f1f5f9',
};

const emptyForm = { name: '', phone: '', email: '', location: '', categories: [] };

function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function CustomersPage() {
  const { token } = useAdminAuth();
  const dispatch = useDispatch();
  const { items: customers, loading, error, creating, createError } = useSelector(
    (state) => state.customers
  );

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  // Fetch (debounced) whenever the token or search term changes.
  useEffect(() => {
    if (!token) return;
    const t = setTimeout(() => {
      dispatch(fetchCustomers({ token, params: { search } }));
    }, 300);
    return () => clearTimeout(t);
  }, [dispatch, token, search]);

  // Auto-refresh so new logins (lastLoginAt) show up without a manual reload.
  useEffect(() => {
    if (!token) return;
    const id = setInterval(() => {
      dispatch(fetchCustomers({ token, params: { search } }));
    }, 15000); // every 15s
    return () => clearInterval(id);
  }, [dispatch, token, search]);

  const toggleCategory = (cat) =>
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));

  const openForm = () => {
    setForm(emptyForm);
    setFormError('');
    dispatch(clearCreateError());
    setShowForm(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!/^[0-9]{10}$/.test(form.phone)) {
      setFormError('Enter a valid 10-digit phone number');
      return;
    }
    const result = await dispatch(createCustomer({ token, body: form }));
    if (createCustomer.fulfilled.match(result)) {
      setShowForm(false);
      setForm(emptyForm);
    }
  };

  // Prefer the client-side validation error, else the server/thunk error.
  const shownFormError = formError || createError;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Customers</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage your customer base</p>
        </div>
        <button
          onClick={openForm}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          + Add Customer
        </button>
      </div>

      <div style={card}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <input
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '320px', outline: 'none' }}
          />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            Live · auto-refreshes every 15s
          </span>
        </div>

        {error && <p style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
        {loading && customers.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: 14 }}>Loading customers…</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  {['Name', 'Phone', 'Role', 'Categories', 'Last Login', 'Logins', 'Status'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 && (
                  <tr><td colSpan={7} style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No customers yet.</td></tr>
                )}
                {customers.map((c, i) => (
                  <tr key={c._id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>
                          {(c.name || c.phone || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          {c.name || <span style={{ color: '#94a3b8' }}>Unnamed</span>}
                          {c.email && <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 400 }}>{c.email}</div>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{c.phone}</td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569', textTransform: 'capitalize' }}>{c.role}</td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>
                      {(c.categories && c.categories.length) ? c.categories.join(', ') : '—'}
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>{formatDate(c.lastLoginAt)}</td>
                    <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{c.loginCount || 0}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        background: c.status === 'active' ? '#dcfce7' : c.status === 'blocked' ? '#fee2e2' : '#f1f5f9',
                        color: c.status === 'active' ? '#16a34a' : c.status === 'blocked' ? '#dc2626' : '#64748b',
                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize',
                      }}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreate}
            style={{ ...card, width: 480, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Add Customer</h2>

            <Field label="Name">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Full name" />
            </Field>

            <Field label="Phone *">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} placeholder="10-digit phone" />
            </Field>

            <Field label="Email">
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="email@example.com" />
            </Field>

            <Field label="Location">
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} placeholder="City" />
            </Field>

            <Field label="Categories">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CATEGORY_OPTIONS.map((cat) => {
                  const active = form.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        border: active ? '1px solid #6366f1' : '1px solid #e2e8f0',
                        background: active ? '#e0e7ff' : '#fff',
                        color: active ? '#4338ca' : '#64748b',
                      }}
                    >{cat}</button>
                  );
                })}
              </div>
            </Field>

            {shownFormError && <p style={{ color: '#dc2626', fontSize: 13, margin: '0 0 12px' }}>{shownFormError}</p>}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#475569', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={creating} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: creating ? 0.7 : 1 }}>
                {creating ? 'Saving…' : 'Create Customer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' };

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}
