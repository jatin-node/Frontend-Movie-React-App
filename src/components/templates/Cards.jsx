import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const Cards = ({ data, title }) => {
  console.log(data)
  return data ? (
    <div className="flex flex-wrap h-full w-full px-[3%] bg-[#0F1014]">
      {data.map((c, i) => (
        <Link to={`/${data.media_type || c.media_type || title}/Details/${c.id}`} className="relative w-[48%] sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] mr-[2%] mb-[4%] rounded-lg" key={i}>
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[30vh] sm:h-[35vh] md:h-[40vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${
              c.poster_path || c.profile_path || c.backdrop_path
            }`}
            alt=""
          />
          <h1 className="text-lg sm:text-xl md:text-2xl mt-3 text-zinc-300 font-semibold">
            {c.original_title || c.name || c.title || c.original_name}
          </h1>
            {c.vote_average && (
              <div className="hidden lg:flex absolute right-[2%] top-[10%] text-white bg-purple-800 w-[5vh] sm:w-[6vh] h-[5vh] sm:h-[6vh] rounded-full justify-center items-center font-semibold text-md sm:text-lg">
                {(c.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}

        </Link>
      ))}
    </div>
  ):(
    <Loader/>
  )
};

export default Cards;
