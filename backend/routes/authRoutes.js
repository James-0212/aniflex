const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ User Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // 🔴 Check if the user already exists (case-insensitive)
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // 🔐 Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email: email.toLowerCase(), password: hashedPassword });

    await newUser.save();

    // 🔑 Generate JWT Token upon signup
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 🔴 Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // 🔑 Generate JWT Token on successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
