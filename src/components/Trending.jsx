import React, { useEffect, useState } from "react";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import { useNavigate } from "react-router-dom";
import Cards from "./templates/Cards";
import Loader from "./Loader";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import SideNav from "./templates/SideNav";

const Trending = () => {
  document.title = "MovieApp || Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0 && page < 500) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setTrending([]);
    getTrending();
  }, [category, duration]);

  return trending ? (
    <>
      <SideNav />
      <div className=" w-[95%] ml-[5%] h-full ">
        <div className="w-full flex items-center justify-between px-[3%] py-[1%]">
          <h1 className="text-3xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
            ></i>
            Trending
          </h1>
          <div className="flex items-center  gap-10 w-full">
            <TopNav />
            <div className="hidden   md:inline-flex items-center gap-10 w-[50%]">
              <Dropdown
                title="Category"
                options={["all", "movie", "tv"]}
                func={(e) => setCategory(e.target.value)}
              />
              <Dropdown
                title="Duration"
                options={["day", "week"]}
                func={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={trending.length}
          next={getTrending}
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
          <Cards data={trending} title={category} />
        </InfiniteScroll>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Trending;
