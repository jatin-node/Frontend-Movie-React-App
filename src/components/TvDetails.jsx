import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTvDetails, removetv } from "../store/actions/tvAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./Loader";
import HorizontalCards from "./templates/HorizontalCards";
import noImage from "../assets/noImage.jpg";

const TvDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(info);
  useEffect(() => {
    dispatch(getTvDetails(id));
    return () => {
      dispatch(removetv());
    };
  }, [id, dispatch]);

  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,0.3), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative w-full h-screen px-[8%] overflow-x-hidden"
      >
        {/* External Links */}
        <nav className="mt-5 mb-10  w-full text-zinc-100 flex items-center gap-10 text-xl">
          <Link
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
          ></Link>
          <a
            target="_blank"
            href={`https://www.wikipedia.org/wiki/${info.external.wikidata_id}`}
          >
            <i className="ri-global-line"></i>
          </a>
          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.external.imdb_id}`}
          >
            Imdb
          </a>
        </nav>

        {/* Title and Description */}
        <div className="w-full flex mt-5">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[60vh] object-cover rounded-lg"
            src={`https://image.tmdb.org/t/p/original${
              info.detail.poster_path ||
              info.detail.profile_path ||
              info.detail.backdrop_path
            }`}
            alt=""
          />
          <div className="content ml-[5%] text-white max-w-full">
            {/* Title */}
            <h1 className="text-5xl font-black text-white">
              {info.detail.original_title ||
                info.detail.name ||
                info.detail.title ||
                info.detail.original_name}
              <small className="text-2xl font-bold text-zinc-100">
                (
                {
                  (
                    info.detail.release_date || info.detail.first_air_date
                  ).split("-")[0]
                }
                )
              </small>
            </h1>
            {/* Description */}
            <div className="mt-3 mb-5 flex flex-wrap items-center text-white gap-x-5">
              <div className="flex items-center gap-5 mb-5">
                <span className=" text-white bg-purple-800 w-[6vh] h-[6vh] rounded-full flex justify-center items-center  font-semibold text-lg">
                  {(info.detail.vote_average * 10).toFixed()}
                  <sup>%</sup>
                </span>
                <h1 className="w-[50px] font-semibold text-2xl leading-6">
                  User Score
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-x-5">
                <h1>
                  {info.detail.release_date || info.detail.first_air_date}
                </h1>
                <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
                <h1>{info.detail.number_of_seasons} Seasons</h1>
              </div>
            </div>

            <h1 className="text-zinc-200 text-xl italic font-semibold">
              {info.detail.tagline}
            </h1>
            <h1 className="mb-3 text-2xl mt-5">Overview</h1>
            <p>{info.detail.overview}</p>

            <h1 className="mb-10 text-2xl mt-5 flex items-end gap-2">
              <span>Languages:</span>
              <p className="text-base">{info.translations.join("  ")}</p>
            </h1>

            <Link
              className=" p-5 bg-[#6556CD] rounded-lg inline-flex items-center gap-2 text-xl font-semibold"
              to={`${pathname}/trailer`}
            >
              <i className="ri-play-large-fill"></i>
              Play Trailer
            </Link>
          </div>
        </div>

        {/* Available on Platforms */}
        <div className="w-[80%] mt-5 flex flex-col gap-5">
          {info.watchProviders && (
            <div className="text-2xl text-white">Available on:</div>
          )}
          <div className="ml-5 flex flex-col gap-2">
            {/* FlatRate */}
            {info.watchProviders && info.watchProviders.flatrate && (
              <div className="flex gap-5 items-start text-white">
                <h1 className="text-xl w-[10%]">Flatrate</h1>
                {info.watchProviders.flatrate.map((p, i) => (
                  <div key={i}>
                    <img
                      title={p.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Rent */}
            {info.watchProviders && info.watchProviders.rent && (
              <div className="flex gap-5 items-start text-white">
                <h1 className="text-xl w-[10%]">Rent</h1>
                {info.watchProviders.rent.map((p, i) => (
                  <div key={i}>
                    <img
                      title={p.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Buy */}
            {info.watchProviders && info.watchProviders.buy && (
              <div className="flex gap-5 items-start text-white">
                <h1 className="text-xl w-[10%]">Buy</h1>
                {info.watchProviders.buy.map((p, i) => (
                  <div key={i}>
                    <img
                      title={p.provider_name}
                      className="w-[5vh] h-[5vh] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Seasons */}
        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
        <h1 className="text-3xl mt-10 mb-5 text-white font-semibold">
          Seasons
        </h1>
        <div className="w-[100%] h-[43vh] px-5 flex overflow-y-hidden">
          {info.detail.seasons.length > 0 ? (
            info.detail.seasons.map((item, index) => (
              <div
                key={index}
                className="relative min-w-[15%]  mr-5 rounded-xl overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
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
                <div className="absolute w-full h-[50%] flex items-end justify-center pb-10 bottom-0  text-blue-800 px-2 bg-gradient-to-t from-zinc-950 from-[40%]">
                  <h1 className=" text-3xl xl:text-4xl font-black mt-3">
                    {item.original_title ||
                      item.name ||
                      item.title ||
                      item.original_name}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div className="text-white font-black text-center text-2xl mt-10">
              No Data Available
            </div>
          )}
        </div>

        {/* Recommendations */}
        <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-400" />
        <h1 className="text-3xl mt-10 mb-5 text-white font-semibold">
          Recommendations & Similar
        </h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
        <Outlet />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default TvDetails;
