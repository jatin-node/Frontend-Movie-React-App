import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {

  return (
    <div className="w-[15%] h-full border-r-2 border-zinc-600 p-10 ">
      <h1 className="text-4xl text-white font-bold ">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span className="text-2xl"> MovieApp</span>
      </h1>

      <nav className="flex flex-col text-xl">
        <h1 className="text-white font-semibold text-xl mt-10 mb-4">
          New Feeds
        </h1>
        <Link to="/trending" className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-magic-fill"></i> Popular
        </Link>
        <Link to="/movie" className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-movie-ai-line"></i> Movies
        </Link>
        <Link to="/tvShows" className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-tv-fill"></i> Tv Shows
        </Link>
        <Link to="/people" className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-group-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-4" />
      
      <nav className="flex flex-col text-xl">
        <h1 className="text-white font-semibold text-xl mb-4">
          Information
        </h1>
        <Link className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-information-2-fill"></i> About
        </Link>
        <Link className="text-zinc-400 hover:bg-[#6556CD] hover:text-white rounded p-3">
          <i className="ri-phone-fill"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
