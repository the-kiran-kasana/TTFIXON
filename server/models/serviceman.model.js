const mongoose = require("mongoose");

const servicemanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    // Reference to the vendor company this serviceman belongs to (optional)
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
    },
    totalJobs: {
      type: Number,
      default: 0,
      min: [0, "Total jobs cannot be negative"],
    },
    revenue: {
      type: Number,
      default: 0,
      min: [0, "Revenue cannot be negative"],
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    experience: {
      type: Number,   // years of experience
      default: 0,
      min: [0, "Experience cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["Verified", "Pending", "Suspended"],
        message: "Status must be Verified, Pending, or Suspended",
      },
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Serviceman = mongoose.model("Serviceman", servicemanSchema);

module.exports = { Serviceman };
