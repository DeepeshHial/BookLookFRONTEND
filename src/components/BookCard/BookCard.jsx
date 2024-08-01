import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const BookCard = ({ Data, favourite }) => {
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id") || "",
    authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    bookid: Data._id
  };

  const handleFavourites = async () => {
    try {
      const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/removebook-from-favourite`, {}, { headers });
      alert(response.data.message);
      navigate("/profile")
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      alert("Failed to remove book from favourites. Please try again.");
    }
  };

  return (
    <div className='p-4 m-2 bg-gray-300 border border-gray-500 rounded-md shadow-lg sm:m-4 md:m-6 lg:m-8 bg-opacity-80 backdrop-blur-md'>
      <Link to={`/books-details/${Data._id}`}>
        <div className='flex items-center justify-center mb-4'>
          <img src={Data.url} alt={Data.title} className='w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] object-cover' />
        </div>
        <div className='text-center'>
          <h1 className='text-base font-semibold sm:text-lg md:text-xl lg:text-2xl'>{Data.title}</h1>
          <p className='text-sm font-semibold sm:text-base md:text-lg lg:text-xl text-zinc-600'>{Data.author}</p>
          <p className='text-sm font-semibold sm:text-base md:text-lg lg:text-xl'>₹ {Data.price}</p>
        </div>
      </Link>
      {favourite && (
        <div className='flex items-center justify-center w-full mt-4'>
          <button
            className='px-3 py-2 text-sm font-semibold transition duration-300 bg-white bg-opacity-50 rounded-lg backdrop-blur hover:bg-orange-500 hover:text-white'
            onClick={handleFavourites}
          >
            <i className="ri-dislike-line"></i> Remove From Favourites
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
