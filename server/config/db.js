const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURL =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URI
        : process.env.MONGODB_URI;

    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

module.exports = { connectDB };
