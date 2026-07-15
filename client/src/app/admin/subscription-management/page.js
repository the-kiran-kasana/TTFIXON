'use client';
import { useState } from 'react';
import { Users, CheckCircle, DollarSign, RefreshCw } from 'lucide-react';

const plans = [
  { name:'Basic Plan', price:'₹299/mo', features:['5 Bookings/month','Standard Support','No Wallet Bonus'], color:'#64748b', bg:'#f8fafc', users:284 },
  { name:'Pro Plan', price:'₹599/mo', features:['15 Bookings/month','Priority Support','₹100 Wallet Bonus','10% Discount'], color:'#6366f1', bg:'#eef2ff', users:512, popular:true },
  { name:'Premium Plan', price:'₹999/mo', features:['Unlimited Bookings','24/7 Support','₹250 Wallet Bonus','20% Discount','AMC Eligible'], color:'#10b981', bg:'#ecfdf5', users:198 },
];

const subscribers = [
  { name:'Rahul Sharma', plan:'Pro Plan', status:'Active', start:'Jun 1, 2026', renew:'Jul 1, 2026', amount:'₹599' },
  { name:'Sneha Iyer', plan:'Premium Plan', status:'Active', start:'May 15, 2026', renew:'Jun 15, 2026', amount:'₹999' },
  { name:'Vikram Joshi', plan:'Basic Plan', status:'Expired', start:'May 1, 2026', renew:'Jun 1, 2026', amount:'₹299' },
  { name:'Anjali Das', plan:'Pro Plan', status:'Active', start:'Jun 10, 2026', renew:'Jul 10, 2026', amount:'₹599' },
];

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
const statusStyle = { Active:{ bg:'#dcfce7', color:'#16a34a' }, Expired:{ bg:'#fee2e2', color:'#dc2626' } };

const statCards = [
  { l:'Total Subscribers',   v:'994',   Icon:Users,        color:'#6366f1', bg:'#eef2ff' },
  { l:'Active Subscriptions',v:'896',   Icon:CheckCircle,  color:'#10b981', bg:'#ecfdf5' },
  { l:'Monthly Revenue',     v:'₹4.8L', Icon:DollarSign,   color:'#f59e0b', bg:'#fffbeb' },
  { l:'Renewals Due',        v:'43',    Icon:RefreshCw,    color:'#ef4444', bg:'#fef2f2' },
];

export default function SubscriptionManagement() {
  const [tab, setTab] = useState('plans');

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Subscription Management</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Monthly / Yearly plans with auto-renewal and billing automation</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px' }}>
        {statCards.map(s => (
          <div key={s.l} style={{ ...card, display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.Icon size={20} color={s.color} />
            </div>
            <div>
              <p style={{ fontSize:'12px', color:'#64748b', margin:0 }}>{s.l}</p>
              <p style={{ fontSize:'20px', fontWeight:'700', color:s.color, margin:'2px 0 0' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px', borderBottom:'2px solid #f1f5f9' }}>
        {[{ k:'plans', l:'Plans' }, { k:'subscribers', l:'Subscribers' }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{ padding:'10px 18px', border:'none', background:'none', fontWeight:'600', fontSize:'14px', cursor:'pointer', borderBottom:tab===t.k?'2px solid #6366f1':'2px solid transparent', color:tab===t.k?'#6366f1':'#64748b', marginBottom:'-2px' }}>{t.l}</button>
        ))}
      </div>

      {tab === 'plans' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'20px' }}>
          {plans.map(p => (
            <div key={p.name} style={{ ...card, borderTop:`4px solid ${p.color}`, position:'relative' }}>
              {p.popular && <span style={{ position:'absolute', top:'12px', right:'12px', background:'#6366f1', color:'#fff', padding:'2px 10px', borderRadius:'999px', fontSize:'11px', fontWeight:'700' }}>POPULAR</span>}
              <h3 style={{ fontSize:'16px', fontWeight:'700', color:'#0f172a', margin:'0 0 4px' }}>{p.name}</h3>
              <p style={{ fontSize:'24px', fontWeight:'700', color:p.color, margin:'0 0 16px' }}>{p.price}</p>
              <div style={{ marginBottom:'16px' }}>
                {p.features.map(f => (
                  <p key={f} style={{ fontSize:'13px', color:'#475569', margin:'6px 0', display:'flex', alignItems:'center', gap:'6px' }}>
                    <CheckCircle size={14} color="#10b981" /> {f}
                  </p>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px', background:p.bg, borderRadius:'8px' }}>
                <span style={{ fontSize:'13px', color:'#64748b' }}>Active users</span>
                <span style={{ fontSize:'16px', fontWeight:'700', color:p.color }}>{p.users}</span>
              </div>
              <div style={{ display:'flex', gap:'8px', marginTop:'14px' }}>
                <button style={{ flex:1, background:p.color, color:'#fff', border:'none', borderRadius:'8px', padding:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>Edit Plan</button>
                <button style={{ flex:1, background:'#f8fafc', color:'#64748b', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer' }}>View Users</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'subscribers' && (
        <div style={card}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Customer','Plan','Start Date','Renewal Date','Amount','Status','Action'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s,i) => (
                <tr key={s.name} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{s.name}</td>
                  <td style={{ padding:'12px', color:'#6366f1', fontWeight:'600' }}>{s.plan}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{s.start}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{s.renew}</td>
                  <td style={{ padding:'12px', fontWeight:'700', color:'#0f172a' }}>{s.amount}</td>
                  <td style={{ padding:'12px' }}><span style={{ background:statusStyle[s.status].bg, color:statusStyle[s.status].color, padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{s.status}</span></td>
                  <td style={{ padding:'12px' }}><button style={{ background:'#eef2ff', border:'none', borderRadius:'6px', padding:'5px 12px', fontSize:'12px', cursor:'pointer', color:'#6366f1', fontWeight:'600' }}>Renew</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
