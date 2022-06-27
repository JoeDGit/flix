import React from "react";
import notFound from "../assets/notFound.jpg";

export default function PosterContainer(props) {
  return (
    <div className=" justify-center items-center flex  md:h-[450px] md:w-[300px]">
      <a
        className=" md:relative md: left-12 mx-auto mt-2 mb-2 rounded-lg  md:min-h-[450px] md:max-h-[450px] "
        href={`https://www.imdb.com/title/${props.searchResult.imdb_id}`}
        target="_blank"
        rel="noreferrer"
      >
        {props.resultHistory.length == 0 ? (
          <div className="relative right-[45px] text-center text-lg font-mono text-white p-4 mt-[8rem] bg-[#1F2937] rounded-lg hidden md:block">
            Can't figure out what to watch? Try the randomiser to find a title
            based on format and IMDb rating
          </div>
        ) : null}
        {!props.resultHistory.length == 0 ? (
          <img
            className="object-cover transition-all duration-150 ease-in rounded-lg h-[337.5px] w-[225px] md:h-[450px] md:w-[300px] "
            src={
              props.searchResult.poster ? props.searchResult.poster : notFound
            }
            alt={props.searchResult.title}
            id="poster"
          ></img>
        ) : null}
      </a>
    </div>
  );
}
