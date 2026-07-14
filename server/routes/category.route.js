const express = require("express");
const { getCategoryStats, getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, toggleCategory } = require("../controllers/category.controller");
const { authMiddleware, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.use(authMiddleware, authorizeRoles("admin", "superadmin"));

router.get("/stats",        getCategoryStats);   // GET    /api/categories/stats
router.get("/",             getAllCategories);   // GET    /api/categories
router.get("/:id",          getCategoryById);    // GET    /api/categories/:id
router.post("/",            createCategory);     // POST   /api/categories
router.put("/:id",          updateCategory);     // PUT    /api/categories/:id
router.delete("/:id",       deleteCategory);    // DELETE /api/categories/:id
router.patch("/:id/toggle", toggleCategory);    // PATCH  /api/categories/:id/toggle

module.exports = router;
