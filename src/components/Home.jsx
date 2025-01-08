import React, { useEffect, useState } from "react";
import SideNav from "./templates/SideNav";
import TopNav from "./templates/TopNav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./Loader";

const Home = () => {
  document.title = "MovieApp || Home";
  const [wallpaper, setWallpaper] = useState(null); // Storing One random movie wallpaper
  const [trending, setTrending] = useState(); // Storing Trending movies
  const [category, setCategory] = useState("all"); // Storing category

  // Fetching random wallpaper
  const getwallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // Fetching Trending movies
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    !wallpaper && getwallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className="w-[85%] h-full overflow auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />

        <div className="mb-5 flex justify-between  items-center px-5 pt-6">
          <h1 className="text-3xl font-semibold text-zinc-300">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
