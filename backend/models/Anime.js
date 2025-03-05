const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
  title: String,
  link: String,
});

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Store image path
  description: { type: String, required: true },
  episodes: [episodeSchema], // Stores episode details
});

module.exports = mongoose.model("Anime", animeSchema);
