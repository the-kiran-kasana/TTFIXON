'use client';
import { useState } from 'react';

const withdrawals = [
  { id:'WD001', provider:'Ravi Kumar', bank:'HDFC Bank ****4521', amount:'₹8,450', requested:'Jul 9, 2026', processed:'Jul 9, 2026', status:'Completed' },
  { id:'WD002', provider:'Priya Sharma', bank:'SBI ****7823', amount:'₹12,200', requested:'Jul 9, 2026', processed:'—', status:'Pending' },
  { id:'WD003', provider:'Deepak Singh', bank:'ICICI ****3391', amount:'₹5,600', requested:'Jul 8, 2026', processed:'—', status:'Processing' },
  { id:'WD004', provider:'Kavya Reddy', bank:'Axis ****9012', amount:'₹3,100', requested:'Jul 7, 2026', processed:'Jul 8, 2026', status:'Completed' },
  { id:'WD005', provider:'Amit Kumar', bank:'Kotak ****6642', amount:'₹9,800', requested:'Jul 8, 2026', processed:'—', status:'Failed' },
];

const statusStyle = { Completed:{ bg:'#dcfce7', color:'#16a34a' }, Pending:{ bg:'#fef9c3', color:'#b45309' }, Processing:{ bg:'#e0e7ff', color:'#4338ca' }, Failed:{ bg:'#fee2e2', color:'#dc2626' } };
const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function Withdraws() {
  const [tab, setTab] = useState('All');
  const tabs = ['All','Pending','Processing','Completed','Failed'];
  const filtered = tab === 'All' ? withdrawals : withdrawals.filter(w => w.status === tab);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Withdrawals</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Auto payout management for service providers</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:'16px' }}>
        {[{ l:'Total Withdrawn', v:'₹39,150', icon:'💸', color:'#6366f1', bg:'#eef2ff' },
          { l:'Pending Payouts', v:'₹17,800', icon:'⏳', color:'#f59e0b', bg:'#fffbeb' },
          { l:'Completed Today', v:'2', icon:'✅', color:'#10b981', bg:'#ecfdf5' },
          { l:'Failed', v:'1', icon:'❌', color:'#ef4444', bg:'#fef2f2' }].map(s => (
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
      <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:'7px 16px', borderRadius:'6px', border:tab===t?'none':'1px solid #e2e8f0', background:tab===t?'#6366f1':'#fff', color:tab===t?'#fff':'#64748b', fontWeight:'500', fontSize:'13px', cursor:'pointer' }}>{t}</button>
        ))}
      </div>

      <div style={card}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Withdrawal ID','Provider','Bank Account','Amount','Requested','Processed','Status','Action'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((w,i) => (
                <tr key={w.id} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#6366f1' }}>{w.id}</td>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{w.provider}</td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{w.bank}</td>
                  <td style={{ padding:'12px', fontWeight:'700', color:'#0f172a' }}>{w.amount}</td>
                  <td style={{ padding:'12px', color:'#64748b', fontSize:'12px' }}>{w.requested}</td>
                  <td style={{ padding:'12px', color:'#64748b', fontSize:'12px' }}>{w.processed}</td>
                  <td style={{ padding:'12px' }}><span style={{ background:statusStyle[w.status].bg, color:statusStyle[w.status].color, padding:'3px 10px', borderRadius:'999px', fontSize:'12px', fontWeight:'600' }}>{w.status}</span></td>
                  <td style={{ padding:'12px' }}>
                    {w.status === 'Pending' && <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'6px', padding:'5px 12px', fontSize:'12px', cursor:'pointer', fontWeight:'600' }}>Approve</button>}
                    {w.status === 'Failed' && <button style={{ background:'#fef2f2', color:'#ef4444', border:'none', borderRadius:'6px', padding:'5px 12px', fontSize:'12px', cursor:'pointer', fontWeight:'600' }}>Retry</button>}
                    {w.status === 'Completed' && <span style={{ color:'#94a3b8', fontSize:'12px' }}>—</span>}
                    {w.status === 'Processing' && <span style={{ color:'#4338ca', fontSize:'12px', fontWeight:'600' }}>In Progress...</span>}
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
