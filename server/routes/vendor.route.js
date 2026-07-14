const express = require("express");
const {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorStats,
} = require("../controllers/vendor.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// All vendor routes require authentication
router.use(authMiddleware, authorizeRoles("admin", "superadmin"));

router.get("/stats", getVendorStats);        // GET  /api/vendors/stats
router.get("/", getAllVendors);              // GET  /api/vendors
router.get("/:id", getVendorById);           // GET  /api/vendors/:id
router.post("/", createVendor);              // POST /api/vendors
router.put("/:id", updateVendor);            // PUT  /api/vendors/:id
router.delete("/:id", deleteVendor);         // DELETE /api/vendors/:id

module.exports = router;
