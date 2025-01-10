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
    <div className="px-4 md:px-[10%] w-full max-h-screen overflow-auto bg-[#0F1014]">
      <nav className="mt-5 mb-2 w-full text-zinc-100 flex items-center gap-4 md:gap-10 text-lg md:text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex flex-col md:flex-row">
        {/* Left Poster and Details */}
        <div className="w-full md:w-[20%] mt-5 md:mt-0">
          <img
            className="w-full md:w-auto shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[70vh] md:h-[30vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt=""
          />
          {/* Social Media links */}
          <div className="text-lg md:text-2xl mt-5 flex gap-10 md:gap-4 xl:gap-10 text-white border-none justify-center md:justify-start">
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
          <div className="h-fit mt-5">
            <h1 className="text-xl md:text-2xl text-zinc-100 font-semibold mb-4">
              Personal Info
            </h1>
            <div className="space-y-4">
              <div className="flex items-center md:flex-row gap-4">
                <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                  Name :
                </h1>
                <h1 className="text-zinc-400">{info.detail.name}</h1>
              </div>
              <div className="flex items-center md:flex-row gap-4">
                <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                  Known for :
                </h1>
                <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>
              </div>
              <div className="flex items-center md:flex-row gap-4">
                <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                  Gender : 
                </h1>
                <h1 className="text-zinc-400">{info.detail.gender === 2 ? "Male" : "Female"}</h1>
              </div>
              {info.detail.birthday && (
                <div className="flex items-center md:flex-row gap-4">
                  <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                    Birthday : 
                  </h1>
                  <h1 className="text-zinc-400">{info.detail.birthday}</h1>
                </div>
              )}
              {info.detail.deathday && (
                <div className="flex items-center md:flex-row gap-4">
                  <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                    DeathDay : 
                  </h1>
                  <h1 className="text-zinc-400">{info.detail.deathday}</h1>
                </div>
              )}
              {info.detail.place_of_birth && (
                <div className="flex flex-col md:flex-row ">
                  <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                    Birth Place :- 
                  </h1>
                  <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
                </div>
              )}
              {info.detail.also_known_as && (
                <div className="flex flex-col md:flex-row">
                  <h1 className="text-lg md:text-xl text-zinc-300 font-semibold">
                    Also known as :-  
                  </h1>
                  <h1 className="text-zinc-400">{info.detail.also_known_as}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right details */}

        <div className="w-full md:w-[80%] md:ml-[1%] mt-5 md:mt-0">
          <h1 className="text-4xl md:text-7xl text-white font-semibold mb-4">
            {info.detail.name}
          </h1>
          <h1 className="text-white text-xl md:text-2xl font-semibold mb-4">Biography</h1>
          <p className="text-zinc-400 ">{info.detail.biography}</p>

          <h1 className="text-xl md:text-2xl text-white font-semibold my-4">Known For</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full mt-4 flex flex-col md:flex-row justify-between">
            <h1 className="text-xl md:text-2xl text-white font-semibold my-4">Acting</h1>
            <Dropdown
              title={category}
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="list-disc my-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto text-zinc-400 border-[#19191d]">
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
