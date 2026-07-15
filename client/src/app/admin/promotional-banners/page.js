'use client';
import { useState } from 'react';
import Image from 'next/image';

const banners = [
  { id:1, title:'Bathroom Plumbing', subtitle:'Expert bathroom plumbing & fitting services', target:'All Users', position:'Home Top', start:'Jun 1, 2026', end:'Jun 30, 2026', clicks:2840, impressions:18500, status:'Active', image:'/images/Banner/bathroom-plumbing.png' },
  { id:2, title:'Electrical Installation', subtitle:'Safe & certified electrical installation', target:'New Users', position:'App Splash', start:'Jan 1, 2026', end:'Dec 31, 2026', clicks:1240, impressions:9200, status:'Active', image:'/images/Banner/electrical-installation.png' },
  { id:3, title:'Electrical Safety', subtitle:'Get your wiring safety-checked today', target:'All Users', position:'Category Page', start:'Jun 15, 2026', end:'Sep 30, 2026', clicks:560, impressions:4100, status:'Active', image:'/images/Banner/electrical-safety.png' },
  { id:4, title:'Emergency Plumbing', subtitle:'24/7 emergency plumbing — we\'re always ready', target:'All Users', position:'Home Top', start:'Oct 15, 2026', end:'Oct 30, 2026', clicks:0, impressions:0, status:'Scheduled', image:'/images/Banner/emergency-plumbing.png' },
];

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
const statusStyle = { Active:{ bg:'#dcfce7', color:'#16a34a' }, Scheduled:{ bg:'#e0e7ff', color:'#4338ca' }, Expired:{ bg:'#fee2e2', color:'#dc2626' } };

export default function PromotionalBanners() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Promotional Banners</h1>
          <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Manage app & web promotional banners</p>
        </div>
        <button onClick={() => setShow(true)} style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'600', fontSize:'14px', cursor:'pointer' }}>+ Create Banner</button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px' }}>
        {[{ l:'Total Banners', v:banners.length, icon:'🖼️', color:'#6366f1', bg:'#eef2ff' },
          { l:'Active', v:banners.filter(b=>b.status==='Active').length, icon:'✅', color:'#10b981', bg:'#ecfdf5' },
          { l:'Total Clicks', v:'4,640', icon:'👆', color:'#f59e0b', bg:'#fffbeb' },
          { l:'Total Impressions', v:'31,800', icon:'👁️', color:'#3b82f6', bg:'#eff6ff' }].map(s => (
          <div key={s.l} style={{ ...card, display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize:'12px', color:'#64748b', margin:0 }}>{s.l}</p>
              <p style={{ fontSize:'20px', fontWeight:'700', color:s.color, margin:'2px 0 0' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'20px' }}>
        {banners.map(b => (
          <div key={b.id} style={card}>
            {/* Preview */}
            <div style={{ borderRadius:'8px', overflow:'hidden', marginBottom:'16px', position:'relative', width:'100%', height:'140px' }}>
              <Image
                src={b.image}
                alt={b.title}
                fill
                style={{ objectFit:'cover' }}
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
              <span style={{ background:statusStyle[b.status].bg, color:statusStyle[b.status].color, padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{b.status}</span>
              <span style={{ fontSize:'12px', color:'#94a3b8' }}>{b.position}</span>
            </div>
            <div style={{ fontSize:'12px', color:'#64748b', marginBottom:'12px' }}>
              <p style={{ margin:'3px 0' }}>🎯 Target: {b.target}</p>
              <p style={{ margin:'3px 0' }}>📅 {b.start} – {b.end}</p>
              <p style={{ margin:'3px 0' }}>👆 {b.clicks.toLocaleString()} clicks · 👁️ {b.impressions.toLocaleString()} impressions</p>
            </div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button style={{ flex:1, background:'#eef2ff', color:'#6366f1', border:'none', borderRadius:'6px', padding:'7px', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>Edit</button>
              <button style={{ flex:1, background:'#fef2f2', color:'#ef4444', border:'none', borderRadius:'6px', padding:'7px', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {show && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50 }}>
          <div style={{ background:'#fff', borderRadius:'16px', padding:'32px', width:'480px', maxWidth:'90vw' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
              <h2 style={{ fontSize:'18px', fontWeight:'700', color:'#0f172a', margin:0 }}>Create New Banner</h2>
              <button onClick={() => setShow(false)} style={{ background:'none', border:'none', fontSize:'20px', cursor:'pointer', color:'#64748b' }}>✕</button>
            </div>
            {[['Banner Title','text'],['Subtitle','text'],['Target Audience','text'],['Position','text'],['Start Date','date'],['End Date','date']].map(([l,t]) => (
              <div key={l} style={{ marginBottom:'14px' }}>
                <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{l}</label>
                <input type={t} style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' }} />
              </div>
            ))}
            <div style={{ display:'flex', gap:'12px', marginTop:'8px' }}>
              <button onClick={() => setShow(false)} style={{ flex:1, background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'11px', fontWeight:'700', fontSize:'14px', cursor:'pointer' }}>Create Banner</button>
              <button onClick={() => setShow(false)} style={{ flex:1, background:'#f8fafc', color:'#64748b', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'11px', fontWeight:'600', fontSize:'14px', cursor:'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
