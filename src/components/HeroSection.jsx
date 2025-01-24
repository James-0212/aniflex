import React from 'react';
import heroimg from '../assets/hero.jpg';

const HeroSection = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-no-repeat bg-cover text-white"
      style={{ backgroundImage: `url(${heroimg})` }}
    >
      <div className="absolute inset-0 bg-cover bg-center" />
      <div className="absolute inset-0 " /> {/* Adds a semi-transparent overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider">
          Welcome to <span className="text-pink-500">Aniflex</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your ultimate anime streaming platform
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg">
            Start Watching
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-full text-lg">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
