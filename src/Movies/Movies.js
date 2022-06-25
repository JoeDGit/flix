import React, { useEffect, useState } from "react";
import Nav from "../Home/Nav";
import MoviesCard from "./MoviesCard";

const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export default function Movies() {
  const [movies, setMovies] = useState({});
  const [endpoint, setEndpoint] = useState("now_playing");

  useEffect(() => {
    const fetchMovies = async () => {
      const item = await fetch(
        `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${api_key}&language=en-US&page=1`
      ).then((pageResponse) => pageResponse.json());
      setMovies(item);
    };
    fetchMovies();
  }, [endpoint]);

  const handleClick = (id) => {
    setEndpoint(id);
  };
  return (
    <React.Fragment>
      <Nav />
      <div className="w-100 flex">
        <div className="rounded  ml-2 p-2 flex ">
          <ul className="child:cursor-pointer flex flex-col mt-4  md:flex-start md:flex-row md:space-x-8 md:mt-0 md:text-medium md:font-medium ">
            <li>
              <a onClick={() => handleClick("now_playing")}>In cinemas</a>
            </li>
            <li>
              <a onClick={() => handleClick("latest")}>Latest</a>
            </li>
            <li>
              <a onClick={() => handleClick("popular")}>Most Popular</a>
            </li>
            <li>
              <a onClick={() => handleClick("top_rated")}>Highest Rated</a>
            </li>
          </ul>
        </div>
        <MoviesCard movies={movies} />
      </div>
    </React.Fragment>
  );
}
