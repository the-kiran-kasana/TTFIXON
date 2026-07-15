const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const authRoutes     = require("./routes/auth.route");
const userAuthRoutes = require("./routes/otpAuth.route");   // customer OTP login
const usersRoutes    = require("./routes/user.route");       // admin: manage customers
const vendorRoutes   = require("./routes/vendor.route");
const servicemanRoutes = require("./routes/serviceman.route");
const zoneRoutes = require("./routes/zone.route");
const categoryRoutes = require("./routes/category.route");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3026;

/* -------------------- MIDDLEWARE -------------------- */

app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "*" // allow frontend domain later
        : "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to on demand" });
});

app.use("/api/auth",       authRoutes);
app.use("/api/user-auth",  userAuthRoutes);   // customer OTP login
app.use("/api/users",      usersRoutes);       // admin: list/manage customers
app.use("/api/vendors",    vendorRoutes);
app.use("/api/servicemen", servicemanRoutes);
app.use("/api/zones",      zoneRoutes);
app.use("/api/categories", categoryRoutes);

/* -------------------- ERROR HANDLING -------------------- */

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
