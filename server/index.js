const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const otpAuthRoutes = require("./routes/otpAuth.route");
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

app.use("/api/auth", authRoutes); // admin auth (email + password)
app.use("/api/user-auth", otpAuthRoutes); // customer auth (phone + OTP)
app.use("/api/users", userRoutes); // admin-managed customers

/* -------------------- ERROR HANDLING -------------------- */

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
