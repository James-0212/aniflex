import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeByGenre, fetchAnimeDetails } from '../api/anilist';

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from URL params
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null); // Store selected anime details
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAnimeByGenre(category); // Fetch anime by category
        setAnimeList(data);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  // Handle card click to view details
  const handleViewDetails = async (id) => {
    try {
      const animeDetails = await fetchAnimeDetails(id);
      setSelectedAnime(animeDetails);
      setShowModal(true); // Show modal with details
    } catch (error) {
      console.error('Error fetching anime details:', error);
    }
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedAnime(null);
  };

  if (loading) {
    return <p className="text-center text-gray-700 text-xl">Loading anime...</p>;
  }

  if (animeList.length === 0) {
    return (
      <p className="text-center text-gray-700 text-xl">
        No anime found for this category.
      </p>
    );
  }

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 capitalize">
          {category} Anime
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animeList.map((anime) => (
            <div
              key={anime.id}
              onClick={() => handleViewDetails(anime.id)} // Trigger modal on card click
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src={anime.coverImage.extraLarge}
                alt={anime.title.romaji}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-pink-500 truncate">
                  {anime.title.romaji || anime.title.english}
                </h3>
                <p className="text-sm text-gray-400 mt-2 truncate">
                  Episodes: {anime.episodes || 'N/A'}
                </p>
                <p className="text-sm text-white truncate">
                  Format: {anime.format || 'Unknown'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Component */}
        {showModal && selectedAnime && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div
  className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative max-h-[90vh] overflow-y-auto"
>
  {/* Close Button */}
  <button
    onClick={closeModal}
    className="absolute top-4 right-4 text-white text-xl"
  >
    &times;
  </button>

  <div className="flex flex-col md:flex-row items-center">
    {/* Anime Cover Image */}
    <img
      src={selectedAnime.coverImage.extraLarge}
      alt={selectedAnime.title.romaji}
      className="w-full md:w-1/3 rounded-lg"
    />
    <div className="md:ml-6 text-white mt-4 md:mt-0">
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
        Genres: {selectedAnime.genres.join(', ')}
      </p>
    </div>
  </div>

  {/* Streaming Episodes Section */}
  {selectedAnime.streamingEpisodes && selectedAnime.streamingEpisodes.length > 0 && (
    <div className="mt-6">
      <h4 className="text-lg font-bold text-pink-500">Watch Online:</h4>
      <ul className="list-disc pl-6">
        {selectedAnime.streamingEpisodes.map((episode, index) => (
          <li key={index}>
            <a
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {episode.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
