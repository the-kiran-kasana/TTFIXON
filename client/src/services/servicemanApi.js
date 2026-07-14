import { apiRequest } from "@/lib/adminApi";

/**
 * All serviceman-related API calls.
 */
const servicemanApi = {
  /** GET /api/servicemen?search=&status=&page= */
  getAll: (token, { search = "", status = "All", page = 1 } = {}) => {
    const params = new URLSearchParams({ search, page });
    if (status !== "All") params.set("status", status);
    return apiRequest(`/servicemen?${params}`, { token });
  },

  /** GET /api/servicemen/stats */
  getStats: (token) => apiRequest("/servicemen/stats", { token }),

  /** GET /api/servicemen/:id */
  getById: (token, id) => apiRequest(`/servicemen/${id}`, { token }),

  /** POST /api/servicemen */
  create: (token, servicemanData) =>
    apiRequest("/servicemen", { method: "POST", body: servicemanData, token }),

  /** PUT /api/servicemen/:id */
  update: (token, id, servicemanData) =>
    apiRequest(`/servicemen/${id}`, { method: "PUT", body: servicemanData, token }),

  /** DELETE /api/servicemen/:id */
  remove: (token, id) =>
    apiRequest(`/servicemen/${id}`, { method: "DELETE", token }),
};

export default servicemanApi;
