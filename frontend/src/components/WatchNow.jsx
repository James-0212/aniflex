import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


function WatchNow() {
  // State for tracking the selected anime and episode
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/anime") // Fetch anime data from backend
      .then((res) => res.json())
      .then((data) => setAnimeList(data))
      .catch((err) => console.error("Error fetching anime:", err));
  }, []);

  const closeModal = () => {
    setSelectedAnime(null);
    setSelectedEpisode(null);
  };

  return (
    <motion.div 
      className="text-center p-16 bg-gray-900 mx-auto w-full shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-white">Watch Now</h2>
      <p className="mt-2 text-lg text-gray-300 font-bold">
        Stream the best anime episodes instantly.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {animeList.map((anime, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedAnime(anime)}
            className="bg-gray-700 p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-transform duration-300 cursor-pointer"
          >
            {/* Display Anime Image */}
            <img src={anime.image} alt={anime.title} className="w-full h-auto object-cover rounded-md mb-2" />
            <h3 className="text-lg font-bold text-white">{anime.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup for Selected Anime */}
      {selectedAnime && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full relative max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={closeModal} className="absolute top-2 right-4 text-black bg-pink-600 p-3 rounded-full text-xl">&times;</button>
            
            {/* Display Anime Image & Details */}
            <img 
              src={selectedAnime.image} 
              alt={selectedAnime.title} 
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            
            <h3 className="text-2xl font-bold text-white mb-2">{selectedAnime.title}</h3>
            <p className="text-gray-300 mb-4">{selectedAnime.description}</p>
            
            {/* Episodes Section */}
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-white mb-2">Episodes</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAnime.episodes.map((episode, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedEpisode(episode)}
                    className={`px-4 py-2 rounded-md ${
                      selectedEpisode === episode ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                  >
                    {episode.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Player */}
            {selectedEpisode ? (
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={selectedEpisode.link} // Fetch the correct video link
                  title={selectedEpisode.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            ) : (
              <p className="text-gray-400">Select an episode to play.</p>
            )}
            
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default WatchNow;
