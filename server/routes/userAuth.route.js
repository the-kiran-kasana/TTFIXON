const express = require("express");
const { requestOtp, verifyOtp, getMe, updateMe } = require("../controllers/userAuth.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Public
router.post("/request-otp", requestOtp);   // POST /api/user-auth/request-otp
router.post("/verify-otp",  verifyOtp);    // POST /api/user-auth/verify-otp

// Private (logged-in customer)
router.get ("/me", authMiddleware, authorizeRoles("customer"), getMe);     // GET  /api/user-auth/me
router.patch("/me", authMiddleware, authorizeRoles("customer"), updateMe); // PATCH /api/user-auth/me

module.exports = router;
