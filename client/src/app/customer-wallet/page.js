'use client';
import { useState } from 'react';

const wallets = [
  { customer:'Rahul Sharma', phone:'+91 98765 43210', balance:'₹1,250', credited:'₹4,500', debited:'₹3,250', loyalty:320, status:'Active', last:'Jul 9, 2026' },
  { customer:'Priya Mehta', phone:'+91 91234 56789', balance:'₹500', credited:'₹1,200', debited:'₹700', loyalty:85, status:'Active', last:'Jul 8, 2026' },
  { customer:'Sneha Iyer', phone:'+91 88776 54321', balance:'₹3,400', credited:'₹8,900', debited:'₹5,500', loyalty:620, status:'Active', last:'Jul 7, 2026' },
  { customer:'Vikram Joshi', phone:'+91 77665 43210', balance:'₹200', credited:'₹600', debited:'₹400', loyalty:40, status:'Inactive', last:'Jun 15, 2026' },
  { customer:'Anjali Das', phone:'+91 66554 32109', balance:'₹750', credited:'₹2,100', debited:'₹1,350', loyalty:180, status:'Active', last:'Jul 9, 2026' },
];

const txns = [
  { id:'TXN001', customer:'Rahul Sharma', type:'Credit', amount:'₹500', reason:'Refund', date:'Jul 9, 2026' },
  { id:'TXN002', customer:'Sneha Iyer', type:'Debit', amount:'₹1,200', reason:'Booking #BK009', date:'Jul 9, 2026' },
  { id:'TXN003', customer:'Priya Mehta', type:'Credit', amount:'₹200', reason:'Cashback', date:'Jul 8, 2026' },
  { id:'TXN004', customer:'Anjali Das', type:'Credit', amount:'₹750', reason:'Wallet Top-up', date:'Jul 8, 2026' },
];

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function CustomerWallet() {
  const [tab, setTab] = useState('wallets');
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Customer Wallet</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Escrow wallet balances, credits, debits and loyalty points</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px' }}>
        {[{ l:'Total Wallet Balance', v:'₹6,100', icon:'💰', color:'#6366f1', bg:'#eef2ff' },
          { l:'Total Credited', v:'₹17,300', icon:'⬆️', color:'#10b981', bg:'#ecfdf5' },
          { l:'Total Debited', v:'₹11,200', icon:'⬇️', color:'#ef4444', bg:'#fef2f2' },
          { l:'Loyalty Points', v:'1,245', icon:'⭐', color:'#f59e0b', bg:'#fffbeb' }].map(s => (
          <div key={s.l} style={{ ...card, display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' }}>{s.icon}</div>
            <div>
              <p style={{ fontSize:'12px', color:'#64748b', margin:0 }}>{s.l}</p>
              <p style={{ fontSize:'20px', fontWeight:'700', color:s.color, margin:'2px 0 0' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px', borderBottom:'2px solid #f1f5f9' }}>
        {[{ k:'wallets', l:'💳 Wallet Balances' }, { k:'txns', l:'📋 Transactions' }].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{ padding:'10px 18px', border:'none', background:'none', fontWeight:'600', fontSize:'14px', cursor:'pointer', borderBottom:tab===t.k?'2px solid #6366f1':'2px solid transparent', color:tab===t.k?'#6366f1':'#64748b', marginBottom:'-2px' }}>{t.l}</button>
        ))}
      </div>

      {tab === 'wallets' && (
        <div style={card}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
              <thead>
                <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                  {['Customer','Phone','Balance','Total Credited','Total Debited','Loyalty Pts','Last Activity','Status'].map(h => (
                    <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wallets.map((w,i) => (
                  <tr key={w.customer} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                    <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{w.customer}</td>
                    <td style={{ padding:'12px', color:'#64748b' }}>{w.phone}</td>
                    <td style={{ padding:'12px', fontWeight:'700', color:'#6366f1' }}>{w.balance}</td>
                    <td style={{ padding:'12px', color:'#10b981', fontWeight:'600' }}>{w.credited}</td>
                    <td style={{ padding:'12px', color:'#ef4444', fontWeight:'600' }}>{w.debited}</td>
                    <td style={{ padding:'12px' }}><span style={{ background:'#fffbeb', color:'#b45309', padding:'2px 8px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>⭐ {w.loyalty}</span></td>
                    <td style={{ padding:'12px', color:'#94a3b8', fontSize:'12px' }}>{w.last}</td>
                    <td style={{ padding:'12px' }}><span style={{ background:w.status==='Active'?'#dcfce7':'#fee2e2', color:w.status==='Active'?'#16a34a':'#dc2626', padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{w.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'txns' && (
        <div style={card}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Txn ID','Customer','Type','Amount','Reason','Date'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {txns.map((t,i) => (
                <tr key={t.id} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#6366f1' }}>{t.id}</td>
                  <td style={{ padding:'12px', color:'#0f172a' }}>{t.customer}</td>
                  <td style={{ padding:'12px' }}><span style={{ background:t.type==='Credit'?'#dcfce7':'#fee2e2', color:t.type==='Credit'?'#16a34a':'#dc2626', padding:'2px 8px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{t.type}</span></td>
                  <td style={{ padding:'12px', fontWeight:'700', color:t.type==='Credit'?'#10b981':'#ef4444' }}>{t.amount}</td>
                  <td style={{ padding:'12px', color:'#475569' }}>{t.reason}</td>
                  <td style={{ padding:'12px', color:'#94a3b8' }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
