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
import WatchNow from './components/WatchNow';
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import AdminPanel from "./components/AdminPanel"; 
import AdminLogin from './components/AdminLogin';
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
                <WatchNow />
                <FeaturedAnime />
                <Footer />
              </>
            }
          />
          
          {/* Dynamic Category Page Route */}
          <Route path="/categories" element={<CategoriesSection />} />
          <Route path="/featured" element={<FeaturedAnime />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/watchnow" element={<WatchNow />} />
          <Route path="/trending" element={<TrendingAnime />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
