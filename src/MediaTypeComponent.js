import React from "react";

export default function MediaTypeComponent(props) {
  return (
    <div
      className=" text-lg flex justify-center ml-9 mb-2 accent-slate-200 text-white"
      id="mediaChoice"
    >
      <label className="mr-3" id="mediaSelectLabel">
        <input
          type="radio"
          onClick={() => props.setMediaType("movie")}
          id="movie"
          name="mediaType"
          value="movie"
          className=""
          defaultChecked
        ></input>
        <label className="mx-2" htmlFor="movie">
          Movie
        </label>
        <input
          type="radio"
          onClick={() => props.setMediaType("tv")}
          id="tv"
          name="mediaType"
          value="tv"
        ></input>
        <label className="mx-2" htmlFor="tv">
          TV Show
        </label>
      </label>
    </div>
  );
}
