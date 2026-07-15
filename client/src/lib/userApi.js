const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3026/api";

/**
 * Thin fetch wrapper for the customer (user-side) backend.
 * Throws an Error (with the server message) on non-2xx responses.
 */
export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const userAuthApi = {
  requestOtp: (phone) =>
    apiRequest("/user-auth/request-otp", { method: "POST", body: { phone } }),
  verifyOtp: (phone, otp) =>
    apiRequest("/user-auth/verify-otp", { method: "POST", body: { phone, otp } }),
  me: (token) => apiRequest("/user-auth/me", { token }),
  updateMe: (token, body) =>
    apiRequest("/user-auth/me", { method: "PATCH", body, token }),
};
