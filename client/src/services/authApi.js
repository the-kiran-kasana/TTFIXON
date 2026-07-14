import { apiRequest } from "@/lib/adminApi";

/**
 * Auth-related API calls (re-exports + extends adminApi for convenience).
 */
const authApi = {
  /** POST /api/auth/login */
  login: (email, password) =>
    apiRequest("/auth/login", { method: "POST", body: { email, password } }),

  /** GET /api/auth/me */
  me: (token) => apiRequest("/auth/me", { token }),

  /** POST /api/auth/register */
  register: (name, email, password, role) =>
    apiRequest("/auth/register", { method: "POST", body: { name, email, password, role } }),
};

export default authApi;
