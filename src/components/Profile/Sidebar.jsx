import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";

const Sidebar = ({ data }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const history = useNavigate();

  return (
    <div className='p-4 rounded-md md:h-[81vh] flex flex-col justify-between bg-gray-300'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center w-full mb-4'>
          <img className="w-14 md:w-20 lg:w-24" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="User Icon" />
        </div>
        <p className='mb-2 text-sm md:text-base lg:text-lg'>{data.username}</p>
        <p className='mb-2 text-sm md:text-base lg:text-lg'>{data.email}</p>
        <div className='w-full mt-2 h-[1px] bg-zinc-900 opacity-25'></div>
      </div>

      {role === "admin" ? (
        <div className='flex flex-col w-full'>
          <Link to={"/profile"} className='w-full'>
            <div className='flex items-center gap-5 px-4 py-3 mb-2 transition duration-300 rounded-lg hover:bg-orange-500'>
              <p className='text-sm md:text-base lg:text-lg'>All Orders</p>
            </div>
          </Link>
          <Link to={"/profile/add-books"} className='w-full'>
            <div className='flex items-center gap-5 px-4 py-3 mb-2 transition duration-300 rounded-lg hover:bg-orange-500'>
              <p className='text-sm md:text-base lg:text-lg'>Add Books</p>
            </div>
          </Link>
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          <Link to={"/profile"} className='w-full'>
            <div className='flex items-center gap-5 px-4 py-3 mb-2 transition duration-300 rounded-lg hover:bg-orange-500'>
              <i className="ri-star-line"></i> <p className='text-sm md:text-base lg:text-lg'>Favourites</p>
            </div>
          </Link>
          <Link to={"/profile/orderHistory"} className='w-full'>
            <div className='flex items-center gap-5 px-4 py-3 mb-2 transition duration-300 rounded-lg hover:bg-orange-500'>
              <i className="ri-history-line"></i> <p className='text-sm md:text-base lg:text-lg'>Order History</p>
            </div>
          </Link>
          <Link to={"/profile/setting"} className='w-full'>
            <div className='flex items-center gap-5 px-4 py-3 mb-2 transition duration-300 rounded-lg hover:bg-orange-500'>
              <i className="ri-settings-5-line"></i> <p className='text-sm md:text-base lg:text-lg'>Setting</p>
            </div>
          </Link>
        </div>
      )}

      <div className='w-full h-[1px] bg-zinc-900 opacity-25'></div>

      <button
        className="w-full px-4 py-2 text-sm text-orange-500 bg-white border border-transparent rounded-md md:text-base lg:text-lg hover:border-gray-300"
        onClick={() => {
          dispatch(authAction.logout());
          dispatch(authAction.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Logout <i className="ri-logout-circle-r-line"></i>
      </button>
    </div>
  );
}

export default Sidebar;
