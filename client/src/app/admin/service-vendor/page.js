'use client';
import { useState } from 'react';

const serviceVendors = [
  { name: 'Raj Electricals', category: 'Electrical', contact: 'raj@rajelectricals.com', phone: '+91 98765 43210', serviceMen: 12, revenue: '₹2,45,000', status: 'Active' },
  { name: 'Sharma Plumbing Co.', category: 'Plumbing', contact: 'info@sharmaplumbing.com', phone: '+91 90123 45678', serviceMen: 8, revenue: '₹1,82,500', status: 'Active' },
  { name: 'GreenClean Services', category: 'Cleaning', contact: 'support@greenclean.com', phone: '+91 87654 32109', serviceMen: 20, revenue: '₹3,10,000', status: 'Active' },
  { name: 'BuildRight Civil', category: 'Civil Work', contact: 'hr@buildright.in', phone: '+91 77889 90011', serviceMen: 5, revenue: '₹95,000', status: 'Pending' },
  { name: 'PaintersHub', category: 'Painting', contact: 'hello@paintershub.com', phone: '+91 82233 44556', serviceMen: 9, revenue: '₹1,40,000', status: 'Suspended' },
  { name: 'InteriorEdge', category: 'Interior Design', contact: 'design@interioredge.com', phone: '+91 91122 33445', serviceMen: 3, revenue: '₹4,80,000', status: 'Active' },
];

const statusStyles = {
  Active:    { background: '#dcfce7', color: '#16a34a' },
  Pending:   { background: '#fef9c3', color: '#b45309' },
  Suspended: { background: '#fee2e2', color: '#dc2626' },
};

const stats = [
  { label: 'Total Vendors',    value: serviceVendors.length,                                     icon: '🏪', color: '#6366f1', bg: '#eef2ff' },
  { label: 'Active Vendors',   value: serviceVendors.filter(v => v.status === 'Active').length,  icon: '✅', color: '#10b981', bg: '#ecfdf5' },
  { label: 'Pending Approval', value: serviceVendors.filter(v => v.status === 'Pending').length, icon: '⏳', color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Suspended',        value: serviceVendors.filter(v => v.status === 'Suspended').length,icon: '🚫', color: '#ef4444', bg: '#fef2f2' },
];

const card = {
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  border: '1px solid #f1f5f9',
};

export default function ServiceVendorPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = serviceVendors.filter(v => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Service Vendor</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage registered vendor companies and their service men</p>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          + Add Vendor
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={card}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            placeholder="Search vendors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '260px', outline: 'none' }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#475569', background: '#fff', cursor: 'pointer' }}
          >
            {['All', 'Active', 'Pending', 'Suspended'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Vendor Name', 'Category', 'Contact Email', 'Phone', 'Service Men', 'Revenue', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>No vendors found.</td>
              </tr>
            ) : filtered.map((v, i) => (
              <tr key={v.name} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>
                      {v.name.charAt(0)}
                    </div>
                    {v.name}
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{v.category}</td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{v.contact}</td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{v.phone}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{v.serviceMen}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>{v.revenue}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ ...statusStyles[v.status], padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{v.status}</span>
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '5px 12px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>View</button>
                    <button style={{ padding: '5px 12px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
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
