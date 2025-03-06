const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const animeRoutes = require("./routes/animeRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes =require("./routes/adminRoutes")



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serve static images from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer configuration for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));


  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


app.use("/api/anime", animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = upload;