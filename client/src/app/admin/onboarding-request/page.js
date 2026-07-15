"use client";
import { Check, X, Eye, FileCheck, Clock, CheckCircle2, XCircle, ClipboardList } from "lucide-react";

const requests = [
  { name: "Vikram Malhotra", initials: "VM", category: "Painting", location: "Mumbai", applied: "15 Jan 2025", docs: 4, kyc: "Pending" },
  { name: "Anjali Rathi", initials: "AR", category: "Interior", location: "Delhi", applied: "14 Jan 2025", docs: 5, kyc: "Under Review" },
  { name: "Mohit Soni", initials: "MS", category: "Plumbing", location: "Jaipur", applied: "13 Jan 2025", docs: 3, kyc: "Pending" },
  { name: "Rekha Desai", initials: "RD", category: "Cleaning", location: "Pune", applied: "12 Jan 2025", docs: 4, kyc: "Under Review" },
  { name: "Farhan Sheikh", initials: "FS", category: "Electrical", location: "Hyderabad", applied: "11 Jan 2025", docs: 5, kyc: "Pending" },
  { name: "Tanya Bhatt", initials: "TB", category: "Civil", location: "Bangalore", applied: "10 Jan 2025", docs: 3, kyc: "Under Review" },
];

const kycColors = {
  Pending: { background: "#fef9c3", color: "#ca8a04" },
  "Under Review": { background: "#dbeafe", color: "#2563eb" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#8b5cf6"];

const stats = [
  { label: "Pending",         value: "14", Icon: Clock,          color: "#f59e0b", bg: "#fffbeb" },
  { label: "Approved Today",  value: "3",  Icon: CheckCircle2,   color: "#10b981", bg: "#ecfdf5" },
  { label: "Rejected",        value: "2",  Icon: XCircle,        color: "#ef4444", bg: "#fef2f2" },
  { label: "Total This Month",value: "22", Icon: ClipboardList,  color: "#6366f1", bg: "#eef2ff" },
];

export default function OnboardingRequestPage() {
  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };

  return (
    <div style={{}}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Onboarding Requests</h1>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Review and process provider applications</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} style={card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 600 }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: s.color, margin: "4px 0 0" }}>{s.value}</p>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.Icon size={20} color={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Provider Name", "Category", "Location", "Applied Date", "Documents", "KYC Status", "Actions"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={r.name} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColors[i % avatarColors.length], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{r.initials}</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{r.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{r.category}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{r.location}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{r.applied}</td>
                <td style={{ padding: "14px 12px" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#f1f5f9", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: "#475569", fontWeight: 600 }}>
                    <FileCheck size={15} color="#6366f1" /> {r.docs} files
                  </button>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ ...kycColors[r.kyc], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{r.kyc}</span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: "#6366f1" }}><Eye size={15} /></button>
                    <button style={{ background: "#dcfce7", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: "#16a34a", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <Check size={14} /> Approve
                    </button>
                    <button style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: "#dc2626", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                      <X size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

