'use client';
import { useState } from 'react';

export default function Profile() {
  const [form, setForm] = useState({ name:'Admin User', email:'admin@ondemand.com', phone:'+91 98765 43210', role:'Super Admin', dept:'Management', bio:'Platform administrator for OnDemand services.' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
  const input = { width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>My Profile</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Manage your personal information and preferences</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'24px' }}>
        {/* Avatar Card */}
        <div style={{ ...card, textAlign:'center' }}>
          <div style={{ width:'96px', height:'96px', borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px', margin:'0 auto 16px' }}>👤</div>
          <p style={{ fontWeight:'700', color:'#0f172a', fontSize:'18px', margin:'0 0 4px' }}>{form.name}</p>
          <p style={{ color:'#6366f1', fontSize:'14px', fontWeight:'600', margin:'0 0 4px' }}>{form.role}</p>
          <p style={{ color:'#94a3b8', fontSize:'13px', margin:'0 0 16px' }}>{form.dept}</p>
          <button style={{ background:'#eef2ff', color:'#6366f1', border:'none', borderRadius:'8px', padding:'9px 20px', fontWeight:'600', fontSize:'13px', cursor:'pointer', width:'100%' }}>Change Photo</button>

          <div style={{ marginTop:'20px', padding:'14px', background:'#f8fafc', borderRadius:'8px', textAlign:'left' }}>
            <p style={{ fontSize:'12px', color:'#94a3b8', margin:'0 0 8px', fontWeight:'600' }}>ACCOUNT INFO</p>
            {[['Last Login','Jul 9, 2026'],['Member Since','Jan 1, 2024'],['2FA','Enabled ✅']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                <span style={{ fontSize:'12px', color:'#64748b' }}>{k}</span>
                <span style={{ fontSize:'12px', fontWeight:'600', color:'#374151' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div style={card}>
            <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>Personal Information</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              {[['name','Full Name'],['email','Email Address'],['phone','Phone Number'],['role','Role']].map(([name,lbl]) => (
                <div key={name}>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{lbl}</label>
                  <input name={name} value={form[name]} onChange={handle} style={input} />
                </div>
              ))}
            </div>
            <div style={{ marginTop:'16px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handle} rows={3} style={{ ...input, resize:'vertical' }} />
            </div>
            <button style={{ marginTop:'16px', background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 24px', fontWeight:'700', fontSize:'14px', cursor:'pointer' }}>Save Changes</button>
          </div>

          <div style={card}>
            <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'16px' }}>Change Password</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {['Current Password','New Password','Confirm New Password'].map(lbl => (
                <div key={lbl}>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{lbl}</label>
                  <input type="password" placeholder="••••••••" style={input} />
                </div>
              ))}
              <button style={{ background:'#0f172a', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontWeight:'700', fontSize:'14px', cursor:'pointer', marginTop:'4px' }}>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
