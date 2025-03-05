import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState({ title: "", image: null, description: "" });
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [newEpisode, setNewEpisode] = useState({ title: "", link: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/anime")
      .then((res) => res.json())
      .then((data) => {
        // Ensure animeList has full image URLs
        const updatedAnimeList = data.map((anime) => ({
          ...anime,
          image: anime.image ? `http://localhost:5000${anime.image}` : null, // Use backend image path
        }));
        setAnimeList(updatedAnimeList);
      })
      .catch((err) => console.error("Error fetching anime:", err));
  }, []);

  const handleAddAnime = async () => {
    if (!newAnime.title.trim() || !newAnime.image || !newAnime.description.trim()) return;

    const formData = new FormData();
    formData.append("title", newAnime.title);
    formData.append("description", newAnime.description);
    formData.append("image", newAnime.image); // Upload file

    try {
      const response = await fetch("http://localhost:5000/api/anime", {
        method: "POST",
        body: formData, // Send as FormData
      });

      const addedAnime = await response.json();
      setAnimeList([...animeList, { ...addedAnime, image: `http://localhost:5000${addedAnime.image}` }]);
      setNewAnime({ title: "", image: null, description: "" });
    } catch (error) {
      console.error("Error adding anime:", error);
    }
  };

  const handleDeleteAnime = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/anime/${id}`, { method: "DELETE" });
      setAnimeList(animeList.filter((anime) => anime._id !== id));
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  const handleAddEpisode = async () => {
    if (!selectedAnime || !newEpisode.title.trim() || !newEpisode.link.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/api/anime/${selectedAnime._id}/episodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEpisode),
      });
      const updatedAnime = await response.json();
      setAnimeList(animeList.map((anime) => (anime._id === updatedAnime._id ? updatedAnime : anime)));
      setNewEpisode({ title: "", link: "" });
    } catch (error) {
      console.error("Error adding episode:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {/* Add New Anime */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Anime Title"
          value={newAnime.title}
          onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
          className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"
        />
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setNewAnime((prev) => ({ ...prev, image: file })); // Set file object
            }
          }}
          className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"
        />

        <textarea
          placeholder="Enter Anime Description"
          value={newAnime.description}
          onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}
          className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"
        ></textarea>

        <button
          onClick={handleAddAnime}
          className="bg-blue-500 px-4 py-2 mt-2 rounded-md hover:bg-blue-600 w-full"
        >
          Add Anime
        </button>
      </div>

      {/* Anime List */}
      <div>
        {animeList.map((anime) => (
          <div key={anime._id} className="p-4 border mb-2 flex justify-between">
            <div>
              <p className="font-bold">{anime.title}</p>
              {/* Display Image Only If It Exists */}
              {anime.image ? (
                <img 
                  src={anime.image} 
                  alt={anime.title} 
                  className="w-24 h-24 object-cover rounded-md mt-2" 
                />
              ) : (
                <p className="text-gray-400">No image available</p>
              )}

              <p className="text-sm text-gray-300">{anime.description}</p>
              <ul className="text-sm text-gray-300">
                {anime.episodes.map((episode, index) => (
                  <li key={index}>
                    Episode {index + 1}: {episode.title} -
                    <a href={episode.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 ml-2">
                      Watch
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedAnime(anime)}
                className="bg-green-500 px-3 py-1 rounded-md hover:bg-green-600"
              >
                Add Episode
              </button>
              <button
                onClick={() => handleDeleteAnime(anime._id)}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Episode Section */}
      {selectedAnime && (
        <div className="mt-6 p-4 border rounded-md bg-gray-800">
          <h3 className="text-xl font-bold mb-2">Add Episode to {selectedAnime.title}</h3>
          <input
            type="text"
            placeholder="Enter Episode Title"
            value={newEpisode.title}
            onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
            className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"
          />
          <input
            type="text"
            placeholder="Enter Episode Link"
            value={newEpisode.link}
            onChange={(e) => setNewEpisode({ ...newEpisode, link: e.target.value })}
            className="bg-gray-700 text-white px-3 py-2 rounded-md w-full"
          />
          <button
            onClick={handleAddEpisode}
            className="bg-green-500 px-4 py-2 mt-2 rounded-md hover:bg-green-600 w-full"
          >
            Add Episode
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
