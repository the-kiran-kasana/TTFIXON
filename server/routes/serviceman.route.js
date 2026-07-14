const express = require("express");
const {
  getAllServicemen,
  getServicemanById,
  createServiceman,
  updateServiceman,
  deleteServiceman,
  getServicemanStats,
} = require("../controllers/serviceman.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware, authorizeRoles("admin", "superadmin"));

router.get("/stats", getServicemanStats);     // GET    /api/servicemen/stats
router.get("/",      getAllServicemen);        // GET    /api/servicemen
router.get("/:id",   getServicemanById);      // GET    /api/servicemen/:id
router.post("/",     createServiceman);       // POST   /api/servicemen
router.put("/:id",   updateServiceman);       // PUT    /api/servicemen/:id
router.delete("/:id", deleteServiceman);      // DELETE /api/servicemen/:id

module.exports = router;
