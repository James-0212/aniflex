import React from 'react';

import heroimg from '../assets/hero.png';

import { useNavigate } from 'react-router-dom';



const HeroSection = () => {

  const navigate = useNavigate();



  return (

    <div

      className="relative h-screen flex items-center bg-no-repeat bg-cover text-white"

      style={{ backgroundImage: `url(${heroimg})`, backgroundPosition: 'center' }}

    >

      <div className="absolute inset-0 bg-black opacity-50" /> {/* Adds a semi-transparent overlay */}

      <div className="relative z-10 text-left max-w-lg ml-12 p-4">

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wider">

          Welcome to <span className="text-pink-500">Aniflex</span>

        </h1>

        <p className="text-lg md:text-xl mb-8">

          Your ultimate anime streaming platform

        </p>

        <div className="flex gap-4">

          <button onClick={() => navigate('/watchnow')} className="bg-pink-500 hover:bg-pink-600 w-90 text-white font-bold py-3 px-6 rounded-full text-lg">

            Start Watching

          </button>

        </div>

      </div>

    </div>

  );

};



export default HeroSection;