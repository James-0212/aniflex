import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Aot from '../assets/aot.jpg';
import Cg from '../assets/cg.jpg';
import OP from '../assets/op.jpg';
import Bleach from '../assets/bleach.jpg';

// Updated anime list including description and episodes
const animeList = [
  {
    title: "Attack on Titan",
    image: Aot,
    description: "A group of humans fights against giant humanoid creatures known as Titans in a post-apocalyptic world.",
    episodes: [
      { title: "Episode 1", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdA1/preview" },
      { title: "Episode 2", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdA2/preview" },
    ],
  },
  {
    title: "Bleach",
    image: Bleach,
    description: "A teenager gains the powers of a Soul Reaper and defends the living world from evil spirits.",
    episodes: [
      { title: "Episode 1", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdB1/preview" },
      { title: "Episode 2", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdB2/preview" },
    ],
  },
  {
    title: "Code Geass",
    image: Cg,
    description: "Lelouch Lamprerough a young boy, gains a mysterious power to control people and goes on to challenge an oppressive empire.",
    episodes: [
      { title: "Episode 1", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdC1/preview" },
      { title: "Episode 2", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdC2/preview" },
    ],
  },
  {
    title: "One Piece",
    image: OP,
    description: "A pirate by the name of Monkey D Luffy embarks on a journey to become the Pirate King in a world of Pirates during the era known as The Great Pirate Era.",
    episodes: [
      { title: "Episode 1", videoUrl: "https://drive.google.com/file/d/1m0wMCypKy7NFxtSGbMFQbNEPsyy-mUvR/preview" },
      { title: "Episode 2", videoUrl: "https://drive.google.com/file/d/yourDriveVideoIdO2/preview" },
    ],
  },
];

function WatchNow() {
  // State for tracking the selected anime and episode
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

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
            <img src={anime.image} alt={anime.title} className="w-full h-154 object-cover rounded-md" />
            <h3 className="text-lg font-bold text-white mt-2">{anime.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup */}
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
            <button onClick={closeModal} className="absolute top-4 right-4 text-white text-xl">&times;</button>
            
            {/* Anime Image */}
            <img 
              src={selectedAnime.image} 
              alt={selectedAnime.title} 
              className="w-full h-auto object-cover rounded-md mb-4"
            />
            
            <h3 className="text-2xl font-bold text-white mb-2">{selectedAnime.title}</h3>
            <p className="text-gray-300 mb-4">{selectedAnime.description}</p>
            
           
            <div className="mb-4">
              <h4 className="text-xl font-semibold text-white mb-2">Episodes</h4>
              <div className="flex space-x-4">
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

            {selectedEpisode ? (
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={selectedEpisode.videoUrl}
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
