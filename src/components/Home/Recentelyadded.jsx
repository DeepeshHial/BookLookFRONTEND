import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://booklook-wzjh.onrender.com/api/v1/getallbooks-recent");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className='px-4 sm:px-8 md:px-12 lg:px-16'>
      <h1 className='mb-12 text-2xl sm:text-3xl md:text-4xl pt-14'>Recently Added Books</h1>
     
      {!Data &&(<div className='flex items-center justify-center'><Loader/></div>
        
      )}
      <div className='grid grid-cols-1 gap-4 my-4 rounded-[3vh] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Data && Data.map((item, i) => (
          <div key={i}>
            <BookCard Data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
