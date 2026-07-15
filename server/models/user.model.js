const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone must be a 10-digit number"],
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    categories: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      enum: ["customer"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    // OTP fields
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    // How the account was created
    source: {
      type: String,
      enum: ["self", "admin"],
      default: "self",
    },
    // Activity tracking
    loginCount: {
      type: Number,
      default: 0,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
