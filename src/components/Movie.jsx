import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Cards from "./templates/Cards";
import Dropdown from "./templates/Dropdown";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import SideNav from "./templates/SideNav";

const Movie = () => {
  document.title = "MovieApp || Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const getmovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > page < 500) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setMovie([]);
    getmovie();
  }, [category]);
  return movie ? (
    <>
      <SideNav />
      <div className="w-[95%] ml-[5%] h-full ">
        <div className="w-full flex items-center justify-between px-[3%] py-[1%]">
          <h1 className="text-3xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
            ></i>
            Movies
          </h1>
          <div className="flex items-center  gap-10 w-full">
            <TopNav />
            <span className="hidden   md:inline-flex items-center gap-10 w-[50%]">
              <Dropdown
                title="Category"
                options={["popular", "top_rated", "upcoming", "now_playing"]}
                func={(e) => setCategory(e.target.value)}
              />
            </span>
          </div>
        </div>

        <InfiniteScroll
          dataLength={movie.length}
          next={getmovie}
          hasMore={hasmore}
          loader={
            <h1 className="h-[5vh] text-3xl text-zinc-400 bg-[#0F1014] px-[3%]">
              Loading...
            </h1>
          }
          endMessage={
            <p
              style={{
                color: "white",
                textAlign: "center",
                backgroundColor: "#1F1E24",
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Movie;
