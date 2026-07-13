'use client';
import { useState } from 'react';

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
const input = { width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none', boxSizing:'border-box' };

function Toggle({ on }) {
  const [v, setV] = useState(on);
  return (
    <div onClick={() => setV(!v)} style={{ width:'44px', height:'24px', borderRadius:'999px', background:v?'#6366f1':'#cbd5e1', cursor:'pointer', display:'flex', alignItems:'center', padding:'2px', transition:'background 0.2s' }}>
      <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'#fff', transform:v?'translateX(20px)':'translateX(0)', transition:'transform 0.2s' }} />
    </div>
  );
}

export default function Settings() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Settings</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Platform configuration and preferences</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
        {/* General Settings */}
        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>⚙️ General</h3>
          {[['Platform Name','OnDemand'],['Support Email','support@ondemand.com'],['Support Phone','+91 1800 123 456'],['Default Currency','INR (₹)'],['Default Language','English']].map(([l,v]) => (
            <div key={l} style={{ marginBottom:'14px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{l}</label>
              <input defaultValue={v} style={input} />
            </div>
          ))}
          <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'700', fontSize:'13px', cursor:'pointer' }}>Save</button>
        </div>

        {/* Notifications */}
        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>🔔 Notifications</h3>
          {[['Email Notifications',true],['SMS Alerts',true],['Push Notifications',true],['WhatsApp Updates',false],['Weekly Reports',true],['Fraud Alerts',true]].map(([l,v]) => (
            <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #f8fafc' }}>
              <span style={{ fontSize:'14px', color:'#374151' }}>{l}</span>
              <Toggle on={v} />
            </div>
          ))}
        </div>

        {/* Payment Settings */}
        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>💳 Payment & Commission</h3>
          {[['Platform Commission','18%'],['GST Rate','18%'],['Auto Payout Cycle','Weekly'],['Min Payout Amount','₹500'],['Escrow Hold Period','24 hours']].map(([l,v]) => (
            <div key={l} style={{ marginBottom:'14px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{l}</label>
              <input defaultValue={v} style={input} />
            </div>
          ))}
          <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'700', fontSize:'13px', cursor:'pointer' }}>Save</button>
        </div>

        {/* Security */}
        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'20px' }}>🔒 Security</h3>
          {[['Two-Factor Auth',true],['Login Alerts',true],['Session Timeout (mins)'],['IP Whitelist'],['Audit Logging',true]].map((item,i) => (
            <div key={i} style={{ marginBottom:'14px' }}>
              {Array.isArray(item) && item.length === 2 ? (
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0' }}>
                  <span style={{ fontSize:'14px', color:'#374151' }}>{item[0]}</span>
                  <Toggle on={item[1]} />
                </div>
              ) : (
                <>
                  <label style={{ display:'block', fontSize:'13px', fontWeight:'600', color:'#374151', marginBottom:'5px' }}>{item[0]}</label>
                  <input defaultValue={item[0]==='Session Timeout (mins)'?'30':''} placeholder={item[0]==='IP Whitelist'?'e.g. 192.168.1.0/24':''} style={input} />
                </>
              )}
            </div>
          ))}
          <button style={{ background:'#0f172a', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'700', fontSize:'13px', cursor:'pointer' }}>Save Security Settings</button>
        </div>
      </div>
    </div>
  );
}
