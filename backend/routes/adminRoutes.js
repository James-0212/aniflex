const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Admin Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check credentials against .env values
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }
});

module.exports = router;
