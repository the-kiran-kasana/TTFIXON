'use client';
import { useState } from 'react';
import { ClipboardList, CalendarDays, XCircle, KeyRound, Siren, CheckCircle, ShieldCheck, Camera, Image, Video, MapPin } from 'lucide-react';

const bookings = [
  { id: 'BK001', customer: 'Rahul Sharma', service: 'Plumbing', provider: 'Ravi Kumar', amount: '₹850', date: '2026-07-09', type: 'Instant', otp: '4521', status: 'Completed', tracking: 'Arrived' },
  { id: 'BK002', customer: 'Priya Mehta', service: 'Electrical', provider: 'Suresh Nair', amount: '₹1200', date: '2026-07-09', type: 'Scheduled', otp: '7823', status: 'In Progress', tracking: 'On the way' },
  { id: 'BK003', customer: 'Amit Verma', service: 'Painting', provider: 'Deepak Singh', amount: '₹4500', date: '2026-07-10', type: 'Scheduled', otp: '3391', status: 'Scheduled', tracking: 'Assigned' },
  { id: 'BK004', customer: 'Sneha Iyer', service: 'Cleaning', provider: 'Kavya Reddy', amount: '₹600', date: '2026-07-08', type: 'Instant', otp: '—', status: 'Cancelled', tracking: '—' },
  { id: 'BK005', customer: 'Vikram Joshi', service: 'Interior', provider: 'Meena Patel', amount: '₹12000', date: '2026-07-09', type: 'Scheduled', otp: '6642', status: 'Completed', tracking: 'Done' },
  { id: 'BK006', customer: 'Anjali Das', service: 'Civil Work', provider: 'Ramesh Babu', amount: '₹8500', date: '2026-07-10', type: 'Instant', otp: '1187', status: 'In Progress', tracking: 'Working' },
];

const statusStyles = {
  'Completed':   { background: '#dcfce7', color: '#16a34a' },
  'In Progress': { background: '#e0e7ff', color: '#4338ca' },
  'Scheduled':   { background: '#fef9c3', color: '#b45309' },
  'Cancelled':   { background: '#fee2e2', color: '#dc2626' },
};

const trackingStyles = {
  'Arrived':    { background: '#d1fae5', color: '#065f46' },
  'On the way': { background: '#dbeafe', color: '#1e40af' },
  'Assigned':   { background: '#fef3c7', color: '#92400e' },
  'Working':    { background: '#ede9fe', color: '#5b21b6' },
  'Done':       { background: '#f0fdf4', color: '#166534' },
  '—':          { background: '#f1f5f9', color: '#94a3b8' },
};

const stats = [
  { label: 'Total Bookings', value: '1,284', Icon: ClipboardList, color: '#6366f1', bg: '#eef2ff', change: '+8.3%' },
  { label: 'Scheduled', value: '442', Icon: CalendarDays, color: '#10b981', bg: '#ecfdf5', change: '+12.4%' },
  { label: 'Cancelled', value: '45', Icon: XCircle, color: '#ef4444', bg: '#fef2f2', change: '-2.1%' },
];

const proofUploads = [
  { id: 'BK001', customer: 'Rahul Sharma', service: 'Plumbing', before: 'Uploaded', after: 'Uploaded', video: 'Uploaded', gps: '19.0760° N, 72.8777° E', timestamp: '09 Jul 2026, 10:32 AM', status: 'Verified' },
  { id: 'BK002', customer: 'Priya Mehta', service: 'Electrical', before: 'Uploaded', after: 'Pending', video: 'Pending', gps: '18.9220° N, 72.8347° E', timestamp: '09 Jul 2026, 11:15 AM', status: 'Partial' },
  { id: 'BK005', customer: 'Vikram Joshi', service: 'Interior', before: 'Uploaded', after: 'Uploaded', video: 'Uploaded', gps: '19.1136° N, 72.8697° E', timestamp: '09 Jul 2026, 09:00 AM', status: 'Verified' },
];

const card = {
  background: '#fff', borderRadius: '12px', padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9',
};

