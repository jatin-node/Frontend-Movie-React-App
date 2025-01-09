import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonDetails, removeperson } from "../store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./Loader";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PeopleDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(getPersonDetails(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);
  console.log(info);

  return info ? (
    <div className="px-[10%] w-screen max-h-screen overflow-auto bg-[#1F1E24]">
      <nav className="mt-5 mb-2  w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* Left Poster and Details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt=""
          />
          {/* Social Media links */}
          <div className="text-2xl ml-5 mt-5 flex gap-10 text-white border-none">
            <a
              target="_blank"
              href={`https://www.wikipedia.org/wiki/${info.external.wikidata_id}`}
            >
              <i className="ri-global-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com//${info.external.facebook_id}`}
            >
              <i className=" ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com//${info.external.instagram_id}`}
            >
              <i className=" ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com//${info.external.twitter_id}`}
            >
              <i className=" ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal Information */}
          <div className="h-fit">
            <h1 className="text-2xl text-zinc-100 font-semibold my-2">
              Personal Info
            </h1>
            <div className="flex items-center gap-10">
              <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                Name
              </h1>
              <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                {info.detail.name}
              </h1>
            </div>

            <div className="flex items-center gap-10">
              <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                Known for
              </h1>
              <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                {info.detail.known_for_department}
              </h1>
            </div>
            <div className="flex items-center gap-10">
              <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                gender
              </h1>
              <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                {info.detail.gender === 2 ? "Male" : "Female"}
              </h1>
            </div>
            {info.detail.birthday && (
              <div className="flex items-center gap-10">
                <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                  Birthday
                </h1>
                <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                  {info.detail.birthday}
                </h1>
              </div>
            )}
            {info.detail.deathday && (
              <div className="flex items-center gap-10">
                <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                  DeathDay
                </h1>
                <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                  {info.detail.deathday}
                </h1>
              </div>
            )}
            {info.detail.place_of_birth && (
              <div className="flex items-start gap-10">
                <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                  Birth Place
                </h1>
                <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                  {info.detail.place_of_birth}
                </h1>
              </div>
            )}
            {info.detail.also_known_as && (
              <div className="flex items-start gap-10 ">
                <h1 className="text-xl w-[25%] text-zinc-400 font-semibold mb-2">
                  Also known as
                </h1>
                <h1 className="text-zinc-400 w-[75%] flex flex-wrap">
                  {info.detail.also_known_as}
                </h1>
              </div>
            )}
          </div>
        </div>
        {/* Right details */}

        <div className="w-[80%] ml-[1%]">
          <h1 className="text-7xl text-white font-semibold mb-4">
            {info.detail.name}
          </h1>
          <h1 className="text-white text-2xl font-semibold mb-4">Biography</h1>
          <p className="text-zinc-400 ">{info.detail.biography}</p>

          <h1 className="text-2xl text-white font-semibold my-4">known For</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full mt-4 flex justify-between">
            <h1 className="text-2xl text-white font-semibold my-4">Acting</h1>
            <Dropdown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc my-5  w-full h-[50vh] overflow-x-hidden overflow-y-auto text-zinc-400  border-[#19191d]">
            {info[category + "Credits"].cast.map((c, i) => (
              <Link key={i} to={`/${category}/details/${c.id}`}>
                <li className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer">
                  <span className="capitalize">{category}:&nbsp;
                    {c.name || c.title || c.orginal_name || c.original_title}
                  </span>
                  {c.character && <span className="block pl-6">Role:&nbsp;{c.character}</span>}
                  
                </li>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PeopleDetails;
