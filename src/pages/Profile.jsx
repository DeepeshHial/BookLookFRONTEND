import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://booklook-wzjh.onrender.com/api/v1/getalluserinfo", { headers });
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className='flex flex-col gap-6 px-6 py-10 mt-12 md:flex-row sm:px-8 md:px-16 md:py-20'>
      {!profile && (
        <div className='flex items-center justify-center w-full h-[100vh]'>
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className='w-full md:w-1/4 lg:w-1/6'>
            <Sidebar data={profile} />
          </div>
          <div className='w-full md:w-3/4 lg:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
