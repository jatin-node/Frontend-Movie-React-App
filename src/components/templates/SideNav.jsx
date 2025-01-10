import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SideNav = ({ isVisible, setIsVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed z-[100] pr-12 left-0 h-screen bg-[#0F1014] p-6 flex flex-col justify-around items-start transition-all duration-300 ${
        isHovered ? "w-[8%]" : "w-[5%]"
      } ${isVisible ? "flex" : "hidden"}  md:flex`}
    >
      <h1
        className="text-4xl flex flex-col gap-4 text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        <i className="text-[#6556CD] ri-tv-fill"></i>
        {/* <i class=" ri-close-large-line"></i> */}
      </h1>

      <nav className="flex flex-col text-xl">
        <Link
          to="/trending"
          className="text-zinc-400  hover:text-white rounded p-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-fire-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Trending
          </small>
        </Link>
        <Link
          to="/popular"
          className="text-zinc-400  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-magic-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Popular
          </small>
        </Link>
        <Link
          to="/movie"
          className="text-zinc-400  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-movie-ai-line"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Movies
          </small>
        </Link>
        <Link
          to="/tvShows"
          className="text-zinc-400 flex items-center whitespace-nowrap  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-tv-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            TV Shows
          </small>
        </Link>
        <Link
          to="/people"
          className="text-zinc-400  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-group-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            People
          </small>
        </Link>
      </nav>
      <nav className="flex flex-col text-xl">
        <Link
          className="text-zinc-400  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-information-2-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            About
          </small>
        </Link>
        <Link
          className="text-zinc-400  hover:text-white rounded p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <i className="ri-phone-fill"></i>
          <small
            className={`ml-2 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Contact
          </small>
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
