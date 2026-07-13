'use client';
import { useState } from 'react';

export default function AddNewEmployee() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', department:'', doj:'', salary:'', address:'', status:'Active' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
  const input = { width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' };
  const label = { display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Add New Employee</h1>
          <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Fill in the details to onboard a new team member</p>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>
        {/* Left — Main Form */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={card}>
            <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>Personal Information</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              {[['name','Full Name','e.g. Ravi Kumar'],['email','Email Address','e.g. ravi@ondemand.com'],['phone','Phone Number','+91 98765 43210'],['doj','Date of Joining','']].map(([name,lbl,ph]) => (
                <div key={name}>
                  <label style={label}>{lbl}</label>
                  <input name={name} type={name==='doj'?'date':name==='email'?'email':'text'} placeholder={ph} value={form[name]} onChange={handle} style={input} />
                </div>
              ))}
            </div>
          </div>

          <div style={card}>
            <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>Role & Department</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <div>
                <label style={label}>Role</label>
                <select name="role" value={form.role} onChange={handle} style={{ ...input, background:'#fff' }}>
                  <option value="">Select Role</option>
                  {['Super Admin','City Admin','Operations Manager','Support Agent','Finance Manager'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={label}>Department</label>
                <select name="department" value={form.department} onChange={handle} style={{ ...input, background:'#fff' }}>
                  <option value="">Select Department</option>
                  {['Operations','Finance','Technology','Customer Support','HR'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={label}>Monthly Salary (₹)</label>
                <input name="salary" placeholder="e.g. 45000" value={form.salary} onChange={handle} style={input} />
              </div>
              <div>
                <label style={label}>Status</label>
                <select name="status" value={form.status} onChange={handle} style={{ ...input, background:'#fff' }}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div style={card}>
            <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'16px' }}>Address</h3>
            <textarea name="address" placeholder="Enter full address..." value={form.address} onChange={handle} rows={3} style={{ ...input, resize:'vertical' }} />
          </div>
        </div>

        {/* Right — Preview */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ ...card, textAlign:'center' }}>
            <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'#eef2ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', margin:'0 auto 12px' }}>👤</div>
            <p style={{ fontWeight:'700', color:'#0f172a', fontSize:'16px' }}>{form.name || 'Employee Name'}</p>
            <p style={{ color:'#64748b', fontSize:'13px' }}>{form.role || 'Role not set'}</p>
            <p style={{ color:'#94a3b8', fontSize:'12px', marginTop:'4px' }}>{form.department || 'Department'}</p>
            <div style={{ marginTop:'16px', padding:'12px', background:'#f8fafc', borderRadius:'8px', fontSize:'13px', color:'#64748b', textAlign:'left' }}>
              <p>📧 {form.email || '—'}</p>
              <p>📱 {form.phone || '—'}</p>
              <p>📅 DOJ: {form.doj || '—'}</p>
              <p>💰 ₹{form.salary || '—'}/month</p>
            </div>
          </div>

          <div style={card}>
            <h3 style={{ fontSize:'14px', fontWeight:'700', color:'#0f172a', marginBottom:'12px' }}>Permissions</h3>
            {['View Bookings','Manage Providers','Access Reports','Send Notifications','Manage Finance'].map(p => (
              <label key={p} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px', fontSize:'13px', color:'#374151', cursor:'pointer' }}>
                <input type="checkbox" defaultChecked={p==='View Bookings'} style={{ width:'16px', height:'16px' }} />
                {p}
              </label>
            ))}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'12px', fontWeight:'700', fontSize:'14px', cursor:'pointer' }}>
              ✅ Add Employee
            </button>
            <button style={{ background:'#fff', color:'#64748b', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'12px', fontWeight:'600', fontSize:'14px', cursor:'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
