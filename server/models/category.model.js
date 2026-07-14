const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    emoji: {
      type: String,
      default: "🔧",
      trim: true,
    },
    color: {
      type: String,
      default: "#f1f5f9",
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    subcategories: {
      type: Number,
      default: 0,
      min: [0, "Subcategories count cannot be negative"],
    },
    services: {
      type: Number,
      default: 0,
      min: [0, "Services count cannot be negative"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
