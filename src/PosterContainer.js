import React from "react";
import notFound from "./notFound.jpg";

export default function PosterContainer(props) {
  return (
    <div className="flex">
      <a
        className="mx-auto shrink-0 w-[300px] mt-2 mb-2 rounded-lg min-h-[450px] max-h-[450px]"
        href={`https://www.imdb.com/title/${props.searchResult.imdb_id}`}
        target="_blank"
        rel="noreferrer"
      >
        {props.resultHistory.length == 0 ? (
          <div className="text-center text-lg font-mono text-white p-4 mt-[8rem] bg-[#1F2937] rounded-lg h-[150px] w-[300px]">
            Can't figure out what to watch? Try the randomiser to find a title
            based on format and IMDb rating
          </div>
        ) : null}
        {!props.resultHistory.length == 0 ? (
          <img
            className="object-cover rounded-lg "
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
