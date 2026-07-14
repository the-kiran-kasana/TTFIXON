import { apiRequest } from "@/lib/adminApi";

/**
 * All category-related API calls.
 */
const categoryApi = {
  /** GET /api/categories?search= */
  getAll: (token, { search = "" } = {}) =>
    apiRequest(`/categories?${new URLSearchParams({ search })}`, { token }),

  /** GET /api/categories/stats */
  getStats: (token) => apiRequest("/categories/stats", { token }),

  /** GET /api/categories/:id */
  getById: (token, id) => apiRequest(`/categories/${id}`, { token }),

  /** POST /api/categories */
  create: (token, categoryData) =>
    apiRequest("/categories", { method: "POST", body: categoryData, token }),

  /** PUT /api/categories/:id */
  update: (token, id, categoryData) =>
    apiRequest(`/categories/${id}`, { method: "PUT", body: categoryData, token }),

  /** DELETE /api/categories/:id */
  remove: (token, id) =>
    apiRequest(`/categories/${id}`, { method: "DELETE", token }),

  /** PATCH /api/categories/:id/toggle */
  toggle: (token, id) =>
    apiRequest(`/categories/${id}/toggle`, { method: "PATCH", token }),
};

export default categoryApi;
