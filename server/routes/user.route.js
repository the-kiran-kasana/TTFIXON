const express = require("express");
const {
  createUser,
  listUsers,
  getUser,
  updateUser,
} = require("../controllers/user.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// All customer-management routes are admin-only.
router.use(authMiddleware, authorizeRoles("admin", "superadmin"));

router.post("/", createUser);
router.get("/", listUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);

module.exports = router;
