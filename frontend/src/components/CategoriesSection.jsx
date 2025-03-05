import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGenres } from '../api/anilist';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();

      // Filter out the "Hentai" category
      const filteredGenres = genres.filter((genre) => genre.toLowerCase() !== 'hentai');

      setCategories(filteredGenres);
      setLoading(false);
    };

    loadGenres();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading categories...</p>;
  }

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
          Browse by Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-gray-400 text-white rounded-lg shadow-lg text-center hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-xl font-bold text-gray-800">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
