const express = require("express");
const { register, login, getProfile } = require("../controllers/auth.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Private (admin only)
router.get("/me", authMiddleware, authorizeRoles("admin", "superadmin"), getProfile);

module.exports = router;
