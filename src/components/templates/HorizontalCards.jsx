import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    <div className="px-5">
      <div className="w-[100%] h-[45vh] flex overflow-y-hidden">
        {data.map((item, index) => (
          <Link
          to={`/${item.media_type || "movie"}/Details/${item.id}`} 
            key={index}
            className="min-w-[18%] bg-gradient-to-b from-zinc-600 from-15% mr-5 rounded-xl overflow-hidden"
          >
            <img
              className="w-full h-[45%] object-cover"
              src={`https://image.tmdb.org/t/p/original${
                item.backdrop_path || item.profile_path || item.poster_path
              }`}
              alt=""
            />
            <div className="text-ellipsis line-clamp-6 text-white px-2">
              <h1 className=" text-xl font-black mt-3">
                {item.original_title ||
                  item.name ||
                  item.title ||
                  item.original_name}
              </h1>
              <p className="my-3">
                {item.overview}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
