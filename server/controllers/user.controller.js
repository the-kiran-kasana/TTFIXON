const { User } = require("../models/user.model");

/**
 * @desc    Create a customer (user)
 * @route   POST /api/users
 * @access  Private (admin / superadmin)
 */
const createUser = async (req, res, next) => {
  try {
    const { name, phone, email, role, categories, location, status } = req.body;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "A customer with this phone number already exists",
      });
    }

    const user = await User.create({
      name,
      phone,
      email,
      role: role || "customer",
      categories: Array.isArray(categories)
        ? categories
        : categories
        ? [categories]
        : [],
      location,
      status: status || "active",
      source: "admin",
      createdBy: req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    List customers (with optional search & role filter)
 * @route   GET /api/users
 * @access  Private (admin / superadmin)
 */
const listUsers = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;

    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a single customer
 * @route   GET /api/users/:id
 * @access  Private (admin / superadmin)
 */
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a customer
 * @route   PATCH /api/users/:id
 * @access  Private (admin / superadmin)
 */
const updateUser = async (req, res, next) => {
  try {
    const { name, email, role, categories, location, status } = req.body;

    const update = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (role !== undefined) update.role = role;
    if (location !== undefined) update.location = location;
    if (status !== undefined) update.status = status;
    if (categories !== undefined) {
      update.categories = Array.isArray(categories) ? categories : [categories];
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Customer updated", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, listUsers, getUser, updateUser };
