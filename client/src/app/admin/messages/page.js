'use client';
import { useState } from 'react';

const conversations = [
  { id:1, name:'Ravi Kumar', role:'Provider', last:'Job completed. Awaiting review.', time:'2m', unread:1, avatar:'RK', color:'#6366f1' },
  { id:2, name:'Rahul Sharma', role:'Customer', last:'When will the technician arrive?', time:'15m', unread:2, avatar:'RS', color:'#10b981' },
  { id:3, name:'Priya Mehta', role:'Customer', last:'Thank you for the quick service!', time:'1h', unread:0, avatar:'PM', color:'#f59e0b' },
  { id:4, name:'Deepak Singh', role:'Provider', last:'I need help with the app.', time:'3h', unread:0, avatar:'DS', color:'#ef4444' },
  { id:5, name:'Support Team', role:'Internal', last:'Issue #1042 has been resolved.', time:'1d', unread:0, avatar:'ST', color:'#8b5cf6' },
];

const msgs = [
  { from:'Ravi Kumar', text:'Hi, I have completed the plumbing work at BK001.', time:'10:30 AM', self:false },
  { from:'Admin', text:'Great! Has the customer confirmed the work?', time:'10:32 AM', self:true },
  { from:'Ravi Kumar', text:'Yes, they verified via OTP. Job is done.', time:'10:33 AM', self:false },
  { from:'Admin', text:'Perfect. Payment will be released within 24 hours.', time:'10:35 AM', self:true },
  { from:'Ravi Kumar', text:'Job completed. Awaiting review.', time:'10:45 AM', self:false },
];

const card = { background:'#fff', borderRadius:'12px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function Messages() {
  const [active, setActive] = useState(conversations[0]);
  const [msg, setMsg] = useState('');

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Messages</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Chat with providers, customers and internal team</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:'20px', height:'calc(100vh - 220px)' }}>
        {/* Conversation List */}
        <div style={{ ...card, overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'16px', borderBottom:'1px solid #f1f5f9' }}>
          <input placeholder="Search conversations..." style={{ width:'100%', padding:'8px 12px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'13px', outline:'none', boxSizing:'border-box' }} />
          </div>
          <div style={{ overflowY:'auto', flex:1 }}>
            {conversations.map(c => (
              <div key={c.id} onClick={() => setActive(c)} style={{ padding:'14px 16px', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', borderBottom:'1px solid #f8fafc', background:active.id===c.id?'#eef2ff':'#fff', transition:'background 0.15s' }}>
                <div style={{ width:'42px', height:'42px', borderRadius:'50%', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:'700', fontSize:'14px', flexShrink:0 }}>{c.avatar}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <p style={{ fontWeight:'700', color:'#0f172a', margin:0, fontSize:'14px' }}>{c.name}</p>
                    <span style={{ fontSize:'11px', color:'#94a3b8' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize:'12px', color:'#64748b', margin:'2px 0 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.last}</p>
                  <span style={{ fontSize:'11px', color:c.role==='Provider'?'#6366f1':c.role==='Customer'?'#10b981':'#8b5cf6', fontWeight:'600' }}>{c.role}</span>
                </div>
                {c.unread > 0 && <span style={{ background:'#ef4444', color:'#fff', borderRadius:'50%', width:'20px', height:'20px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:'700', flexShrink:0 }}>{c.unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div style={{ ...card, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:active.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:'700', fontSize:'14px' }}>{active.avatar}</div>
            <div>
              <p style={{ fontWeight:'700', color:'#0f172a', margin:0 }}>{active.name}</p>
              <p style={{ fontSize:'12px', color:'#94a3b8', margin:0 }}>{active.role} · Online</p>
            </div>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:'12px' }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent:m.self?'flex-end':'flex-start' }}>
                <div style={{ maxWidth:'65%', padding:'10px 14px', borderRadius:m.self?'16px 16px 4px 16px':'16px 16px 16px 4px', background:m.self?'#6366f1':'#f1f5f9', color:m.self?'#fff':'#374151', fontSize:'13px' }}>
                  <p style={{ margin:'0 0 4px', fontWeight:600 }}>{m.text}</p>
                  <p style={{ margin:0, fontSize:'11px', opacity:0.7, textAlign:'right' }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding:'16px', borderTop:'1px solid #f1f5f9', display:'flex', gap:'10px' }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..." style={{ flex:1, padding:'10px 14px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', outline:'none' }} />
            <button onClick={() => setMsg('')} style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 20px', fontWeight:'600', fontSize:'14px', cursor:'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
