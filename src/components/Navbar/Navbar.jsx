import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux"

function Navbar() {

  const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
  const role =  useSelector((state)=>state.auth.role);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (<>
  

    {isLoggedIn ?(<div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 sm:px-8 md:px-12 lg:px-16 bg-opacity-80 ">
      <div>
        <Link to={"/"} className="text-2xl font-bold sm:text-3xl">BookLook</Link>
      </div>

      <div className="items-center hidden gap-6 text-sm font-semibold list-none md:flex lg:gap-12 sm:text-base">
        <Link to={"/"} className="transition duration-300 cursor-pointer hover:text-orange-500 ">Home</Link>
        <Link to={"/allbooks"} className="transition duration-300 cursor-pointer hover:text-orange-500">Books</Link>
    {role==="user"?<Link to={"/cart"} className="transition duration-300 cursor-pointer hover:text-orange-500">Cart</Link>:""}    

        {role==="admin"?(<Link to={"/profile"} className="transition duration-300 cursor-pointer hover:text-orange-500">Admin Profile</Link>):(<Link to={"/profile"} className="transition duration-300 cursor-pointer hover:text-orange-500">Profile</Link>)}
        
      </div>

      {/* <div className="items-center hidden text-sm font-semibold list-none md:flex lg:gap-12 sm:text-base">
      <Link to="/login" className="px-5 py-2 transition duration-500 border-gray-800 rounded-md hover:bg-white hover:text-orange-500 ">Login</Link>
      <Link to={"/signup"} className="px-4 py-2 text-white transition duration-300 bg-orange-600 rounded-md hover:bg-orange-700 ">Sign Up</Link>
      </div> */}

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-opacity-80 backdrop-blur-md shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-700 ease-in-out`}>
        <button onClick={toggleMenu} className="absolute text-xl top-8 right-8">
          ✕
        </button>
        <ul className="flex flex-col items-start gap-4 px-4 mt-12 mb-16 text-sm font-semibold list-none sm:text-base">
          <Link to={"/"} className="text-orange-500 cursor-pointer" onClick={toggleMenu}>Home</Link>
          <Link to={"/allbooks"} className="text-orange-500 cursor-pointer " onClick={toggleMenu}>Books</Link>
          {role==="user"?<Link to={"/cart"} className="text-orange-500 cursor-pointer " onClick={toggleMenu}>Cart</Link>:""}      

{role==="admin"?( <Link to={"/profile"} className="text-orange-500 cursor-pointer " onClick={toggleMenu}>Admin Profile</Link>):( <Link to={"/profile"} className="text-orange-500 cursor-pointer " onClick={toggleMenu}>Profile</Link>)}
          
         
        </ul>
        {/* <div className="flex flex-col items-center gap-4 px-4 pb-8 mt-auto">
          <Link to={"/login"} className="w-full px-4 py-2 text-orange-500 bg-white border border-transparent rounded-md hover:border-gray-300" onClick={toggleMenu}>Login</Link>
          <Link to={"/signup"} className="w-full px-4 py-2 text-white bg-orange-600 border-2 border-orange-600 rounded-md hover:bg-orange-700" onClick={toggleMenu}>Sign Up</Link>
        </div> */}
      </div>
    </div>):
    (<div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-6 sm:px-8 md:px-12 lg:px-16 bg-opacity-80 ">
      <div>
        <Link to={"/"} className="text-2xl font-bold sm:text-3xl">BookLook</Link>
      </div>

      <div className="items-center hidden gap-6 text-sm font-semibold list-none md:flex lg:gap-12 sm:text-base">
        <Link to={"/"} className="transition duration-300 cursor-pointer hover:text-orange-500 ">Home</Link>
        <Link to={"/allbooks"} className="transition duration-300 cursor-pointer hover:text-orange-500">Books</Link>
     
       
      </div>

      <div className="items-center hidden text-sm font-semibold list-none md:flex lg:gap-12 sm:text-base">
      <Link to="/login" className="px-5 py-2 transition duration-500 border-gray-800 rounded-md hover:bg-white hover:text-orange-500 ">Login</Link>
      <Link to={"/signup"} className="px-4 py-2 text-white transition duration-300 bg-orange-600 rounded-md hover:bg-orange-700 ">Sign Up</Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-opacity-80 backdrop-blur-md shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-700 ease-in-out`}>
        <button onClick={toggleMenu} className="absolute text-xl top-8 right-8">
          ✕
        </button>
        <ul className="flex flex-col items-start gap-4 px-4 mt-12 mb-16 text-sm font-semibold list-none sm:text-base">
          <Link to={"/"} className="text-orange-500 cursor-pointer" onClick={toggleMenu}>Home</Link>
          <Link to={"/allbooks"} className="text-orange-500 cursor-pointer " onClick={toggleMenu}>Books</Link>
          
         
        </ul>
        <div className="flex flex-col items-center gap-4 px-4 pb-8 mt-auto">
          <Link to={"/login"} className="w-full px-4 py-2 text-orange-500 bg-white border border-transparent rounded-md hover:border-gray-300" onClick={toggleMenu}>Login</Link>
          <Link to={"/signup"} className="w-full px-4 py-2 text-white bg-orange-600 border-2 border-orange-600 rounded-md hover:bg-orange-700" onClick={toggleMenu}>Sign Up</Link>
        </div>
      </div>
    </div>)}
    
    </>
  );
}

export default Navbar;
