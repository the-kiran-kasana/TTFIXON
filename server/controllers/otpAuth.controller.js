const { User } = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const { generateOtp, sendOtp } = require("../utils/otp");

const OTP_TTL_MS = 5 * 60 * 1000; // OTP valid for 5 minutes

/**
 * @desc    Request an OTP for a phone number.
 *          Auto-creates a customer record on first request so the login
 *          shows up in the admin panel.
 * @route   POST /api/user-auth/request-otp
 * @access  Public
 */
const requestOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "A valid 10-digit phone number is required",
      });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      // Self sign-up: create a minimal customer so it appears in the panel.
      user = await User.create({ phone, source: "self" });
    }

    if (user.status === "blocked") {
      return res
        .status(403)
        .json({ success: false, message: "This account is blocked" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_TTL_MS);
    await user.save();

    await sendOtp(phone, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      // Only expose the OTP outside production for easy testing.
      ...(process.env.NODE_ENV !== "production" ? { otp } : {}),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Verify OTP and log the customer in.
 *          Records lastLoginAt / loginCount so admins can see logins.
 * @route   POST /api/user-auth/verify-otp
 * @access  Public
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Phone and OTP are required" });
    }

    const user = await User.findOne({ phone }).select("+otp +otpExpiry");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired, please request a new one" });
    }

    if (user.otp !== String(otp)) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // Consume the OTP and record the login.
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.lastLoginAt = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id:        user._id,
        name:       user.name,
        phone:      user.phone,
        email:      user.email,
        role:       user.role,
        location:   user.location,
        categories: user.categories,
        lastLoginAt: user.lastLoginAt,
        loginCount:  user.loginCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get the logged-in customer's own profile.
 * @route   GET /api/user-auth/me
 * @access  Private (customer JWT)
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
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
 * @desc    Update the logged-in customer's own profile.
 *          Writes to the same record the admin panel reads.
 * @route   PATCH /api/user-auth/me
 * @access  Private (customer JWT)
 */
const updateMe = async (req, res, next) => {
  try {
    const { name, email, location, categories } = req.body;

    // Customers may only edit these fields on themselves — never role/status.
    const update = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (location !== undefined) update.location = location;
    if (categories !== undefined) {
      update.categories = Array.isArray(categories) ? categories : [categories];
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, {
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
      .json({ success: true, message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { requestOtp, verifyOtp, getMe, updateMe };
