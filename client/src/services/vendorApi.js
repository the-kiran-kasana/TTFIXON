import { apiRequest } from "@/lib/adminApi";

/**
 * All vendor-related API calls.
 * Every method receives `token` as its first argument.
 */
const vendorApi = {
  /** GET /api/vendors?search=&status=&page= */
  getAll: (token, { search = "", status = "All", page = 1 } = {}) => {
    const params = new URLSearchParams({ search, page });
    if (status !== "All") params.set("status", status);
    return apiRequest(`/vendors?${params}`, { token });
  },

  /** GET /api/vendors/stats */
  getStats: (token) => apiRequest("/vendors/stats", { token }),

  /** GET /api/vendors/:id */
  getById: (token, id) => apiRequest(`/vendors/${id}`, { token }),

  /** POST /api/vendors */
  create: (token, vendorData) =>
    apiRequest("/vendors", { method: "POST", body: vendorData, token }),

  /** PUT /api/vendors/:id */
  update: (token, id, vendorData) =>
    apiRequest(`/vendors/${id}`, { method: "PUT", body: vendorData, token }),

  /** DELETE /api/vendors/:id */
  remove: (token, id) =>
    apiRequest(`/vendors/${id}`, { method: "DELETE", token }),
};

export default vendorApi;
