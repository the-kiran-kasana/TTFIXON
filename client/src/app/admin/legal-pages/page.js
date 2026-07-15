'use client';
import { useState } from 'react';

const pages = [
  { id:1, title:'Terms & Conditions', lastUpdated:'Jun 1, 2026', status:'Published', words:2400 },
  { id:2, title:'Privacy Policy', lastUpdated:'Jun 1, 2026', status:'Published', words:1800 },
  { id:3, title:'Refund Policy', lastUpdated:'May 15, 2026', status:'Published', words:950 },
  { id:4, title:'Provider Agreement', lastUpdated:'Apr 10, 2026', status:'Published', words:3100 },
  { id:5, title:'Cookie Policy', lastUpdated:'Mar 1, 2026', status:'Draft', words:600 },
];

const content = {
  'Terms & Conditions': `1. ACCEPTANCE OF TERMS\nBy accessing and using the OnDemand platform, you agree to be bound by these Terms & Conditions.\n\n2. SERVICES\nOnDemand provides an AI-powered on-demand service platform connecting customers with verified service providers.\n\n3. USER OBLIGATIONS\nUsers must provide accurate information, maintain account security, and comply with all applicable laws.\n\n4. PAYMENTS\nAll payments are processed through our secure escrow system. Refunds are governed by our Refund Policy.\n\n5. WARRANTY\nAll services come with a 1-month warranty. Providers are responsible for rework within the warranty period at no extra cost.`,
  'Privacy Policy': `1. DATA COLLECTION\nWe collect personal information including name, contact details, location data, and service history.\n\n2. DATA USAGE\nYour data is used to provide services, improve our platform, and send relevant notifications.\n\n3. DATA SHARING\nWe do not sell your personal data. Data may be shared with service providers only as necessary.\n\n4. SECURITY\nAll data is encrypted and stored securely. We comply with applicable data protection regulations.`,
};

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function LegalPages() {
  const [selected, setSelected] = useState(pages[0]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Legal Pages</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Manage Terms, Privacy Policy, Agreements and compliance documents</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'24px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {pages.map(p => (
            <div key={p.id} onClick={() => setSelected(p)} style={{ ...card, cursor:'pointer', borderLeft:`4px solid ${selected.id===p.id?'#6366f1':'transparent'}`, background:selected.id===p.id?'#eef2ff':'#fff', transition:'all 0.2s', padding:'16px 20px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <p style={{ fontWeight:'700', color:'#0f172a', margin:0, fontSize:'14px' }}>{p.title}</p>
                <span style={{ background:p.status==='Published'?'#dcfce7':'#fef9c3', color:p.status==='Published'?'#16a34a':'#b45309', padding:'2px 8px', borderRadius:'999px', fontSize:'11px', fontWeight:'600' }}>{p.status}</span>
              </div>
              <p style={{ fontSize:'12px', color:'#94a3b8', margin:'4px 0 0' }}>Updated: {p.lastUpdated} · {p.words} words</p>
            </div>
          ))}
        </div>

        <div style={card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
            <div>
              <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#0f172a', margin:0 }}>{selected.title}</h3>
              <p style={{ fontSize:'13px', color:'#94a3b8', margin:'4px 0 0' }}>Last updated: {selected.lastUpdated} · {selected.words} words</p>
            </div>
            <div style={{ display:'flex', gap:'8px' }}>
              <button style={{ background:'#eef2ff', color:'#6366f1', border:'none', borderRadius:'6px', padding:'7px 16px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>Edit</button>
              <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'6px', padding:'7px 16px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>Publish</button>
            </div>
          </div>
          <textarea
            defaultValue={content[selected.title] || `Content for ${selected.title}...\n\nThis document outlines the terms and conditions for the OnDemand platform.`}
            rows={18}
            style={{ width:'100%', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'16px', fontSize:'13px', color:'#374151', outline:'none', resize:'vertical', lineHeight:'1.7', boxSizing:'border-box', fontFamily:'Inter, sans-serif' }}
          />
          <div style={{ display:'flex', gap:'10px', marginTop:'14px' }}>
            <button style={{ flex:1, background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontWeight:'700', fontSize:'13px', cursor:'pointer' }}>Save Changes</button>
            <button style={{ background:'#f8fafc', color:'#64748b', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'10px 20px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
