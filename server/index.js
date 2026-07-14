const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth.route");
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

app.use("/api/auth", authRoutes);

/* -------------------- ERROR HANDLING -------------------- */

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
