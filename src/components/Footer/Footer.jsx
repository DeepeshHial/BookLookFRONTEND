import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    
    <div className='bg-zinc-300'>
       <div className='w-full h-[1px] bg-zinc-900 opacity-25'></div>
      <footer className="py-6 text-zinc-950">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap justify-between">
      <div className="w-full mb-4 md:w-1/4">
        <h4 className="mb-2 text-lg font-semibold">About Us</h4>
        <p>Welcome to BookLook!</p>
        <p>Browse and buy your favorite books online. Find your next read today!</p>

      </div>
      <div className="w-full mb-4 md:w-1/4">
        <h4 className="mb-2 text-lg font-semibold">Quick Links</h4>
        <ul>
          <li><Link to={"/"} className="hover:underline">Home</Link></li>
          <li><Link to={"/allbooks"} className="hover:underline">Shop</Link></li>
          <li><Link to={"/profile"} className="hover:underline">My Account</Link></li>
        </ul>
      </div>
      <div className="w-full mb-4 md:w-1/4">
        <h4 className="mb-2 text-lg font-semibold">Contact Us</h4>
        <p>Email: deepesh@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Book St, Book City, BK 12345</p>
      </div>
      <div className="w-full mb-4 md:w-1/4">
      <div>

        <h4 className="mb-2 text-lg font-semibold">Follow Us</h4>
        <div className='flex items-center gap-7' >
        <i className="text-3xl cursor-pointer ri-twitter-x-line"></i>
        <i className="text-3xl cursor-pointer ri-linkedin-box-fill"></i>
        <i className="text-3xl cursor-pointer ri-instagram-line"></i>
        <i className="text-3xl cursor-pointer ri-facebook-box-fill"></i>
        </div>
      </div>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div className='w-full h-[1px] bg-zinc-900 opacity-25'></div>
    <div className="mt-4 text-center">
      <p>&copy; 2024 Your BookLook. All Rights Reserved.</p>
     
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
