import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("tv") ? "tv" : "movie";
  const ytlink = useSelector((state) => state[category].info.videos);
  return (
    <div className="bg-[rgba(0,0,0,0.8)] fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ">
      <Link
        onClick={() => navigate(-1)}
        className="text-white absolute z-[100] top-[5%] right-[8%] hover:text-[#6556CD] text-3xl cursor-pointer ri-close-large-line"
      ></Link>
      {ytlink && ytlink.key ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytlink.key}`}
          height={800}
          width={1500}
        />
      ) : (
        <div className="text-zinc-400 text-7xl font-semibold">Not Available</div>
      )}
    </div>
  );
};

export default Trailer;
