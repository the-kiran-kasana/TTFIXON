const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Zone name is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    areas: {
      type: [String],
      default: [],
    },
    providers: {
      type: Number,
      default: 0,
      min: [0, "Providers count cannot be negative"],
    },
    enabledServices: {
      type: [String],
      default: [],
    },
    pricingType: {
      type: String,
      enum: {
        values: ["Standard", "Surge +10%", "Surge +20%", "Discounted"],
        message: "Invalid pricing type",
      },
      default: "Standard",
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Status must be Active or Inactive",
      },
      default: "Active",
    },
  },
  { timestamps: true }
);

const Zone = mongoose.model("Zone", zoneSchema);

module.exports = { Zone };
