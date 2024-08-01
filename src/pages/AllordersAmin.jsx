import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import SeeUserData from './SeeUserData';

const AllordersAmin = () => {
  const [Allorders, setAllorders] = useState([]);
  const [Statusvalue, setStatusvalue] = useState();
  const [userDiv, setuserDiv] = useState();
  const [userDivData, setuserDivData] = useState();
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://booklook-wzjh.onrender.com/api/v1/getall-orders", { headers });
        setAllorders(response.data.data);
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.');
        console.error('Error fetching orders:', error);
      }
    };
    fetch();
  }, []);

  function statusvalue(e) {
    const value = e.target.value;
    setStatusvalue(value);
  }

  const submitChange = async (i) => {
    const id = Allorders[i]._id;
    try {
      const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/update-status/${id}`, { status: Statusvalue }, { headers });
      alert(response.data.message);
    } catch (error) {
      alert('Failed to update status. Please try again later.');
      console.error('Error updating status:', error);
    }
  };

  if (error) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <p>{error}</p>
      </div>
    );
  }

  if (!Allorders) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader />
      </div>
    );
  }

  if (Allorders.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-screen'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl text-zinc-500'>No Orders</h1>
        <img src="" alt="" className='mt-4' />
      </div>
    );
  }

  return (
    <>
      <div className='px-4 py-6'>
        {Allorders.length > 0 && (
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
                    <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>CHANGE STATUS</th>
                    <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>STATUS</th>
                    <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'>MODE</th>
                    <th className='px-4 py-2 border-b-2 border-gray-300 sm:px-6 sm:py-4'><i className="ri-user-3-fill"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {Allorders.map((item, i) => (
                    <tr key={i} className='bg-white hover:bg-gray-100'>
                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <p>{i + 1}</p>
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        {item.book && item.book.url ? (
                          <img className='w-12 sm:w-16 md:w-24' src={item.book.url} alt={item.book.title} />
                        ) : (
                          <p>No image available</p>
                        )}
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <p className='text-sm font-semibold sm:text-base md:text-lg'>{item.book ? item.book.title : 'No title available'}</p>
                        <p className='text-xs text-gray-600 sm:text-sm'>{item.book ? item.book.author : 'No author available'}</p>
                      </td>

                      <td className='px-4 py-2 font-semibold border-b border-gray-200 sm:px-6 sm:py-4'>
                        ₹ {item.book ? item.book.price : 'N/A'}
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <div className='flex items-center gap-2'>
                          <select name='status' className='p-2 border rounded' onChange={statusvalue}>
                            {["Order Placed", "Out For Delivery", "Delivered", "Cancelled"].map((status, i) => (
                              <option value={status} key={i}>{status}</option>
                            ))}
                          </select>
                          <button onClick={() => submitChange(i)} className='text-green-500'>
                            <i className="text-2xl ri-check-fill"></i>
                          </button>
                        </div>
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <div className={`font-semibold ${item.status === "Cancelled" ? 'text-red-500' : 'text-green-500'}`}>
                          {item.status}
                        </div>
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <p>COD</p>
                      </td>

                      <td className='px-4 py-2 border-b border-gray-200 sm:px-6 sm:py-4'>
                        <button onClick={() => {
                          setuserDiv("fixed");
                          setuserDivData(item.user);
                        }}>
                          <i className="ri-information-fill"></i> User Info
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllordersAmin;
