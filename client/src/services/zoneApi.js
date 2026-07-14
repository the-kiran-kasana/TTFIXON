import { apiRequest } from "@/lib/adminApi";

/**
 * All zone-related API calls.
 */
const zoneApi = {
  /** GET /api/zones?search=&status= */
  getAll: (token, { search = "", status = "All" } = {}) => {
    const params = new URLSearchParams({ search });
    if (status !== "All") params.set("status", status);
    return apiRequest(`/zones?${params}`, { token });
  },

  /** GET /api/zones/stats */
  getStats: (token) => apiRequest("/zones/stats", { token }),

  /** GET /api/zones/:id */
  getById: (token, id) => apiRequest(`/zones/${id}`, { token }),

  /** POST /api/zones */
  create: (token, zoneData) =>
    apiRequest("/zones", { method: "POST", body: zoneData, token }),

  /** PUT /api/zones/:id */
  update: (token, id, zoneData) =>
    apiRequest(`/zones/${id}`, { method: "PUT", body: zoneData, token }),

  /** DELETE /api/zones/:id */
  remove: (token, id) =>
    apiRequest(`/zones/${id}`, { method: "DELETE", token }),
};

export default zoneApi;
