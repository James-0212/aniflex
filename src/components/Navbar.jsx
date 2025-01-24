import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchAnime } from '../api/anilist';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    // Fetch search results and navigate to a search results page
    try {
      const results = await searchAnime(searchQuery);
      navigate('/search', { state: { results, searchQuery } }); // Pass results via state
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-pink-600 hover:text-pink-500">
          Aniflex
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-pink-500 transition duration-300">
            Home
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-pink-500 transition duration-300">
            Categories
          </Link>
          <Link to="/trending" className="text-sm font-medium hover:text-pink-500 transition duration-300">
            Trending
          </Link>
          <Link to="/featured" className="text-sm font-medium hover:text-pink-500 transition duration-300">
            Featured
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-pink-600 px-4 py-2 text-sm rounded-lg hover:bg-pink-500 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
