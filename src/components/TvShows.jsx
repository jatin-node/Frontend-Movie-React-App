import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import SideNav from "./templates/SideNav";

const TvShows = () => {
  document.title = "MovieApp || TvShows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("on_the_air");
  const [tvShows, setTvShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > page < 500) {
        setTvShows((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setTvShows([]);
    getTvShows();
  }, [category]);
  return tvShows ? (
    <>
      <SideNav />
      <div className="w-[95%] ml-[5%] h-full ">
        <div className="w-full flex items-center justify-between px-[3%] py-[1%]">
          <h1 className="w-[37%] text-3xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
            ></i>
            Tv Shows
          </h1>
          <div className="flex items-center  gap-10 w-full">
            <TopNav />
            <span className="hidden   md:inline-flex items-center gap-10 w-[50%]">
              <Dropdown
                title="Category"
                options={["popular", "top_rated", "airing_today", "on_the_air"]}
                func={(e) => setCategory(e.target.value)}
              />
            </span>
          </div>
        </div>

        <InfiniteScroll
          dataLength={tvShows.length}
          next={getTvShows}
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
          <Cards data={tvShows} title="tv" />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default TvShows;
