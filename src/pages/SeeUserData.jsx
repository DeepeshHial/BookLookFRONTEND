import React from 'react';

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <>
      {/* Overlay */}
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-gray-800 opacity-80 z-40 `} />

      {/* Modal */}
      <div className={`${userDiv} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-4 bg-white rounded shadow-lg w-full max-w-md  `}>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-semibold'>User Information</h1>
          <button onClick={() => setuserDiv("hidden")} className='text-2xl text-gray-600 hover:text-gray-800'>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className='space-y-4'>
          <div className='flex'>
            <label className="text-lg font-semibold" htmlFor="">User Name:</label>
            <h1 className="text-lg font-medium">{userDivData.username}</h1>
          </div>
          <div className='flex'>
            <label className="text-lg font-semibold" htmlFor="">Email:</label>
            <h1 className="text-lg font-medium">{userDivData.email}</h1>
          </div>
          <div className='flex'>
            <label className="text-lg font-semibold" htmlFor="">Address:</label>
            <h1 className="text-lg font-medium">{userDivData.address}</h1>
          </div>
          <div className='flex'>
            <label className="text-lg font-semibold" htmlFor="">User Created At:</label>
            <h1 className="text-lg font-medium">{formatDate(userDivData.createdAt)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
