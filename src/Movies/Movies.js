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
    const fetchMovies = async (props) => {
      Promise.all([
        callApi("movie", "popular"),
        callApi("movie", "popular", "&language=en-US", "&page=2"),
        callApi("movie", "popular", "&language=en-US", "&page=3"),
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

  const handleClick = (id) => {
    setEndpoint(id);
  };

  return (
    <React.Fragment>
      <Nav />

      <div className="w-100 flex justify-center items-center ">
        <div className="  ">
          <ul className="child:ring-2 child:rounded text-white child:cursor-pointer flex flex-col mt-4  md:flex-start md:flex-row md:space-x-8 md:mt-0 md:text-medium md:font-medium ">
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
      </div>
      {isLoading ? (
        <MovieLoader />
      ) : (
        <div className="container  flex flex-wrap justify-center min-w-full text-center mt-5 p-2">
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
