'use client';
import { useState } from 'react';

const customers = [
  { name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@email.com', location: 'Mumbai', bookings: 14, wallet: '₹1,250', status: 'Active' },
  { name: 'Priya Mehta', phone: '+91 91234 56789', email: 'priya@email.com', location: 'Delhi', bookings: 8, wallet: '₹500', status: 'Active' },
  { name: 'Amit Verma', phone: '+91 99887 65432', email: 'amit@email.com', location: 'Bangalore', bookings: 3, wallet: '₹0', status: 'Inactive' },
  { name: 'Sneha Iyer', phone: '+91 88776 54321', email: 'sneha@email.com', location: 'Chennai', bookings: 22, wallet: '₹3,400', status: 'Active' },
  { name: 'Vikram Joshi', phone: '+91 77665 43210', email: 'vikram@email.com', location: 'Hyderabad', bookings: 6, wallet: '₹200', status: 'Active' },
  { name: 'Anjali Das', phone: '+91 66554 32109', email: 'anjali@email.com', location: 'Pune', bookings: 1, wallet: '₹750', status: 'Inactive' },
];

export default function CustomersPage() {
  const [search, setSearch] = useState('');

  const card = {
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    border: '1px solid #f1f5f9',
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Customers</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Manage your customer base</p>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          Export
        </button>
      </div>

      <div style={card}>
        <div style={{ marginBottom: '20px' }}>
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', width: '300px', outline: 'none' }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Name', 'Phone', 'Email', 'Location', 'Total Bookings', 'Wallet Balance', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.email} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>
                      {c.name.charAt(0)}
                    </div>
                    {c.name}
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{c.phone}</td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{c.email}</td>
                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#475569' }}>{c.location}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#0f172a', textAlign: 'center' }}>{c.bookings}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>{c.wallet}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{
                    background: c.status === 'Active' ? '#dcfce7' : '#f1f5f9',
                    color: c.status === 'Active' ? '#16a34a' : '#64748b',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
                  }}>{c.status}</span>
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '5px 12px', background: '#e0e7ff', color: '#4338ca', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>View</button>
                    <button style={{ padding: '5px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Block</button>
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

