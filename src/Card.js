import React, { useState, useEffect } from "react";
const api_key = "fd4e5f51938f96d0f16bfb76bed86942";
import star from "!file-loader!./star.svg";
import notFound from "./notFound.jpg";
import { generateImdbId, generateTrailer } from "./Randomiser";
import InfoModal from "./InfoModal";

import "./cardFlip.css";
import tv from "!file-loader!./tv.svg";
import movie from "!file-loader!./movie.svg";
import info from "!file-loader!./info.svg";
import imdb from "!file-loader!./imdb.svg";
import yt from "!file-loader!./yt.svg";

// const Card = ({ title, rating, poster, link }) => {
//   return (
//     <div
//       className="container flex bg-contain bg-no-repeat mx-2 my-2 shrink-0 shadow-2xl bg-[#9CA3AF] border-solid border-slate-400 rounded border-2  md:mx-10 md:my-4"
//       style={{
//         backgroundImage: poster
//           ? `url(https://image.tmdb.org/t/p/w154${poster})`
//           : `url(${notFound})`,
//         height: "252px",
//         width: "150px",
//       }}
//     >
//       <div className="truncate justify-center self-end min-w-full font-medium">
//         {title}
//       </div>
//       <div className="relative right-[140px] top-[10px] z-10 h-[25px] w-[50px] rounded  text-white font-medium text-sm px-1 bg-slate-400">
//         <div className="relative top-[2.5px]">{rating}</div>
//       </div>
//     </div>
//   );
// };

const Card = ({ title, rating, poster, release, type, imdbId, trailer }) => {
  return (
    <div className="container flex  mx-2 my-2 shrink-0 rounded   bordershadow-xl md:mx-10 md:my-4 flip-card">
      <div className="flip-card-inner">
        <div
          className="flip-card-front container flex bg-contain bg-no-repeat  shrink-0   rounded  "
          style={{
            backgroundImage: poster
              ? `url(https://image.tmdb.org/t/p/w154${poster})`
              : `url(${notFound})`,
            height: "252px",
            width: "150px",
          }}
        >
          <div className="absolute w-full p-1 pt-2 ">
            <div className="py-1 px-1.5 pr-3 absolute items-center flex justify-between  w-full h-[30px]">
              <div className=" bg-[#1F2937] rounded p-1 leading-none text-white  opacity-90 ">
                {release}
              </div>

              <div className=" p-1.5 bg-[#1F2937] border-box rounded opacity-90 ">
                <img
                  src={type === "tv" ? tv : movie}
                  height="12px"
                  width="12px"
                  alt="star"
                ></img>
              </div>
            </div>

            <div className="text-white top-[12rem] bg-[#1F2937]  gap-1 px-1.5  absolute items-center flex rounded w-[40px] h-[20px]">
              <div className="basis-2/3 leading-none"> {rating} </div>
              <div className="basis-1/3">
                <img src={star} height="10px" width="12px" alt="star"></img>
              </div>
            </div>

            <div
              className="absolute top-[14.3rem] left-[0.5px] w-full text-white h-[20px]"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </div>
          </div>
        </div>

        <div className="flip-card-back space-between flex-col text-white flex align-center shrink-0  text-center  border-solid border-slate-400 rounded border overflow-hidden ">
          <div
            className="absolute   bg-contain bg-no-repeat"
            style={{
              backgroundImage: poster
                ? `url(https://image.tmdb.org/t/p/w154${poster})`
                : `url(${notFound})`,
              height: "252px",
              width: "150px",
              opacity: "30%",
            }}
          ></div>
          <div className="relative flex   justify-center grow text-[20px]  w-[150px] mt-1 whitespace-normal">
            {title}
          </div>
          <div className="relative mt-2 ">{release}</div>
          <div className="relative bottom-[50px]  mx-auto ">
            <img src={info} height="30px" width="30px"></img>
          </div>
          <div className="relative bottom-[15px] flex items-center align-center mt-1 flex-center w-full">
            <div>
              <a href={imdbId} target="_blank">
                <div
                  className="ml-4 mr-5 h-[30px] w-[50px] bg-contain bg-no-repeat "
                  style={{ backgroundImage: `url(${imdb}` }}
                ></div>
              </a>
            </div>
            <div>
              <a href={trailer} target="_blank">
                <div
                  className="mb-1 h-[38px] w-[80px] bg-contain bg-no-repeat "
                  style={{ backgroundImage: `url(${yt}` }}
                ></div>
              </a>
            </div>
          </div>
          <div className="relative bottom-[4px] flex items-center justify-center w-full gap-1">
            <div>Rated: {rating}</div>
            <div>
              <img src={star} height="10px" width="12px" alt="star"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UseFetchCards = () => {
  const [fetchCards, setFetchCards] = useState([]);
  const stateCopy = [...fetchCards];
  const stateCopySorted = stateCopy.sort((x, y) => {
    return y.popularity - x.popularity;
  });

  useEffect(() => {
    const fetchMovies = async () => {
      const response =
        await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1&region=GB
  `).then((pageResponse) => pageResponse.json());

      const cards = await Promise.all(
        response.results
          .map(async (result) => {
            return {
              title: result.title,
              rating: result.vote_average,
              overview: result.overview,
              poster: result.poster_path,
              popularity: result.popularity,
              imdb_id: result.imdb_id
                ? result.imdb_id
                : await generateImdbId(result.id, "movie"),
              releaseDate: result.release_date
                ? result.release_date
                : result.first_air_date,
              type: "movie",
              trailer: await generateTrailer(result.id, "movie"),
            };
          })
          .slice(0, 12)
      );

      setFetchCards(cards);
    };
    const fetchTv = async () => {
      const responseTv =
        await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US
  `).then((pageResponse) => pageResponse.json());
      const cardsTv = await Promise.all(
        responseTv.results
          .map(async (result) => {
            return {
              title: result.name,
              rating: result.vote_average,
              overview: result.overview,
              poster: result.poster_path,
              popularity: result.popularity,
              imdb_id: result.imdb_id
                ? result.imdb_id
                : await generateImdbId(result.id, "tv"),
              releaseDate: result.release_date
                ? result.release_date
                : result.first_air_date,
              type: "tv",
              trailer: await generateTrailer(result.id, "tv"),
            };
          })
          .slice(0, 12)
      );
      setFetchCards((prevState) => [...prevState, ...cardsTv]);
    };
    fetchMovies();
    fetchTv();
  }, []);

  return stateCopySorted;
};

export default Card;