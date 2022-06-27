import React from "react";

export default function RatingSlider(props) {
  return (
    <div className=" text-lg flex justify-center align-center w-[100%] text-white ml-3 mt-1 md:mb-2">
      <div className="mr-4 mt-1">Rating</div>
      <input
        className="mr-4 min-w-[10rem]  h-5 md:h-3 mt-[0.7rem] bg-gray-200 rounded-lg appearance-none cursor-pointer  dark:bg-gray-700"
        type="range"
        min="0.0"
        max="10"
        defaultValue="6.8"
        step="0.1"
        onChange={props.handleSlideChange}
        onMouseUp={() => props.search(props.mediaType, props.sliderValue)}
      ></input>

      <div className="min-w-[3rem] mt-[0.3rem] ml-1">{props.sliderValue}</div>
    </div>
  );
}
