import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  console.log(data)
  return (
    <div className="  flex flex-wrap h-full w-full px-[3%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${data.media_type || c.media_type || title}/Details/${c.id}`} className="relative w-[30vh] mr-[4%] mb-[4%] rounded-lg" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${
              c.poster_path || c.profile_path || c.backdrop_path
            }`}
            alt=""
          />
          <h1 className="text-2xl mt-3 text-zinc-300 font-semibold">
            {c.original_title || c.name || c.title || c.original_name}
          </h1>
            {c.vote_average && (
              <div className="absolute right-[2%] top-[10%] text-white bg-purple-800 w-[6vh] h-[6vh] rounded-full flex justify-center items-center  font-semibold text-lg">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}

        </Link>
      ))}
    </div>
  );
};

export default Cards;
