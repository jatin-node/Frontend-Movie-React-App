import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TvShows from "./components/TvShows";
import People from "./components/People";
import MovieDetails from "././components/movieDetails";
import TvDetails from "./components/tvDetails";
import PersonDetails from "./components/personDetails";
import Trailer from "./components/templates/Trailer";
import SideNav from "./components/templates/SideNav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen bg-[#0F1014] flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/Details/:id" element={<MovieDetails />}>
            <Route path="/movie/Details/:id/trailer" element={<Trailer />} />
          </Route>

          <Route path="/tvShows" element={<TvShows />} />
          <Route path="/tv/Details/:id" element={<TvDetails />}>
            <Route path="/tv/Details/:id/trailer" element={<Trailer />} />
          </Route>

          <Route path="/people" element={<People />} />
          <Route path="/people/Details/:id" element={<PersonDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
