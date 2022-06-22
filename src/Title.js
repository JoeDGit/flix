import React from "react";
import star from "!file-loader!./star.svg";

export default function Title(props) {
  return (
    props.searchResult.title && (
      <div className="flex flex-col mt-2 text-white min-w-[24rem] max-w-[24rem] ">
        <div className="mb-1 font-bold truncate">
          {props.searchResult.title}
          {props.searchResult.releaseDate &&
            ` (${props.searchResult.releaseDate.substr(0, 4)})`}
        </div>
        <div className="font-bold">
          Rating: {props.searchResult.rating}
          <img
            className="inline ml-2 mb-2"
            width="18"
            height="18"
            src={star}
            alt="Star"
          ></img>
        </div>
      </div>
    )
  );
}
