import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Setting = () => {
  const [settingdata, setSettingdata] = useState();
  const [Value, setValue] = useState({ address: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://booklook-wzjh.onrender.com/api/v1/getalluserinfo`, { headers });
      setSettingdata(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const UpdateAddress = async () => {
    const response = await axios.put(`https://booklook-wzjh.onrender.com/api/v1/updateuser-address`, Value, { headers });
    alert(response.data.message);
  };

  if (!settingdata) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='px-4 py-6'>
      <div className='flex flex-col gap-6 md:flex-row md:justify-between md:px-10'>
        <div className='flex flex-col gap-4 md:gap-6'>
          <div className='flex flex-col gap-2 md:flex-row md:items-center'>
            <label className="text-lg font-semibold md:text-xl" htmlFor="">Name:</label>
            <p className='text-base font-medium md:text-lg'>{settingdata.username}</p>
          </div>
          <div className='flex flex-col gap-2 md:flex-row md:items-center'>
            <label className="text-lg font-semibold md:text-xl" htmlFor="">Email:</label>
            <p className='text-base font-medium md:text-lg'>{settingdata.email}</p>
          </div>
          <div className='flex flex-col gap-2 md:flex-row md:items-center'>
            <label className="text-lg font-semibold md:text-xl" htmlFor="">Created At:</label>
            <p className='text-base font-medium md:text-lg'>{formatDate(settingdata.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 px-4 mt-6 md:px-10'>
        <label className="text-lg font-semibold md:text-xl" htmlFor="">Address</label>
        <textarea
          className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
          name="address"
          value={Value.address}
          placeholder='Address'
          rows="5"
          onChange={change}
        />
      </div>

      <div className='px-4 mt-6 text-right md:px-10'>
        <button
          className='px-4 py-2 text-base font-semibold transition duration-300 bg-opacity-50 border rounded-lg bg-zinc-400 backdrop-blur hover:bg-orange-500 hover:text-white'
          onClick={UpdateAddress}
        >
          Update <i className="ri-refresh-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Setting;
