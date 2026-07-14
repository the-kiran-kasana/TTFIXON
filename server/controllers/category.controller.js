const { Category } = require("../models/category.model");

/**
 * @route  GET /api/categories/stats
 */
const getCategoryStats = async (req, res, next) => {
  try {
    const [total, active, inactive] = await Promise.all([
      Category.countDocuments(),
      Category.countDocuments({ active: true }),
      Category.countDocuments({ active: false }),
    ]);
    return res.status(200).json({ success: true, stats: { total, active, inactive } });
  } catch (err) { next(err); }
};

/**
 * @route  GET /api/categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    const { search = "" } = req.query;
    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const categories = await Category.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, total: categories.length, categories });
  } catch (err) { next(err); }
};

/**
 * @route  GET /api/categories/:id
 */
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    return res.status(200).json({ success: true, category });
  } catch (err) { next(err); }
};

/**
 * @route  POST /api/categories
 */
const createCategory = async (req, res, next) => {
  try {
    const { name, emoji, color, description, subcategories, services, active } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Category name is required" });

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) return res.status(409).json({ success: false, message: "Category with this name already exists" });

    const category = await Category.create({ name, emoji, color, description, subcategories, services, active });
    return res.status(201).json({ success: true, message: "Category created successfully", category });
  } catch (err) { next(err); }
};

/**
 * @route  PUT /api/categories/:id
 */
const updateCategory = async (req, res, next) => {
  try {
    const { name, emoji, color, description, subcategories, services, active } = req.body;

    // Check name uniqueness against other docs
    if (name) {
      const conflict = await Category.findOne({ name: name.trim(), _id: { $ne: req.params.id } });
      if (conflict) return res.status(409).json({ success: false, message: "Another category with this name already exists" });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, emoji, color, description, subcategories, services, active },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    return res.status(200).json({ success: true, message: "Category updated successfully", category });
  } catch (err) { next(err); }
};

/**
 * @route  DELETE /api/categories/:id
 */
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) { next(err); }
};

/**
 * @route  PATCH /api/categories/:id/toggle
 */
const toggleCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    category.active = !category.active;
    await category.save();
    return res.status(200).json({ success: true, message: `Category ${category.active ? "activated" : "deactivated"}`, category });
  } catch (err) { next(err); }
};

module.exports = { getCategoryStats, getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, toggleCategory };
