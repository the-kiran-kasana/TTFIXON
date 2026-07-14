const { Serviceman } = require("../models/serviceman.model");

/**
 * @desc    Get all servicemen (search + status filter + pagination)
 * @route   GET /api/servicemen
 * @access  Private
 */
const getAllServicemen = async (req, res, next) => {
  try {
    const { search = "", status, page = 1, limit = 20 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name:     { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { email:    { $regex: search, $options: "i" } },
        { phone:    { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [servicemen, total] = await Promise.all([
      Serviceman.find(query)
        .populate("vendorId", "name category")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Serviceman.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      servicemen,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a single serviceman by ID
 * @route   GET /api/servicemen/:id
 * @access  Private
 */
const getServicemanById = async (req, res, next) => {
  try {
    const serviceman = await Serviceman.findById(req.params.id).populate("vendorId", "name category");
    if (!serviceman) {
      return res.status(404).json({ success: false, message: "Serviceman not found" });
    }
    return res.status(200).json({ success: true, serviceman });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a new serviceman
 * @route   POST /api/servicemen
 * @access  Private
 */
const createServiceman = async (req, res, next) => {
  try {
    const { name, email, phone, category, vendorId, rating, totalJobs, revenue, address, experience, status } = req.body;

    if (!name || !email || !phone || !category) {
      return res.status(400).json({
        success: false,
        message: "name, email, phone, and category are required",
      });
    }

    const existing = await Serviceman.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A serviceman with this email already exists",
      });
    }

    const serviceman = await Serviceman.create({
      name,
      email,
      phone,
      category,
      vendorId:   vendorId   || null,
      rating:     rating     || 0,
      totalJobs:  totalJobs  || 0,
      revenue:    revenue    || 0,
      address:    address    || "",
      experience: experience || 0,
      status:     status     || "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Serviceman created successfully",
      serviceman,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a serviceman
 * @route   PUT /api/servicemen/:id
 * @access  Private
 */
const updateServiceman = async (req, res, next) => {
  try {
    const { name, email, phone, category, vendorId, rating, totalJobs, revenue, address, experience, status } = req.body;

    // If email is being changed, check it isn't taken by another doc
    if (email) {
      const conflict = await Serviceman.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.params.id },
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "Another serviceman with this email already exists",
        });
      }
    }

    const serviceman = await Serviceman.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, category, vendorId, rating, totalJobs, revenue, address, experience, status },
      { new: true, runValidators: true }
    ).populate("vendorId", "name category");

    if (!serviceman) {
      return res.status(404).json({ success: false, message: "Serviceman not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Serviceman updated successfully",
      serviceman,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a serviceman
 * @route   DELETE /api/servicemen/:id
 * @access  Private
 */
const deleteServiceman = async (req, res, next) => {
  try {
    const serviceman = await Serviceman.findByIdAndDelete(req.params.id);
    if (!serviceman) {
      return res.status(404).json({ success: false, message: "Serviceman not found" });
    }
    return res.status(200).json({ success: true, message: "Serviceman deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get serviceman stats
 * @route   GET /api/servicemen/stats
 * @access  Private
 */
const getServicemanStats = async (req, res, next) => {
  try {
    const [total, verified, pending, suspended] = await Promise.all([
      Serviceman.countDocuments(),
      Serviceman.countDocuments({ status: "Verified" }),
      Serviceman.countDocuments({ status: "Pending" }),
      Serviceman.countDocuments({ status: "Suspended" }),
    ]);

    return res.status(200).json({
      success: true,
      stats: { total, verified, pending, suspended },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllServicemen,
  getServicemanById,
  createServiceman,
  updateServiceman,
  deleteServiceman,
  getServicemanStats,
};
