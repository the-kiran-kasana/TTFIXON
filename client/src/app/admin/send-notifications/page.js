"use client";
import { useState } from "react";
import { Send, Bell } from "lucide-react";

const recentNotifications = [
  { title: "New Year Offer", target: "All Users", channel: "Push", sent: "12,450", delivered: "11,892", failed: "558", date: "01 Jan 2025" },
  { title: "Service Reminder", target: "Customers", channel: "WhatsApp", sent: "3,200", delivered: "3,100", failed: "100", date: "14 Jan 2025" },
  { title: "KYC Pending Alert", target: "Providers", channel: "SMS", sent: "14", delivered: "14", failed: "0", date: "13 Jan 2025" },
  { title: "Weekly Summary", target: "Service-men", channel: "Email", sent: "89", delivered: "86", failed: "3", date: "12 Jan 2025" },
  { title: "Flash Sale", target: "Customers", channel: "Push", sent: "8,400", delivered: "7,900", failed: "500", date: "10 Jan 2025" },
];

const channelColors = {
  SMS: { background: "#dbeafe", color: "#2563eb" },
  WhatsApp: { background: "#dcfce7", color: "#16a34a" },
  Push: { background: "#f3e8ff", color: "#7c3aed" },
  Email: { background: "#fef9c3", color: "#ca8a04" },
};

export default function SendNotificationsPage() {
  const [target, setTarget] = useState("All Users");
  const [channel, setChannel] = useState("Push");
  const [schedule, setSchedule] = useState("Immediate");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const card = { background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" };
  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{}}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Send Notifications</h1>
        <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0" }}>Broadcast messages to your users</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        {/* Form */}
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Bell size={20} color="#6366f1" />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Compose Notification</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Target Audience</label>
              <select value={target} onChange={(e) => setTarget(e.target.value)} style={{ ...inputStyle, background: "#fff" }}>
                {["All Users", "Customers", "Providers", "Service-men"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Channel</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["SMS", "WhatsApp", "Push", "Email"].map((ch) => (
                  <button key={ch} onClick={() => setChannel(ch)}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: channel === ch ? "2px solid #6366f1" : "1px solid #e2e8f0", cursor: "pointer", fontWeight: 600, fontSize: 13, background: channel === ch ? "#eef2ff" : "#fff", color: channel === ch ? "#6366f1" : "#64748b" }}>
                    {ch}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Notification subject..." style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here..." rows={4}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Schedule</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Immediate", "Scheduled"].map((s) => (
                  <button key={s} onClick={() => setSchedule(s)}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: schedule === s ? "2px solid #6366f1" : "1px solid #e2e8f0", cursor: "pointer", fontWeight: 600, fontSize: 13, background: schedule === s ? "#eef2ff" : "#fff", color: schedule === s ? "#6366f1" : "#64748b" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {schedule === "Scheduled" && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 6 }}>Schedule Date & Time</label>
                <input type="datetime-local" style={inputStyle} />
              </div>
            )}
            <button style={{ background: "#6366f1", color: "#fff", padding: "12px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Send size={16} /> Send Notification
            </button>
          </div>
        </div>

        {/* Preview */}
        <div style={card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Preview</h3>
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 24, color: "#fff", minHeight: 200 }}>
            <div style={{ background: "#334155", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bell size={16} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>OnDemand App</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>now</div>
                </div>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>{subject || "Notification Title"}</p>
              <p style={{ fontSize: 13, color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>{message || "Your message will appear here..."}</p>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "#64748b", textAlign: "center" }}>
              Target: <span style={{ color: "#818cf8" }}>{target}</span> · Channel: <span style={{ color: "#818cf8" }}>{channel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div style={card}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 20px" }}>Recent Notifications</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Title", "Target", "Channel", "Sent", "Delivered", "Failed", "Date"].map((h) => (
                <th key={h} style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13, padding: "10px 12px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentNotifications.map((n) => (
              <tr key={n.title} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{n.title}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{n.target}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span style={{ ...channelColors[n.channel], borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{n.channel}</span>
                </td>
                <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{n.sent}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#16a34a", fontWeight: 600 }}>{n.delivered}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#ef4444", fontWeight: 600 }}>{n.failed}</td>
                <td style={{ padding: "14px 12px", fontSize: 14, color: "#475569" }}>{n.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

