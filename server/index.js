const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Base Route
app.get("/", (req, res) => {
  res.send("🚀 API is working");
});

// Routes
const authRoutes = require("./routes/auth");
const studyPlanRoutes = require("./routes/studyPlans");
const profileRoutes = require("./routes/profile");      // ✅ Profile management
const goalRoutes = require("./routes/goals");           // ✅ NEW: Goals & reminders

app.use("/api/auth", authRoutes);
app.use("/api/studyplans", studyPlanRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/goals", goalRoutes);                      // ✅ Register new goals route

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
