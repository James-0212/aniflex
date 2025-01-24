import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import TrendingAnime from './components/TrendingAnime';
import CategoriesSection from './components/CategoriesSection';
import FeaturedAnime from './components/FeaturedAnime';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <Router>
      <div>
      <Navbar />

        {/* Define Routes */}
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <TrendingAnime />
                <CategoriesSection />
                <FeaturedAnime />
                <Footer />
              </>
            }
          />
          
          {/* Dynamic Category Page Route */}
          <Route path="/categories" element={<CategoriesSection />} />
          <Route path="/featured" element={<FeaturedAnime />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/trending" element={<TrendingAnime />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