export default function BookingPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('bookings');
  const filters = ['All', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'];

  const filtered = activeFilter === 'All' ? bookings : bookings.filter(b =>
    b.status === activeFilter || b.type === activeFilter
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Booking Management</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>Instant + Scheduled bookings with live tracking & OTP verification</p>
        </div>
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          + New Booking
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.Icon size={22} color={s.color} />
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0' }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: s.change.startsWith('+') ? '#10b981' : '#ef4444', margin: 0 }}>{s.change} this month</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #f1f5f9', paddingBottom: '0' }}>
        {[
          { key: 'bookings', label: 'All Bookings' },
          { key: 'tracking', label: 'Live Tracking' },
          { key: 'otp', label: 'OTP & Safety' },
          { key: 'proof', label: 'Work Proof' },
        ].map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: '10px 18px', border: 'none', background: 'none', fontWeight: '600',
            fontSize: '14px', cursor: 'pointer',
            borderBottom: activeTab === t.key ? '2px solid #6366f1' : '2px solid transparent',
            color: activeTab === t.key ? '#6366f1' : '#64748b',
            marginBottom: '-2px',
          }}>{t.label}</button>
        ))}
      </div>

      {/* TAB: All Bookings */}
      {activeTab === 'bookings' && (
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: '6px 14px', borderRadius: '6px', border: activeFilter === f ? 'none' : '1px solid #e2e8f0',
                  background: activeFilter === f ? '#6366f1' : '#fff',
                  color: activeFilter === f ? '#fff' : '#64748b',
                  fontWeight: '500', fontSize: '13px', cursor: 'pointer',
                }}>{f}</button>
              ))}
            </div>
            <input placeholder="Search bookings..." style={{ padding: '8px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', outline: 'none' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  {['Booking ID', 'Customer', 'Service', 'Provider', 'Type', 'Amount', 'Date', 'Tracking', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#6366f1' }}>{b.id}</td>
                    <td style={{ padding: '12px', fontWeight: '500', color: '#0f172a' }}>{b.customer}</td>
                    <td style={{ padding: '12px', color: '#475569' }}>{b.service}</td>
                    <td style={{ padding: '12px', color: '#475569' }}>{b.provider}</td>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#0f172a' }}>{b.amount}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{b.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ ...trackingStyles[b.tracking], padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '600' }}>{b.tracking}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ ...statusStyles[b.status], padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>{b.status}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button style={{ background: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', color: '#475569', fontWeight: '500' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: Live Tracking */}
      {activeTab === 'tracking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...card, background: 'linear-gradient(135deg,#1e293b,#334155)', color: '#fff', padding: '20px' }}>
            <p style={{ fontWeight: '700', fontSize: '16px', margin: '0 0 4px' }}>Live GPS Tracking</p>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Real-time provider location with ETA for active bookings</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
            {bookings.filter(b => b.status === 'In Progress' || b.status === 'Scheduled').map(b => (
              <div key={b.id} style={{ ...card, borderLeft: '4px solid #6366f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '700', color: '#6366f1', fontSize: '14px' }}>{b.id}</span>
                  <span style={{ ...statusStyles[b.status], padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>{b.status}</span>
                </div>
                <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#0f172a' }}>{b.customer}</p>
                <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#64748b' }}>{b.service} · {b.provider}</p>
                <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#64748b' }}>Status: <strong>{b.tracking}</strong></p>
                <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '10px', fontSize: '12px', color: '#475569' }}>
                  <p style={{ margin: '0 0 4px' }}>Estimated Arrival: <strong>12 min</strong></p>
                  <p style={{ margin: 0 }}>OTP: <strong style={{ color: '#6366f1', letterSpacing: '2px' }}>{b.otp}</strong></p>
                </div>
                <button style={{ marginTop: '12px', width: '100%', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                  View on Map
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: OTP & Safety */}
      {activeTab === 'otp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
            {[
              { Icon: KeyRound,    label: 'OTP Verified Today',   value: '38', color: '#10b981', bg: '#ecfdf5' },
              { Icon: Siren,       label: 'SOS Alerts Today',     value: '0',  color: '#ef4444', bg: '#fef2f2' },
              { Icon: CheckCircle, label: 'Jobs Started via OTP', value: '34', color: '#6366f1', bg: '#eef2ff' },
              { Icon: ShieldCheck, label: 'Jobs Ended via OTP',   value: '31', color: '#f59e0b', bg: '#fffbeb' },
            ].map(s => (
              <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.Icon size={22} color={s.color} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: '26px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={card}>
            <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>OTP Verification Log</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  {['Booking ID', 'Customer', 'Provider', 'OTP', 'Start Time', 'End OTP', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#6366f1' }}>{b.id}</td>
                    <td style={{ padding: '12px', color: '#0f172a' }}>{b.customer}</td>
                    <td style={{ padding: '12px', color: '#475569' }}>{b.provider}</td>
                    <td style={{ padding: '12px', fontWeight: '700', letterSpacing: '2px', color: '#6366f1' }}>{b.otp}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{b.date} 09:00</td>
                    <td style={{ padding: '12px', fontWeight: '700', color: b.status === 'Completed' ? '#10b981' : '#f59e0b' }}>
                      {b.status === 'Completed' ? 'Used' : 'Pending'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ ...statusStyles[b.status], padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: Work Proof */}
      {activeTab === 'proof' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
            {[
              { Icon: Camera,     label: 'Before Photos', value: '38', color: '#6366f1', bg: '#eef2ff' },
              { Icon: Image,      label: 'After Photos',  value: '35', color: '#10b981', bg: '#ecfdf5' },
              { Icon: Video,      label: 'Video Proofs',  value: '29', color: '#f59e0b', bg: '#fffbeb' },
              { Icon: MapPin,     label: 'GPS Verified',  value: '38', color: '#3b82f6', bg: '#eff6ff' },
            ].map(s => (
              <div key={s.label} style={{ ...card, display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.Icon size={22} color={s.color} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: '26px', fontWeight: '700', color: s.color, margin: '2px 0 0' }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={card}>
            <h3 style={{ fontWeight: '700', color: '#0f172a', marginBottom: '16px', fontSize: '15px' }}>Work Proof & GPS Validation</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                    {['Booking ID', 'Customer', 'Service', 'Before Photo', 'After Photo', 'Video', 'GPS Location', 'Timestamp', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proofUploads.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '12px', fontWeight: '600', color: '#6366f1' }}>{p.id}</td>
                      <td style={{ padding: '12px', color: '#0f172a', fontWeight: '500' }}>{p.customer}</td>
                      <td style={{ padding: '12px', color: '#475569' }}>{p.service}</td>
                      <td style={{ padding: '12px', color: '#10b981', fontWeight: '500' }}>{p.before}</td>
                      <td style={{ padding: '12px', color: p.after === 'Pending' ? '#f59e0b' : '#10b981', fontWeight: '500' }}>{p.after}</td>
                      <td style={{ padding: '12px', color: p.video === 'Pending' ? '#f59e0b' : '#10b981', fontWeight: '500' }}>{p.video}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '12px' }}>{p.gps}</td>
                      <td style={{ padding: '12px', color: '#64748b', fontSize: '12px', whiteSpace: 'nowrap' }}>{p.timestamp}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          background: p.status === 'Verified' ? '#dcfce7' : '#fef9c3',
                          color: p.status === 'Verified' ? '#16a34a' : '#b45309',
                          padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600'
                        }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
