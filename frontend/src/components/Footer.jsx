import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">About Aniflex</h3>
          <p className="text-sm">
            Aniflex is your ultimate destination for anime streaming. Discover, explore, and enjoy the best anime from all genres.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-pink-500 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-pink-500 transition duration-300">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/trending" className="hover:text-pink-500 transition duration-300">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/featured" className="hover:text-pink-500 transition duration-300">
                Featured
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500">
        &copy; {new Date().getFullYear()} Aniflex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
