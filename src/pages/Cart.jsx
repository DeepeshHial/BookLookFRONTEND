import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const request = await axios.get('https://booklook-wzjh.onrender.com/api/v1/get-user-cart', { headers });
      setCart(request.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.forEach((item) => {
        total += parseFloat(item.price);
      });
      setTotal(total);
    }
  }, [cart]);

  const handleCancelCart = async (bookId) => {
    const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/remove-from-cart/${bookId}`, {}, { headers });
    alert(response.data.message);
    setCart(cart.filter(item => item._id !== bookId));
  };

  const handleOrders = async () => {
    const response = await axios.post(`https://booklook-wzjh.onrender.com/api/v1/placeorder`, { order: cart }, { headers });
    alert(response.data.message);
    navigate("/profile/orderHistory");
  };

  if (!cart) {
    return (
      <div className='flex items-center justify-center w-full h-[100vh]'>
        <Loader />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-[100vh] flex-col'>
        <h1 className='text-7xl text-zinc-500'>Cart Empty</h1>
        <img src="" alt="" />
      </div>
    );
  }

  return (
    <div className='gap-6 px-6 py-10 mt-12 sm:px-8 md:px-16 md:py-20'>
      {cart && cart.length > 0 && (
        <>
          <table className='w-full border-collapse table-auto'>
            <thead>
              <tr className='text-left bg-gray-200'>
                <th className='px-2 py-4 border-b-2 border-gray-300 sm:px-6'>ITEMS</th>
                <th className='px-2 py-4 border-b-2 border-gray-300 sm:px-6'>DETAILS</th>
                <th className='px-2 py-4 border-b-2 border-gray-300 sm:px-6'>PRICE</th>
                <th className='px-2 py-4 border-b-2 border-gray-300 sm:px-6'>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className='bg-white hover:bg-gray-100'>
                  <td className='px-2 py-2 border-b border-gray-200 sm:px-6'>
                    <img className='w-12 sm:w-16' src={item.url} alt={item.title} />
                  </td>
                  <td className='px-2 py-2 border-b border-gray-200 sm:px-6'>
                    <p className='font-semibold'>{item.title}</p>
                    <p className='text-gray-600'>{item.author}</p>
                  </td>
                  <td className='px-2 py-2 font-extrabold border-b border-gray-200 sm:px-6'>
                    ₹ {item.price}
                  </td>
                  <td className='px-2 py-2 border-b border-gray-200 sm:px-6'>
                    <button
                      className='flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full sm:w-10 sm:h-10'
                      onClick={() => handleCancelCart(item._id)}
                    >
                      <i className='ri-close-line'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='gap-6 px-6 py-10 mt-8 bg-white sm:px-8 md:px-16 md:py-20'>
            {cart.map((item, i) => (
              <div key={i} className='flex items-center justify-between'>
                <div>
                  <p className='mb-1 font-semibold'>{item.title}</p>
                </div>
                <div>
                  <p className='mb-1 font-bold'>₹ {item.price}</p>
                </div>
              </div>
            ))}
            <div className='w-full mt-2 h-[1px] bg-zinc-900'></div>
            <div className='flex flex-col mt-3 sm:flex-row sm:justify-between'>
              <div className='text-xl font-bold'>
                <p>Order Details</p>
              </div>
              <div className='mt-3 sm:mt-0'>
                <p className='text-xl font-semibold'>Books: {cart.length}</p>
                <p className='text-xl font-semibold'>Total: ₹ {total.toFixed(2)}</p>
                <button
                  className='mt-3 px-2 py-2 bg-zinc-400 text-[15px] font-semibold rounded-lg bg-opacity-50 backdrop-blur hover:bg-orange-500 hover:text-white transition duration-300 border'
                  onClick={handleOrders}
                >
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
