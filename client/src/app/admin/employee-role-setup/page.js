'use client';
import { useState } from 'react';

const roles = [
  { id:1, name:'Super Admin', users:2, permissions:['All Access'], color:'#6366f1', bg:'#eef2ff' },
  { id:2, name:'City Admin', users:8, permissions:['Area Control','Provider Mgmt','Revenue Dashboard','Promo Campaigns'], color:'#10b981', bg:'#ecfdf5' },
  { id:3, name:'Operations Manager', users:12, permissions:['View Bookings','Manage Providers','Assign Jobs'], color:'#f59e0b', bg:'#fffbeb' },
  { id:4, name:'Finance Manager', users:4, permissions:['View Transactions','Process Payouts','GST Reports'], color:'#3b82f6', bg:'#eff6ff' },
  { id:5, name:'Support Agent', users:24, permissions:['View Bookings','Chat Support','Raise Complaints'], color:'#8b5cf6', bg:'#f5f3ff' },
];

const allPermissions = ['View Dashboard','Manage Bookings','Manage Providers','Manage Customers','View Reports','Manage Finance','Send Notifications','Manage Discounts','Manage Categories','Employee Management','System Settings','All Access'];
const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function EmployeeRoleSetup() {
  const [selected, setSelected] = useState(roles[0]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Employee Role Setup</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Configure roles and permissions for your team</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'24px' }}>
        {/* Roles List */}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {roles.map(r => (
            <div key={r.id} onClick={() => setSelected(r)} style={{ ...card, cursor:'pointer', borderLeft:`4px solid ${selected.id===r.id ? r.color : 'transparent'}`, background: selected.id===r.id ? r.bg : '#fff', transition:'all 0.2s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontWeight:'700', color:'#0f172a', margin:0, fontSize:'14px' }}>{r.name}</p>
                  <p style={{ fontSize:'12px', color:'#64748b', margin:'2px 0 0' }}>{r.users} users</p>
                </div>
                <span style={{ background:r.bg, color:r.color, padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{r.permissions.length} perms</span>
              </div>
            </div>
          ))}
          <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>+ Add New Role</button>
        </div>

        {/* Permissions Editor */}
        <div style={card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <div>
              <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#0f172a', margin:0 }}>{selected.name}</h3>
              <p style={{ fontSize:'13px', color:'#64748b', margin:'2px 0 0' }}>{selected.users} employees assigned</p>
            </div>
            <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'8px 16px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>Save Changes</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {allPermissions.map(p => {
              const has = selected.permissions.includes(p) || selected.permissions.includes('All Access');
              return (
                <label key={p} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px', borderRadius:'8px', background: has ? '#f0fdf4' : '#f8fafc', border:`1px solid ${has ? '#bbf7d0' : '#e2e8f0'}`, cursor:'pointer', fontSize:'13px', color:'#374151' }}>
                  <input type="checkbox" defaultChecked={has} style={{ width:'16px', height:'16px', accentColor:'#6366f1' }} />
                  {p}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
