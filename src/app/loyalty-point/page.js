'use client';
const customers = [
  { name:'Sneha Iyer', points:620, tier:'Gold', earned:'₹6,200', redeemed:'₹1,800', expiry:'Dec 31, 2026' },
  { name:'Rahul Sharma', points:320, tier:'Silver', earned:'₹3,200', redeemed:'₹500', expiry:'Dec 31, 2026' },
  { name:'Anjali Das', points:180, tier:'Bronze', earned:'₹1,800', redeemed:'₹0', expiry:'Dec 31, 2026' },
  { name:'Priya Mehta', points:85, tier:'Bronze', earned:'₹850', redeemed:'₹0', expiry:'Dec 31, 2026' },
  { name:'Vikram Joshi', points:40, tier:'Bronze', earned:'₹400', redeemed:'₹200', expiry:'Dec 31, 2026' },
];
const tierStyle = { Gold:{ bg:'#fffbeb', color:'#b45309' }, Silver:{ bg:'#f1f5f9', color:'#475569' }, Bronze:{ bg:'#fef3c7', color:'#92400e' } };
const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };

export default function LoyaltyPoint() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div>
        <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>Loyalty Points</h1>
        <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>Customer reward points, tiers and redemption tracking</p>
      </div>

      {/* Tier Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'16px' }}>
        {[{ tier:'Gold', min:500, users:customers.filter(c=>c.tier==='Gold').length, icon:'🥇', color:'#b45309', bg:'#fffbeb' },
          { tier:'Silver', min:200, users:customers.filter(c=>c.tier==='Silver').length, icon:'🥈', color:'#475569', bg:'#f1f5f9' },
          { tier:'Bronze', min:0, users:customers.filter(c=>c.tier==='Bronze').length, icon:'🥉', color:'#92400e', bg:'#fef3c7' },
          { tier:'Total Points', min:null, users:'1,245', icon:'⭐', color:'#6366f1', bg:'#eef2ff' }].map(t => (
          <div key={t.tier} style={{ ...card, borderTop:`3px solid ${t.color}` }}>
            <div style={{ fontSize:'28px', marginBottom:'8px' }}>{t.icon}</div>
            <p style={{ fontWeight:'700', color:'#0f172a', fontSize:'15px', margin:0 }}>{t.tier}</p>
            {t.min !== null && <p style={{ fontSize:'12px', color:'#94a3b8', margin:'2px 0 8px' }}>Min {t.min} pts</p>}
            <p style={{ fontSize:'24px', fontWeight:'700', color:t.color, margin:0 }}>{t.users} {t.min !== null ? 'users' : 'pts'}</p>
          </div>
        ))}
      </div>

      {/* Points Config */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'20px' }}>
        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'16px' }}>Points Rules</h3>
          {[['Earn Rate', '1 pt per ₹10 spent'],['Redemption', '1 pt = ₹1 discount'],['Expiry', '12 months'],['Min Redeem', '50 points'],['Max Redeem', '20% of order value'],['Referral Bonus', '50 pts per referral']].map(([k,v]) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #f1f5f9', fontSize:'13px' }}>
              <span style={{ color:'#64748b' }}>{k}</span>
              <span style={{ fontWeight:'600', color:'#0f172a' }}>{v}</span>
            </div>
          ))}
          <button style={{ marginTop:'16px', width:'100%', background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>Edit Rules</button>
        </div>

        <div style={card}>
          <h3 style={{ fontSize:'15px', fontWeight:'700', color:'#0f172a', marginBottom:'16px' }}>Customer Points</h3>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Customer','Points','Tier','Earned','Redeemed','Expiry'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'8px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c,i) => (
                <tr key={c.name} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'10px 12px', fontWeight:'600', color:'#0f172a' }}>{c.name}</td>
                  <td style={{ padding:'10px 12px', fontWeight:'700', color:'#6366f1' }}>{c.points}</td>
                  <td style={{ padding:'10px 12px' }}><span style={{ background:tierStyle[c.tier].bg, color:tierStyle[c.tier].color, padding:'2px 8px', borderRadius:'999px', fontSize:'11px', fontWeight:'600' }}>{c.tier}</span></td>
                  <td style={{ padding:'10px 12px', color:'#10b981', fontWeight:'600' }}>{c.earned}</td>
                  <td style={{ padding:'10px 12px', color:'#ef4444', fontWeight:'600' }}>{c.redeemed}</td>
                  <td style={{ padding:'10px 12px', color:'#94a3b8', fontSize:'12px' }}>{c.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
