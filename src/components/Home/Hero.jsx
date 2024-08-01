import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 py-10 mt-12 md:flex-row sm:px-8 md:px-16 justify-evenly md:py-20 ">
      <div className="w-full h-auto mb-8 text-center md:w-1/2 md:mb-0 md:text-left">
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl">
          Power Books to Exceed Your <span className="text-orange-600">Mental Limits!</span>
        </h1>

        <p className="mb-6 text-base sm:text-lg md:text-xl md:mb-9">
          Welcome to <Link to={"/"} className="text-orange-600" >BookLook</Link>, your online destination for a curated selection of books. Challenge your perspectives, ignite your curiosity, and discover new ideas with our diverse collection, all from the comfort of your home.
        </p>

        <Link to={"/allbooks"} className="px-6 py-3 text-lg text-white bg-orange-600 rounded-md sm:px-8 sm:py-4 md:px-10 md:py-5 sm:text-xl md:text-2xl">
          Explore Books
        </Link>
      </div>

      <div className="w-full text-right md:w-1/3">
        <img className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg" src='/assets/books.png' alt="Books" />
      </div>
    </div>
  );
}

export default Hero;
