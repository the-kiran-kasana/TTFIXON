/**
 * User (customer) auth API calls — OTP-based phone login.
 * Uses the shared apiRequest from lib/userApi.
 */
import { apiRequest } from "@/lib/userApi";

const userAuthApi = {
  /** POST /api/user-auth/request-otp */
  requestOtp: (phone) =>
    apiRequest("/user-auth/request-otp", { method: "POST", body: { phone } }),

  /** POST /api/user-auth/verify-otp */
  verifyOtp: (phone, otp) =>
    apiRequest("/user-auth/verify-otp", { method: "POST", body: { phone, otp } }),

  /** GET /api/user-auth/me */
  me: (token) => apiRequest("/user-auth/me", { token }),

  /** PATCH /api/user-auth/me */
  updateMe: (token, body) =>
    apiRequest("/user-auth/me", { method: "PATCH", body, token }),
};

export default userAuthApi;
