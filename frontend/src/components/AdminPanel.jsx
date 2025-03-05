import React, { useState, useEffect } from "react";



const AdminPanel = () => {

 const [animeList, setAnimeList] = useState([]);

 const [newAnime, setNewAnime] = useState({ title: "", image: null, description: "" });

 const [selectedAnime, setSelectedAnime] = useState(null);

 const [newEpisode, setNewEpisode] = useState({ title: "", link: "" });



 useEffect(() => {

  fetch("http://localhost:5000/api/anime")

   .then((res) => res.json())

   .then((data) => {

    const updatedAnimeList = data.map((anime) => ({

     ...anime,

     image: anime.image ? `http://localhost:5000${anime.image}` : null,

    }));

    setAnimeList(updatedAnimeList);

   })

   .catch((err) => console.error("Error fetching anime:", err));

 }, []);



 const handleAddAnime = async () => {

  if (!newAnime.title.trim() || !newAnime.image || !newAnime.description.trim()) return;



  const formData = new FormData();

  formData.append("title", newAnime.title);

  formData.append("description", newAnime.description);

  formData.append("image", newAnime.image);



  try {

   const response = await fetch("http://localhost:5000/api/anime", {

    method: "POST",

    body: formData,

   });



   const addedAnime = await response.json();

   setAnimeList([...animeList, { ...addedAnime, image: `http://localhost:5000${addedAnime.image}` }]);

   setNewAnime({ title: "", image: null, description: "" });

  } catch (error) {

   console.error("Error adding anime:", error);

  }

 };



 const handleDeleteAnime = async (id) => {

  try {

   await fetch(`http://localhost:5000/api/anime/${id}`, { method: "DELETE" });

   setAnimeList(animeList.filter((anime) => anime._id !== id));

  } catch (error) {

   console.error("Error deleting anime:", error);

  }

 };



 const handleAddEpisode = async () => {

  if (!selectedAnime || !newEpisode.title.trim() || !newEpisode.link.trim()) return;

  try {

   const response = await fetch(`http://localhost:5000/api/anime/${selectedAnime._id}/episodes`, {

    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(newEpisode),

   });

   const updatedAnime = await response.json();

   setAnimeList(animeList.map((anime) => (anime._id === updatedAnime._id ? updatedAnime : anime)));

   setNewEpisode({ title: "", link: "" });

  } catch (error) {

   console.error("Error adding episode:", error);

  }

 };



 return (

  <div className="p-6 bg-gray-900 text-white min-h-screen">

   <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>



   {/* Add New Anime */}

   <div className="mb-8">

    <h2 className="text-2xl font-bold mb-4">Add New Anime</h2>

    <div className="mb-4">

     <input

      type="text"

      placeholder="Enter Anime Title"

      value={newAnime.title}

      onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}

      className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"

     />

      

     <input

      type="file"

      accept="image/*"

      onChange={(e) => {

       if (e.target.files && e.target.files[0]) {

        const file = e.target.files[0];

        setNewAnime((prev) => ({ ...prev, image: file }));

       }

      }}

      className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"

     />



     <textarea

      placeholder="Enter Anime Description"

      value={newAnime.description}

      onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}

      className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"

     ></textarea>



     <button

      onClick={handleAddAnime}

      className="bg-blue-500 px-4 py-2 mt-2 rounded-md hover:bg-blue-600 w-full"

     >

      Add Anime

     </button>

    </div>

   </div>



   {/* Anime List */}

   <div className="mb-8">

    <h2 className="text-2xl font-bold mb-4">Anime List</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

     {animeList.map((anime) => (

      <div key={anime._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">

       <div className="flex justify-between items-center mb-4">

        <h3 className="text-xl font-bold">{anime.title}</h3>

        <button

         onClick={() => handleDeleteAnime(anime._id)}

         className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"

        >

         Delete

        </button>

       </div>

       {anime.image ? (

        <img 

         src={anime.image} 

         alt={anime.title} 

         className="w-full h-48 object-cover rounded-md mb-4" 

        />

       ) : (

        <p className="text-gray-400">No image available</p>

       )}

       <p className="text-sm text-gray-300 mb-4">{anime.description}</p>

       <button

        onClick={() => setSelectedAnime(anime)}

        className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 w-full"

       >

        Add Episode

       </button>

      </div>

     ))}

    </div>

   </div>



   {/* Add Episode Section */}

   {selectedAnime && (

    <div className="mb-8">

     <h2 className="text-2xl font-bold mb-4">Add Episode to {selectedAnime.title}</h2>

     <div className="mb-4">

      <input

       type="text"

       placeholder="Enter Episode Title"

       value={newEpisode.title}

       onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}

       className="bg-gray-700 text-white px-3 py-2 rounded-md w-full mb-2"

      />

      <input

       type="text"

       placeholder="Enter Episode Link"

       value={newEpisode.link}

       onChange={(e) => setNewEpisode({ ...newEpisode, link: e.target.value })}

       className="bg-gray-700 text-white px-3 py-2 rounded-md w-full"

      />

      <button

       onClick={handleAddEpisode}

       className="bg-green-500 px-4 py-2 mt-2 rounded-md hover:bg-green-600 w-full"

      >

       Add Episode

      </button>

     </div>

    </div>

   )}

  </div>

 );

};



export default AdminPanel;