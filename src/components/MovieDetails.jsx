import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, removemovie } from "../store/actions/movieAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const MovieDetails = () => {
  const { info } = useSelector((state) => state.movie);
  console.log(info);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMovieDetails(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);
  return info ? (
    <div
      
      className="text-white w-screen h-screen px-[10%]"
    >
      <nav className="w-full">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] mr-2 cursor-pointer ri-arrow-left-line"
        ></Link>
        <a href="">
          <i className="ri-global-line"></i>
        </a>
        <a href="">
          <i className="ri-external-link-fill"></i>
        </a>
        <a href=""></a>
        <a href=""></a>
      </nav>
    </div>
  ) : (
    <Loader />
  );
};

export default MovieDetails;
