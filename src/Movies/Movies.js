import React, { useEffect, useState } from "react";
import { callApi } from "../utils/callApi";
import Nav from "../Home/Nav";
import Card from "../Card/Card";
import MovieLoader from "./MovieLoader";

export default function Movies() {
  const [movies, setMovies] = useState();
  const [endpoint, setEndpoint] = useState("now_playing");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovies = async (props) => {
      Promise.all([
        callApi("movie", endpoint),
        callApi("movie", endpoint, "&language=en-US", "&page=2"),
        callApi("movie", endpoint, "&language=en-US", "&page=3"),
      ]).then((result) => {
        const sortedApiCall = result.flat().sort(
          (x, y) => {
            return y[props] - x[props];
          },
          [props]
        );
        setMovies(sortedApiCall);
        setIsLoading(false);
      });
    };
    fetchMovies("rating");
  }, [endpoint]);

  const handleClick = (input) => {
    setEndpoint(input);
  };

  const activeLink =
    "active:text-white border-[1px] text-white border-slate-400 bg-[#1f2937] p-1 rounded-sm";
  const normalLink =
    "bg-slate-400 p-1 rounded-md border-[1px] border-transparent p-1 hover:border-[1px] hover:text-white hover:border-slate-400 hover:bg-[#1f2937] text-[#1f2937] cursor-pointer transition-all durations-300 ease-linear text-sm ";

  return (
    <React.Fragment>
      <Nav />

      <div className="w-100 flex justify-center items-center ">
        <ul className="gap-6 flex mt-4  ">
          <li>
            <a
              className={endpoint === "now_playing" ? activeLink : normalLink}
              onClick={() => handleClick("now_playing")}
            >
              In cinemas
            </a>
          </li>
          <li>
            <a
              className={endpoint === "upcoming" ? activeLink : normalLink}
              onClick={() => handleClick("upcoming")}
            >
              Upcoming
            </a>
          </li>
          <li>
            <a
              className={endpoint === "popular" ? activeLink : normalLink}
              onClick={() => handleClick("popular")}
            >
              Most Popular
            </a>
          </li>
          <li>
            <a
              className={endpoint === "top_rated" ? activeLink : normalLink}
              onClick={() => handleClick("top_rated")}
            >
              Highest Rated
            </a>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <MovieLoader />
      ) : (
        <div className="container  flex flex-wrap justify-center min-w-full text-center mt-1 p-2">
          {movies.map((result, index) => {
            return (
              <Card
                key={`Card-${index + 1}`}
                title={result.title}
                rating={result.rating}
                poster={result.poster}
                release={result.releaseDate.substr(0, 4)}
                type={result.type}
                imdbId={result.imdb_id}
                trailer={result.trailer}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}
