import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { results, searchQuery } = location.state || { results: [], searchQuery: '' };

  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const openModal = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAnime(null);
    setShowModal(false);
  };

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-white mb-8">
          Search Results for "{searchQuery}"
        </h2>
        {results.length === 0 ? (
          <p className="text-gray-400 text-center">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((anime) => (
              <div
                key={anime.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.romaji}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-pink-500 truncate">
                    {anime.title.romaji}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Score: {anime.averageScore || 'N/A'}
                  </p>
                  <button
                    className="mt-4 w-full px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600"
                    onClick={() => openModal(anime)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Anime Details */}
      {showModal && selectedAnime && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row items-center max-h-[calc(100vh-2rem)] overflow-y-auto pr-4">
              {/* Anime Cover Image */}
              <img
                src={selectedAnime.coverImage.extraLarge}
                alt={selectedAnime.title.romaji}
                className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0"
              />
              <div className="md:ml-6 text-white">
                <h3 className="text-2xl font-bold">{selectedAnime.title.romaji}</h3>
                {selectedAnime.title.english && (
                  <h4 className="text-lg text-gray-400 italic">
                    {selectedAnime.title.english}
                  </h4>
                )}
                <p className="mt-2">{selectedAnime.description}</p>
                <p className="mt-2 font-semibold">
                  Average Score: {selectedAnime.averageScore}/100
                </p>
                <p className="mt-2 font-semibold">
                  Episodes: {selectedAnime.episodes || 'N/A'}
                </p>
                <p className="mt-2 font-semibold">
                  Genres: {selectedAnime.genres ? selectedAnime.genres.join(', ') : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
