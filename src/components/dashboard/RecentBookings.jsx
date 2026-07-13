"use client";

const bookings = [
  { id: "#BK-1042", customer: "Arjun Mehta", service: "Plumbing", provider: "Ravi Kumar", amount: "$120", status: "Completed", date: "Jul 9, 2026" },
  { id: "#BK-1041", customer: "Sunita Desai", service: "Painting", provider: "Priya Sharma", amount: "$340", status: "In Progress", date: "Jul 9, 2026" },
  { id: "#BK-1040", customer: "Rahul Nair", service: "Electrical", provider: "Amit Singh", amount: "$95", status: "Scheduled", date: "Jul 10, 2026" },
  { id: "#BK-1039", customer: "Divya Reddy", service: "Interior", provider: "Neha Patel", amount: "$580", status: "Cancelled", date: "Jul 8, 2026" },
];

const statusStyle = {
  "Completed":    { bg: "#ecfdf5", color: "#10b981" },
  "In Progress":  { bg: "#eef2ff", color: "#6366f1" },
  "Scheduled":    { bg: "#fffbeb", color: "#f59e0b" },
  "Cancelled":    { bg: "#fef2f2", color: "#ef4444" },
};

export default function RecentBookings() {
  return (
    <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>Recent Bookings</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "2px" }}>Latest 4 transactions</p>
        </div>
        <button style={{ fontSize: "13px", color: "#6366f1", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View all →</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Booking ID", "Customer", "Service", "Provider", "Amount", "Date", "Status"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#94a3b8", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f8fafc" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px", color: "#6366f1", fontWeight: 600 }}>{b.id}</td>
                <td style={{ padding: "12px", color: "#374151", fontWeight: 500 }}>{b.customer}</td>
                <td style={{ padding: "12px", color: "#64748b" }}>{b.service}</td>
                <td style={{ padding: "12px", color: "#64748b" }}>{b.provider}</td>
                <td style={{ padding: "12px", color: "#0f172a", fontWeight: 600 }}>{b.amount}</td>
                <td style={{ padding: "12px", color: "#94a3b8" }}>{b.date}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600,
                    background: statusStyle[b.status].bg,
                    color: statusStyle[b.status].color
                  }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
