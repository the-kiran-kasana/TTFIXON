'use client';
import { useState } from 'react';

const zones = [
  { id:1, name:'Mumbai Zone', city:'Mumbai', areas:['Andheri','Bandra','Dadar','Kurla','Thane'], providers:48, services:5, status:'Active', pricing:'Standard' },
  { id:2, name:'Delhi Zone', city:'Delhi', areas:['Connaught Place','Dwarka','Rohini','Lajpat Nagar'], providers:34, services:5, status:'Active', pricing:'Standard' },
  { id:3, name:'Bangalore Zone', city:'Bangalore', areas:['Koramangala','Whitefield','Jayanagar','Indiranagar'], providers:29, services:4, status:'Active', pricing:'+10% Surge' },
  { id:4, name:'Pune Zone', city:'Pune', areas:['Kothrud','Wakad','Baner','Hadapsar'], providers:18, services:3, status:'Inactive', pricing:'Standard' },
];

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
const services = ['Plumbing','Painting','Electrical','Interior Design','Civil Work'];

export default function ServiceZonesSetup() {
  const [selected, setSelected] = useState(zones[0]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Services Zone Setup</h1>
          <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Configure area-wise service zones, providers and pricing</p>
        </div>
        <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'600', fontSize:'14px', cursor:'pointer' }}>+ Add Zone</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'24px' }}>
        {/* Zone list */}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {zones.map(z => (
            <div key={z.id} onClick={() => setSelected(z)} style={{ ...card, cursor:'pointer', borderLeft:`4px solid ${selected.id===z.id?'#6366f1':'transparent'}`, background:selected.id===z.id?'#eef2ff':'#fff', transition:'all 0.2s' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <p style={{ fontWeight:'700', color:'#0f172a', margin:0, fontSize:'14px' }}>📍 {z.name}</p>
                  <p style={{ fontSize:'12px', color:'#64748b', margin:'2px 0 0' }}>{z.providers} providers · {z.areas.length} areas</p>
                </div>
                <span style={{ background:z.status==='Active'?'#dcfce7':'#fee2e2', color:z.status==='Active'?'#16a34a':'#dc2626', padding:'2px 8px', borderRadius:'999px', fontSize:'11px', fontWeight:'600' }}>{z.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Zone details */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div style={card}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
              <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#0f172a', margin:0 }}>📍 {selected.name}</h3>
              <div style={{ display:'flex', gap:'8px' }}>
                <button style={{ background:'#eef2ff', color:'#6366f1', border:'none', borderRadius:'6px', padding:'6px 14px', fontWeight:'600', fontSize:'12px', cursor:'pointer' }}>Edit</button>
                <button style={{ background:'#fef2f2', color:'#ef4444', border:'none', borderRadius:'6px', padding:'6px 14px', fontWeight:'600', fontSize:'12px', cursor:'pointer' }}>Delete</button>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }}>
              {[['City', selected.city],['Providers', selected.providers],['Services', `${selected.services} enabled`],['Pricing', selected.pricing]].map(([k,v]) => (
                <div key={k} style={{ background:'#f8fafc', padding:'12px', borderRadius:'8px' }}>
                  <p style={{ fontSize:'12px', color:'#94a3b8', margin:'0 0 4px' }}>{k}</p>
                  <p style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', margin:0 }}>{v}</p>
                </div>
              ))}
            </div>
            <h4 style={{ fontSize:'13px', fontWeight:'700', color:'#374151', marginBottom:'10px' }}>Service Areas</h4>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'20px' }}>
              {selected.areas.map(a => (
                <span key={a} style={{ background:'#eef2ff', color:'#4338ca', padding:'4px 12px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>📌 {a}</span>
              ))}
              <button style={{ background:'#f1f5f9', color:'#64748b', border:'1px dashed #cbd5e1', padding:'4px 12px', borderRadius:'999px', fontSize:'12px', cursor:'pointer' }}>+ Add Area</button>
            </div>
            <h4 style={{ fontSize:'13px', fontWeight:'700', color:'#374151', marginBottom:'10px' }}>Available Services</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {services.map(s => (
                <label key={s} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:'#f8fafc', borderRadius:'8px', cursor:'pointer', fontSize:'13px', color:'#374151' }}>
                  <span>🔧 {s}</span>
                  <input type="checkbox" defaultChecked={selected.services >= services.indexOf(s)+1} style={{ width:'16px', height:'16px', accentColor:'#6366f1' }} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
