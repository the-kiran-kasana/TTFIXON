/**
 * Admin → Customers API calls.
 */
import { apiRequest } from "@/lib/adminApi";

const customersApi = {
  /** GET /api/users?search=&role=&status= */
  list: (token, params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
    return apiRequest(`/users${qs ? `?${qs}` : ""}`, { token });
  },

  /** POST /api/users */
  create: (token, body) =>
    apiRequest("/users", { method: "POST", body, token }),

  /** PATCH /api/users/:id */
  update: (token, id, body) =>
    apiRequest(`/users/${id}`, { method: "PATCH", body, token }),

  /** DELETE /api/users/:id */
  remove: (token, id) =>
    apiRequest(`/users/${id}`, { method: "DELETE", token }),
};

export default customersApi;
