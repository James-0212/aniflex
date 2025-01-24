import React from "react";
import { motion } from "framer-motion";

const bestAnime = [
  {
    title: "Attack on Titan",
    image: "https://m.media-amazon.com/images/I/41-Z03WtLxL._SX300_SY300_QL70_FMwebp_.jpg",
    description: "A gripping tale of humanity's fight against monstrous Titans.",
  },
  {
    title: "Naruto",
    image: "https://m.media-amazon.com/images/I/41-Z03WtLxL._SX300_SY300_QL70_FMwebp_.jpg",
    description: "The journey of a young ninja chasing his dream of becoming Hokage.",
  },
  {
    title: "Demon Slayer",
    image: "https://m.media-amazon.com/images/I/41-Z03WtLxL._SX300_SY300_QL70_FMwebp_.jpg",
    description: "A story of brotherhood and survival against demons.",
  },
  {
    title: "One Piece",
    image: "https://m.media-amazon.com/images/I/41-Z03WtLxL._SX300_SY300_QL70_FMwebp_.jpg",
    description: "An epic adventure of pirates searching for the ultimate treasure.",
  },
];

const HomePage = () => {
  return (
    <div className="bg-darkBg text-lightText">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://www.shutterstock.com/image-illustration/landscape-night-painting-artistic-conception-600nw-2189062479.jpg')" }}>
        <div className="absolute inset-0   flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-warmYellow"
          >
            Welcome to Ani-Flex
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-4 text-lg md:text-2xl"
          >
            Your ultimate destination for anime recommendations, trends, and reviews!
          </motion.p>
        </div>
      </section>

      {/* Best Anime Section */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-warmYellow mb-10">
          Best Anime in the World
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestAnime.map((anime, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-darkBg shadow-lg rounded-xl p-6 text-center transform transition-transform duration-300 hover:shadow-xl"
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="rounded-md h-48 w-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-warmOrange">{anime.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{anime.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Anime Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-warmYellow mb-10">
          Trending Anime
        </h2>
        <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
          {bestAnime.map((anime, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="min-w-[250px] bg-darkBg rounded-lg shadow-md"
            >
              <img
                src={anime.image}
                alt={anime.title}
                className="h-64 w-full rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-warmOrange">{anime.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warmRed p-6 text-center">
        <p className="text-sm text-lightText">
          © {new Date().getFullYear()} Ani-Flex. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
