const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3026/api";

/**
 * Thin fetch wrapper for the admin backend.
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

export const adminAuthApi = {
  login: (email, password) =>
    apiRequest("/auth/login", { method: "POST", body: { email, password } }),
  me: (token) => apiRequest("/auth/me", { token }),
};
