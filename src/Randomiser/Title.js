import React from "react";
import star from "!file-loader!./star.svg";

export default function Title(props) {
  const rating =
    String(props.searchResult.rating).length < 3
      ? String(props.searchResult.rating)
      : String(props.searchResult.rating).substring(0, 3);

  return (
    props.searchResult.title && (
      <div className="flex flex-col mt-2 text-white min-w-[24rem] max-w-[24rem] ">
        <div className="mb-1 font-bold truncate text-center md:text-left">
          {props.searchResult.title}
          {props.searchResult.releaseDate &&
            ` (${props.searchResult.releaseDate.substr(0, 4)})`}
        </div>
        <div className="font-bold text-center md:text-left">
          Rating: {rating}
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
