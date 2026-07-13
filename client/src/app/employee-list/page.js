'use client';
import { useState } from 'react';

const employees = [
  { id:'EMP001', name:'Arjun Mehta', role:'Operations Manager', dept:'Operations', phone:'+91 98765 43210', email:'arjun@ondemand.com', doj:'Jan 15, 2024', salary:'₹55,000', status:'Active' },
  { id:'EMP002', name:'Sunita Reddy', role:'Support Agent', dept:'Customer Support', phone:'+91 91234 56789', email:'sunita@ondemand.com', doj:'Mar 2, 2024', salary:'₹32,000', status:'Active' },
  { id:'EMP003', name:'Rahul Verma', role:'Finance Manager', dept:'Finance', phone:'+91 99887 65432', email:'rahul@ondemand.com', doj:'Feb 10, 2023', salary:'₹68,000', status:'Active' },
  { id:'EMP004', name:'Priya Nair', role:'City Admin', dept:'Operations', phone:'+91 88776 54321', email:'priya@ondemand.com', doj:'Jun 5, 2024', salary:'₹48,000', status:'Inactive' },
  { id:'EMP005', name:'Amit Singh', role:'Support Agent', dept:'Customer Support', phone:'+91 77665 43210', email:'amit@ondemand.com', doj:'Apr 20, 2024', salary:'₹30,000', status:'Active' },
];

const statusStyle = { Active:{ bg:'#dcfce7', color:'#16a34a' }, Inactive:{ bg:'#fee2e2', color:'#dc2626' } };
const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function EmployeeList() {
  const [search, setSearch] = useState('');
  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Employee List</h1>
          <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Manage your admin team members</p>
        </div>
        <a href="/add-new-employee" style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'600', fontSize:'14px', cursor:'pointer', textDecoration:'none' }}>+ Add Employee</a>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px' }}>
        {[{ l:'Total Employees', v:employees.length, icon:'👥', color:'#6366f1', bg:'#eef2ff' },
          { l:'Active', v:employees.filter(e=>e.status==='Active').length, icon:'✅', color:'#10b981', bg:'#ecfdf5' },
          { l:'Inactive', v:employees.filter(e=>e.status==='Inactive').length, icon:'⏸️', color:'#ef4444', bg:'#fef2f2' },
          { l:'Departments', v:4, icon:'🏢', color:'#f59e0b', bg:'#fffbeb' }].map(s => (
          <div key={s.l} style={{ ...card, display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize:'12px', color:'#64748b', margin:0 }}>{s.l}</p>
              <p style={{ fontSize:'22px', fontWeight:'700', color:s.color, margin:'2px 0 0' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={card}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px' }}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', margin:0 }}>All Employees</h3>
          <input placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{ padding:'8px 14px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'13px', outline:'none' }} />
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['ID','Name','Role','Department','Phone','Email','DOJ','Salary','Status','Action'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((e,i) => (
                <tr key={e.id} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#6366f1' }}>{e.id}</td>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{e.name}</td>
                  <td style={{ padding:'12px', color:'#475569' }}>{e.role}</td>
                  <td style={{ padding:'12px', color:'#475569' }}>{e.dept}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{e.phone}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{e.email}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{e.doj}</td>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{e.salary}</td>
                  <td style={{ padding:'12px' }}><span style={{ ...statusStyle[e.status], padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600', background:statusStyle[e.status].bg }}>{e.status}</span></td>
                  <td style={{ padding:'12px', display:'flex', gap:'6px' }}>
                    <button style={{ background:'#eef2ff', border:'none', borderRadius:'6px', padding:'5px 10px', fontSize:'12px', cursor:'pointer', color:'#6366f1' }}>Edit</button>
                    <button style={{ background:'#fef2f2', border:'none', borderRadius:'6px', padding:'5px 10px', fontSize:'12px', cursor:'pointer', color:'#ef4444' }}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
