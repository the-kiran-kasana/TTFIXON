/**
 * Seeds a default admin account.
 * Run with: node seed/admin.seed.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const { Admin } = require("../models/admin.model");

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.SEED_ADMIN_EMAIL || "admin@ondemand.com";
    const password = process.env.SEED_ADMIN_PASSWORD || "admin123";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`ℹ️  Admin already exists: ${email}`);
    } else {
      await Admin.create({
        name: "Super Admin",
        email,
        password,
        role: "admin",
      });
      console.log(`✅ Admin created: ${email} / ${password}`);
    }
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedAdmin();
