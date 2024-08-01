import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const Favourites = () => {
  const [favouritedata, setFavouritesdata] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://booklook-wzjh.onrender.com/api/v1/getbooks-favourite-user`, { headers });
      setFavouritesdata(response.data.data);
    };
    fetch();
  }, []);

  if (!favouritedata) {
    return (
      <div className='flex items-center justify-center w-full h-[100vh]'>
        <Loader />
      </div>
    );
  }

  if (favouritedata.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-[100vh] flex-col'>
        <h1 className='text-7xl text-zinc-500'>No Favourites</h1>
        <img src="" alt="" />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {favouritedata && favouritedata.map((item, i) => (
        <div key={i}>
          <BookCard Data={item} favourite={true} />
        </div>
      ))}
    </div>
  );
};

export default Favourites;
