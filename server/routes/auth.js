const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Welcome! You accessed a protected route.", user: req.user });
});


// Environment secret key
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});
// PUT /api/auth/profile/:id
router.put("/profile/:id", async (req, res) => {
  try {
    const { name, password } = req.body;
    const updatedFields = { name };
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updatedFields.password = hashed;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.status(200).json({ message: "Profile updated", updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
});


module.exports = router;
