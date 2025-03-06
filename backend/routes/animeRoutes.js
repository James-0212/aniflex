const express = require("express");
const Anime = require("../models/Anime");
const multer = require("multer"); 
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Save images inside 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Serve images statically
router.use("/uploads", express.static(uploadsDir));

// ✅ Get all anime
router.get("/", async (req, res) => {
  try {
    const anime = await Anime.find();
    
    // Ensure all anime images have full URLs
    const updatedAnime = anime.map((a) => ({
      ...a._doc,
      image: a.image ? `http://localhost:5000${a.image}` : null, // Ensure full path
    }));

    res.json(updatedAnime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new anime with image upload
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  try {
    const newAnime = new Anime({
      title,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Store relative path
      episodes: [],
    });

    await newAnime.save();
    
    // Ensure frontend gets the full image URL
    res.status(201).json({
      ...newAnime._doc,
      image: newAnime.image ? `http://localhost:5000${newAnime.image}` : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete an anime
router.delete("/:id", async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: "Anime deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add an episode to an anime
router.post("/:id/episodes", async (req, res) => {
  const { title, link } = req.body;
  
  if (!title || !link) {
    return res.status(400).json({ error: "Episode title and link are required" });
  }

  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).json({ error: "Anime not found" });

    anime.episodes.push({ title, link });
    await anime.save();

    res.json(anime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;