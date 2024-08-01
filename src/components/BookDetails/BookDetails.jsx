import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import {useSelector} from "react-redux"

const BookDetails = () => {
  const navigate = useNavigate()

  
  const { id } = useParams();
  const [data, setData] = useState({});
  const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
  const role =  useSelector((state)=>state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://booklook-wzjh.onrender.com/api/v1/getbyid/${id}`);
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  }

  const handleFav = async()=>{
    const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/add-to-favourite`,{},{headers})
    alert(response.data.message)
    
  }

  const handleCart = async ()=>{
    const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/addtocart`,{},{headers})
    alert(response.data.message)
  }




  const deleteBook = async()=>{
    const response = await axios.delete(`https://booklook-wzjh.onrender.com/api/v1/delete-book`,{headers}) 
    alert(response.data.message)
    navigate("/allbooks")
  }
  return (
    <>
      {data ? (
        <div className='flex flex-col gap-6 px-4 py-10 mt-12 overflow-auto md:flex-row sm:px-6 md:px-8 lg:px-16 lg:py-20 lg:h-screen'>
          <div className='flex items-center justify-center gap-3 md:w-1/2 lg:w-1/3'>
            <img className='object-cover w-48 h-64 rounded-lg sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem]' src={data.url} alt={data.title} />
            {isLoggedIn === true && role === "user" && <div className='flex flex-col gap-2' >
              <button className='flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full' onClick={handleFav} ><i className="ri-heart-fill"></i></button>
              <button className='flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full' onClick={handleCart} ><i className="ri-shopping-cart-2-fill"></i></button>
            </div>}
            {isLoggedIn === true && role === "admin" && <div className='flex flex-col gap-2' >
              <Link to={`/UpdateBook/${id}`} className='flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full'><i className="ri-pencil-line"></i></Link>
              <button className='flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full' onClick={deleteBook} ><i className="ri-close-line"></i></button>
            </div>}
          </div>
          <div className='flex-1 h-auto p-4 sm:p-6 md:p-8 lg:p-12 lg:overflow-y-auto'>
            <h1 className='mb-4 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl lg:mb-6'>{data.title}</h1>
            <p className='mb-4 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl lg:mb-6'>by: <span className='text-zinc-500'>{data.author}</span></p>
            <p className='mb-4 text-sm sm:text-base md:text-lg lg:text-xl lg:mb-6 text-zinc-600'>{data.desc}</p>
            <p className='mb-4 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl lg:mb-6'>Language: <span className='text-zinc-500'>{data.language}</span></p>
            <p className='mb-4 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl lg:mb-6'>Price: <span className='text-orange-500'>₹ {data.price}</span></p>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <Loader />
        </div>
      )}
    </>
  );
};

export default BookDetails;
