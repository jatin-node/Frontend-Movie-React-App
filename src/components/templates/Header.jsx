import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path || data.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[80vh] flex flex-col items-start justify-end p-[8%]"
    >
      <h1 className="w-[70%] text-white text-5xl font-bold">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className="w-[70%] text-white mt-5">
        {data.overview.slice(0, 200)}...
        <Link to={`${data.media_type}/Details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-white mt-5">
        <i className=" text-yellow-200 ri-megaphone-fill"></i> {data.release_date || data.first_air_date || "Unknown"}
        <i className="ml-5 text-yellow-200 ri-album-fill"></i> {data.media_type.toUpperCase()}
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556CD] mt-5 p-4 rounded-xl text-white">Watch Trailer</Link>

    </div>
  );
};

export default Header;
