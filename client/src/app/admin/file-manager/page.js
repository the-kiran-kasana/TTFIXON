'use client';
import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Upload, FolderPlus, Files, IdCard, Camera, HardDrive } from 'lucide-react';

const files = [
  { name:'Provider KYC Documents', type:'folder', items:156,  size:'—',      modified:'Jul 9, 2026',  Icon:Folder   },
  { name:'Booking Proofs',          type:'folder', items:892,  size:'—',      modified:'Jul 9, 2026',  Icon:Folder   },
  { name:'Invoice PDFs',            type:'folder', items:1284, size:'—',      modified:'Jul 9, 2026',  Icon:Folder   },
  { name:'Service Images',          type:'folder', items:345,  size:'—',      modified:'Jul 8, 2026',  Icon:Folder   },
  { name:'Terms_Conditions_v3.pdf', type:'pdf',    items:null, size:'245 KB', modified:'Jun 1, 2026',  Icon:FileText },
  { name:'Privacy_Policy_2026.pdf', type:'pdf',    items:null, size:'182 KB', modified:'Jun 1, 2026',  Icon:FileText },
  { name:'Provider_Agreement.pdf',  type:'pdf',    items:null, size:'318 KB', modified:'Apr 10, 2026', Icon:FileText },
  { name:'platform_logo.png',       type:'image',  items:null, size:'48 KB',  modified:'Jan 15, 2026', Icon:ImageIcon},
  { name:'GST_Certificate.pdf',     type:'pdf',    items:null, size:'124 KB', modified:'Mar 5, 2026',  Icon:FileText },
];

const card = { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.08)', border:'1px solid #f1f5f9' };
const typeStyle = { folder:{ bg:'#fffbeb', color:'#b45309' }, pdf:{ bg:'#fef2f2', color:'#dc2626' }, image:{ bg:'#ecfdf5', color:'#16a34a' } };

export default function FileManagement() {
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', fontFamily:'Inter, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'24px', fontWeight:'700', color:'#0f172a', margin:0 }}>File Manager</h1>
          <p style={{ color:'#64748b', margin:'4px 0 0', fontSize:'14px' }}>KYC docs, proofs, invoices and platform assets</p>
        </div>
        <div style={{ display:'flex', gap:'10px' }}>
          <button style={{ background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:'8px', padding:'9px 16px', fontWeight:'600', fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}><FolderPlus size={14} /> New Folder</button>
          <button style={{ background:'#6366f1', color:'#fff', border:'none', borderRadius:'8px', padding:'9px 16px', fontWeight:'600', fontSize:'13px', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}><Upload size={14} /> Upload</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'16px' }}>
        {[{ l:'Total Files',  v:'2,677', Icon:Files,    color:'#6366f1', bg:'#eef2ff' },
          { l:'KYC Docs',    v:'156',   Icon:IdCard,   color:'#10b981', bg:'#ecfdf5' },
          { l:'Work Proofs', v:'892',   Icon:Camera,   color:'#f59e0b', bg:'#fffbeb' },
          { l:'Storage Used',v:'4.2 GB',Icon:HardDrive,color:'#3b82f6', bg:'#eff6ff' }].map(s => (
          <div key={s.l} style={{ ...card, display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:s.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <s.Icon size={18} color={s.color} />
            </div>
            <div>
              <p style={{ fontSize:'11px', color:'#64748b', margin:0 }}>{s.l}</p>
              <p style={{ fontSize:'18px', fontWeight:'700', color:s.color, margin:'2px 0 0' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap', gap:'12px' }}>
          <input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding:'8px 14px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'13px', outline:'none', minWidth:'200px' }} />
          <div style={{ display:'flex', gap:'6px' }}>
            {['grid','list'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding:'7px 14px', borderRadius:'6px', border:'none', background:view===v?'#6366f1':'#f1f5f9', color:view===v?'#fff':'#64748b', fontWeight:'600', fontSize:'13px', cursor:'pointer' }}>
                {v === 'grid' ? 'Grid' : 'List'}
              </button>
            ))}
          </div>
        </div>

        {view === 'grid' ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:'12px' }}>
            {filtered.map(f => (
              <div key={f.name} style={{ padding:'16px', borderRadius:'10px', border:'1px solid #f1f5f9', textAlign:'center', cursor:'pointer', transition:'all 0.2s', background:'#fafafa' }}
                onMouseEnter={e => e.currentTarget.style.background='#eef2ff'}
                onMouseLeave={e => e.currentTarget.style.background='#fafafa'}>
                <div style={{ marginBottom:'8px' }}><f.Icon size={36} color="#64748b" /></div>
                <p style={{ fontSize:'12px', fontWeight:'600', color:'#374151', margin:'0 0 4px', wordBreak:'break-word' }}>{f.name.length > 20 ? f.name.substring(0,20)+'...' : f.name}</p>
                <p style={{ fontSize:'11px', color:'#94a3b8', margin:0 }}>{f.items !== null ? `${f.items} items` : f.size}</p>
              </div>
            ))}
          </div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid #f1f5f9' }}>
                {['Name','Type','Items/Size','Modified','Action'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'11px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((f,i) => (
                <tr key={f.name} style={{ borderBottom:'1px solid #f8fafc', background:i%2===0?'#fff':'#fafafa' }}>
                  <td style={{ padding:'12px', fontWeight:'600', color:'#0f172a' }}>{f.name}</td>
                  <td style={{ padding:'12px' }}><span style={{ background:typeStyle[f.type]?.bg||'#f1f5f9', color:typeStyle[f.type]?.color||'#64748b', padding:'2px 8px', borderRadius:'999px', fontSize:'11px', fontWeight:'600' }}>{f.type}</span></td>
                  <td style={{ padding:'12px', color:'#64748b' }}>{f.items !== null ? `${f.items} items` : f.size}</td>
                  <td style={{ padding:'12px', color:'#94a3b8', fontSize:'12px' }}>{f.modified}</td>
                  <td style={{ padding:'12px', display:'flex', gap:'6px' }}>
                    <button style={{ background:'#eef2ff', border:'none', borderRadius:'6px', padding:'4px 10px', fontSize:'11px', cursor:'pointer', color:'#6366f1' }}>View</button>
                    <button style={{ background:'#ecfdf5', border:'none', borderRadius:'6px', padding:'4px 10px', fontSize:'11px', cursor:'pointer', color:'#10b981' }}>Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
