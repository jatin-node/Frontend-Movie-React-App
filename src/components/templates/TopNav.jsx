import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "../../assets/noimage.jpg";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <>
      <div className="flex relative xl:w-[85%] md:h-[10vh] left-0 bg-[#0F1014] md:ml-[15%] items-center px-10">
        <i className="text-zinc-400 text-xl md:text-3xl ri-search-line"></i>
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="w-[50%]  text-zinc-200 mx-5 md:mx-10 p-5 text-lg md:text-xl outline-none border-none bg-transparent"
          placeholder="Search"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="cursor-pointer ml-[1%] text-zinc-400 text-xl md:text-3xl ri-close-large-fill"
          ></i>
        )}

        <div className="z-50 absolute md::left-[-10%] left-[10%] w-[80%] sm:w-[80%] md:w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto">
          {searches.map((item, index) => (
            <Link
              to={`/${item.media_type || "movie"}/Details/${item.id}`}
              key={index}
              className="hover:text-black duration-300 hover:bg-zinc-300 font-semibold text-zinc-600 w-[100%] p-5 md:p-10 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  item.backdrop_path || item.profile_path || item.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path ||
                        item.profile_path ||
                        item.poster_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className="text-sm md:text-base">
                {item.original_title ||
                  item.name ||
                  item.title ||
                  item.original_name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopNav;
