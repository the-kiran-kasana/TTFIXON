'use client';
import { useState } from 'react';

const providers = [
  { name: 'Ravi Kumar', category: 'Plumbing', rating: 4.8, jobs: 142, revenue: '₹84,200', status: 'Verified' },
  { name: 'Suresh Nair', category: 'Electrical', rating: 4.5, jobs: 98, revenue: '₹62,500', status: 'Verified' },
  { name: 'Deepak Singh', category: 'Painting', rating: 4.2, jobs: 56, revenue: '₹1,23,000', status: 'Pending' },
  { name: 'Kavya Reddy', category: 'Cleaning', rating: 4.9, jobs: 203, revenue: '₹48,600', status: 'Verified' },
  { name: 'Meena Patel', category: 'Interior Design', rating: 4.6, jobs: 34, revenue: '₹2,10,000', status: 'Suspended' },
  { name: 'Ramesh Babu', category: 'Civil Work', rating: 3.9, jobs: 21, revenue: '₹95,000', status: 'Pending' },
];

const statusStyles = {
  'Verified': { background: '#dcfce7', color: '#16a34a' },
  'Pending': { background: '#fef9c3', color: '#b45309' },
  'Suspended': { background: '#fee2e2', color: '#dc2626' },
};

function Stars({ rating }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: '14px' }}>
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
      <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '4px' }}>{rating}</span>
    </span>
  );
}

export default function ProvidersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const card = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #f1f5f9',
  };

  const filtered = providers.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Service Providers</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage all registered service providers</p>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          + Add Provider
        </button>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            placeholder="Search providers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '260px', outline: 'none' }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', color: '#475569', background: '#fff', cursor: 'pointer' }}
          >
            {['All', 'Verified', 'Pending', 'Suspended'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Provider Name', 'Category', 'Rating', 'Total Jobs', 'Revenue', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.name} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#16a34a' }}>
                      {p.name.charAt(0)}
                    </div>
                    {p.name}
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{p.category}</td>
                <td style={{ padding: '14px 12px' }}><Stars rating={p.rating} /></td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{p.jobs}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>{p.revenue}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{ ...statusStyles[p.status], padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{p.status}</span>
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

