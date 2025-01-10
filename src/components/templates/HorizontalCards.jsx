import React from "react";
import { Link } from "react-router-dom";
import noImage from "../../assets/noImage.jpg";

const HorizontalCards = ({ data }) => {
  return (
    <div className="px-5">
      <div className="w-full h-[40vh] md:h-[43vh] flex overflow-y-hidden">
        {data.length > 0 ? (
          data.map((item, index) => (
            <Link
              to={`/${item.media_type || "movie"}/Details/${item.id}`}
              key={index}
              className="min-w-[60%] sm:min-w-[40%] md:min-w-[25%] lg:min-w-[19%] bg-gradient-to-b from-zinc-600 from-15% mr-5 rounded-xl overflow-hidden"
            >
              <img
                className="w-full h-[45%] object-cover"
                src={
                  item.backdrop_path || item.profile_path || item.poster_path
                    ? `https://image.tmdb.org/t/p/original${
                        item.backdrop_path ||
                        item.profile_path ||
                        item.poster_path
                      }`
                    : noImage
                }
                alt=""
              />
              <div className="text-ellipsis line-clamp-6 text-white px-2">
                <h1 className="md:text-xl font-black mt-3">
                  {item.original_title ||
                    item.name ||
                    item.title ||
                    item.original_name}
                </h1>
                <p className="mt-1 md:my-3 text-xs md:text-base">
                  {item.overview ? item.overview : "No Description Available"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white font-black text-center text-2xl mt-10">
            No Data Available
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;
