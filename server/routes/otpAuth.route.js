const express = require("express");
const {
  requestOtp,
  verifyOtp,
  getMe,
  updateMe,
} = require("../controllers/otpAuth.controller");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// Public customer login via phone + OTP.
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);

// Logged-in customer manages their own profile.
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateMe);

module.exports = router;
