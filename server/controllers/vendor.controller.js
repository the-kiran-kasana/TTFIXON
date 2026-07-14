const { Vendor } = require("../models/vendor.model");

/**
 * @desc    Get all vendors (with optional search + status filter)
 * @route   GET /api/vendors
 * @access  Private (admin / superadmin)
 */
const getAllVendors = async (req, res, next) => {
  try {
    const { search = "", status, page = 1, limit = 20 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { contactEmail: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [vendors, total] = await Promise.all([
      Vendor.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Vendor.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      vendors,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a single vendor by ID
 * @route   GET /api/vendors/:id
 * @access  Private
 */
const getVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    return res.status(200).json({ success: true, vendor });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new vendor
 * @route   POST /api/vendors
 * @access  Private
 */
const createVendor = async (req, res, next) => {
  try {
    const { name, category, contactEmail, phone, serviceMen, revenue, address, status } = req.body;

    if (!name || !category || !contactEmail || !phone) {
      return res.status(400).json({
        success: false,
        message: "name, category, contactEmail, and phone are required",
      });
    }

    const existing = await Vendor.findOne({ contactEmail: contactEmail.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A vendor with this contact email already exists",
      });
    }

    const vendor = await Vendor.create({
      name,
      category,
      contactEmail,
      phone,
      serviceMen: serviceMen || 0,
      revenue: revenue || 0,
      address: address || "",
      status: status || "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a vendor
 * @route   PUT /api/vendors/:id
 * @access  Private
 */
const updateVendor = async (req, res, next) => {
  try {
    const { name, category, contactEmail, phone, serviceMen, revenue, address, status } = req.body;

    // If changing email, check uniqueness against other vendors
    if (contactEmail) {
      const conflict = await Vendor.findOne({
        contactEmail: contactEmail.toLowerCase(),
        _id: { $ne: req.params.id },
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "Another vendor with this contact email already exists",
        });
      }
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, category, contactEmail, phone, serviceMen, revenue, address, status },
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      vendor,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a vendor
 * @route   DELETE /api/vendors/:id
 * @access  Private
 */
const deleteVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }
    return res.status(200).json({ success: true, message: "Vendor deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get vendor stats (counts by status)
 * @route   GET /api/vendors/stats
 * @access  Private
 */
const getVendorStats = async (req, res, next) => {
  try {
    const [total, active, pending, suspended] = await Promise.all([
      Vendor.countDocuments(),
      Vendor.countDocuments({ status: "Active" }),
      Vendor.countDocuments({ status: "Pending" }),
      Vendor.countDocuments({ status: "Suspended" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: { total, active, pending, suspended },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorStats,
};
