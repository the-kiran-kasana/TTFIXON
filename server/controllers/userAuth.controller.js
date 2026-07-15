const { User } = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");

/** Generate a cryptographically random 6-digit OTP */
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * @desc   Request OTP — creates user if first time, generates & stores OTP
 * @route  POST /api/user-auth/request-otp
 * @access Public
 */
const requestOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Valid 10-digit phone number is required" });
    }

    // Upsert user — create if not exists, update OTP fields if exists
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, otp, otpExpiresAt });
    } else {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();
    }

    // In development: log OTP to console so devs can use it
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n📱 OTP for +91 ${phone}: \x1b[33m${otp}\x1b[0m  (expires in 10 min)\n`);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      // Send otp back ONLY in dev so the frontend can display it
      ...(process.env.NODE_ENV !== "production" && { otp }),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Verify OTP — validates OTP, issues JWT
 * @route  POST /api/user-auth/verify-otp
 * @access Public
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: "phone and otp are required" });
    }

    // Explicitly select otp + otpExpiresAt (select:false by default)
    const user = await User.findOne({ phone }).select("+otp +otpExpiresAt");

    if (!user) {
      return res.status(404).json({ success: false, message: "No OTP request found for this number" });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ success: false, message: "Your account has been blocked" });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ success: false, message: "No OTP requested. Please request a new OTP" });
    }

    if (new Date() > user.otpExpiresAt) {
      // Clear expired OTP
      user.otp = undefined;
      user.otpExpiresAt = undefined;
      await user.save();
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    if (user.otp !== String(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid — clear it and update login stats
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    user.loginCount  = (user.loginCount || 0) + 1;
    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken({ id: user._id, role: user.role });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id:        user._id,
        phone:      user.phone,
        name:       user.name,
        email:      user.email,
        location:   user.location,
        categories: user.categories,
        role:       user.role,
        status:     user.status,
        loginCount: user.loginCount,
        lastLoginAt:user.lastLoginAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get logged-in user profile
 * @route  GET /api/user-auth/me
 * @access Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Update logged-in user profile
 * @route  PATCH /api/user-auth/me
 * @access Private
 */
const updateMe = async (req, res, next) => {
  try {
    const { name, email, location, categories } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, location, categories },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { requestOtp, verifyOtp, getMe, updateMe };
