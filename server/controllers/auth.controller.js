const { Admin } = require("../models/admin.model");
const { generateToken } = require("../utils/generateToken");

/**
 * @desc    Register a new admin
 * @route   POST /api/auth/register
 * @access  Public (typically restricted / used for seeding)
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Admin with this email already exists" });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || "admin", // defaults to "admin"
    });

    const token = generateToken({ id: admin._id, role: admin.role });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // password has select:false, so explicitly select it
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ id: admin._id, role: admin.role });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get logged-in admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getProfile };
