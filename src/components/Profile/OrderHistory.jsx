import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [history, setHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://booklook-wzjh.onrender.com/api/v1/get-order-history`, { headers });
      setHistory(response.data.data);
    };
    fetch();
  }, []);

  if (!history) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-screen'>
        <h1 className='text-4xl font-semibold sm:text-5xl md:text-6xl text-zinc-500'>No History</h1>
        <img src="" alt="" className='mt-4' />
      </div>
    );
  }

  return (
    <div className='px-4 py-6'>
      {history.length > 0 && (
        <>
          <h1 className='mb-6 text-3xl font-bold sm:text-4xl md:text-5xl text-zinc-700'>Order History</h1>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse table-auto'>
              <thead>
                <tr className='text-left bg-gray-200'>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>SNo</th>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>ITEMS</th>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>DETAILS</th>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>PRICE</th>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>STATUS</th>
                  <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>MODE</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => (
                  <tr key={i} className='bg-white hover:bg-gray-100'>
                    <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                      <p>{i + 1}</p>
                    </td>

                    <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                      <Link to={`/books-details/${item.book._id}`} >
                        <img className='w-12 sm:w-16 md:w-24 lg:w-32' src={item.book.url} alt={item.book.title} />
                      </Link>
                    </td>

                    <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                      <p className='text-sm font-semibold sm:text-base md:text-lg'>{item.book.title}</p>
                      <p className='text-xs text-gray-600 sm:text-sm'>{item.book.author}</p>
                    </td>
                    <td className='px-4 py-2 font-semibold border-b border-gray-200 sm:px-6 sm:py-4'>
                      ₹ {item.book.price}
                    </td>
                    <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                      {item.status === "Cancled" ? (
                        <div className='text-red-500'>{item.status}</div>
                      ) : (
                        <div className='text-green-500'>{item.status}</div>
                      ) }
                    </td>
                    <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                      <p>COD</p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
