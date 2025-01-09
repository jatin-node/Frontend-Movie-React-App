import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > page < 500) {
        setPerson((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    setPerson([]);
    getperson();
  }, [category]);
  return person ? (
    <div className="w-full h-full ">
      <div className="w-full flex items-center justify-between px-[3%] py-[1%]">
        <h1 className=" text-3xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
          ></i>
          People
        </h1>
        <div className="flex items-center gap-10 w-full">
          <TopNav />
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={getperson}
        hasMore={hasmore}
        loader={
          <h1 className="h-[5vh] text-3xl text-zinc-400 bg-[#1F1e24] px-[3%]">
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
        <Cards data={person} title="people" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default People;
