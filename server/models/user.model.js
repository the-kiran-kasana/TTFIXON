const mongoose = require("mongoose");

/**
 * Customer (end-user) model.
 *
 * Two ways a customer record is created:
 *  1. An admin creates it from the admin panel (source: "admin").
 *  2. A customer requests an OTP for the first time (source: "self").
 *
 * Login happens via phone number + OTP. Every successful login updates
 * `lastLoginAt` / `loginCount` so admins can see login activity.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["customer", "serviceman", "vendor"],
      default: "customer",
    },
    // Service categories the customer is interested in / assigned to.
    categories: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    // How the record was created.
    source: {
      type: String,
      enum: ["admin", "self"],
      default: "self",
    },
    // Admin who created this customer (only for source: "admin").
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    // -------- OTP / login tracking --------
    otp: {
      type: String,
      select: false, // never returned by default
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    lastLoginAt: {
      type: Date,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
