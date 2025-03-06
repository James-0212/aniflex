import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchAnime } from '../api/anilist';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const results = await searchAnime(searchQuery);
      navigate('/search', { state: { results, searchQuery } });
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Remove token on logout
    setIsLoggedIn(false);
    navigate('/signup');   };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide text-pink-600 hover:text-pink-500">
          Aniflex
        </Link>

        <button
          className="md:hidden text-pink-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-pink-500 transition duration-300">Home</Link>
          <Link to="/categories" className="text-sm font-medium hover:text-pink-500 transition duration-300">Categories</Link>
          <Link to="/trending" className="text-sm font-medium hover:text-pink-500 transition duration-300">Trending</Link>
          <Link to="/featured" className="text-sm font-medium hover:text-pink-500 transition duration-300">Featured</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 text-sm rounded-lg hover:bg-red-500 transition duration-300">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="bg-pink-600 px-4 py-2 text-sm rounded-lg hover:bg-pink-500 transition duration-300">
              Login / Sign Up
            </Link>
          )}
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button type="submit" className="bg-pink-600 px-4 py-2 text-sm rounded-lg hover:bg-pink-500 transition duration-300">
            Search
          </button>
        </form>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" className="text-sm font-medium hover:text-pink-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-pink-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link to="/trending" className="text-sm font-medium hover:text-pink-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Trending</Link>
            <Link to="/featured" className="text-sm font-medium hover:text-pink-500 transition duration-300" onClick={() => setIsMenuOpen(false)}>Featured</Link>

            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-600 px-4 py-2 text-sm rounded-lg hover:bg-red-500 transition duration-300 w-full">
                Logout
              </button>
            ) : (
              <Link to="/auth" className="bg-pink-600 px-4 py-2 text-sm rounded-lg hover:bg-pink-500 transition duration-300 w-full" onClick={() => setIsMenuOpen(false)}>
                Login / Sign Up
              </Link>
            )}

            <form onSubmit={handleSearch} className="w-full px-4">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button type="submit" className="mt-2 w-full bg-pink-600 px-4 py-2 text-sm rounded-lg hover:bg-pink-500 transition duration-300">
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;