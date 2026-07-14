const express = require("express");
const { getZoneStats, getAllZones, getZoneById, createZone, updateZone, deleteZone } = require("../controllers/zone.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware, authorizeRoles("admin", "superadmin"));

router.get("/stats",  getZoneStats);   // GET    /api/zones/stats
router.get("/",       getAllZones);    // GET    /api/zones
router.get("/:id",    getZoneById);    // GET    /api/zones/:id
router.post("/",      createZone);     // POST   /api/zones
router.put("/:id",    updateZone);     // PUT    /api/zones/:id
router.delete("/:id", deleteZone);    // DELETE /api/zones/:id

module.exports = router;
