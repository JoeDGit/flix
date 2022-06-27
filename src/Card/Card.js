import React, { useState } from "react";
import Tippy from "@tippyjs/react";

import "./cardFlip.css";
import star from "!file-loader!../assets/star.svg";
import notFound from "../assets/notFound.jpg";

import tv from "!file-loader!../assets/tv.svg";
import movie from "!file-loader!../assets/movie.svg";
import info from "!file-loader!../assets/info.svg";
import imdb from "!file-loader!../assets/imdb.svg";
import yt from "!file-loader!../assets/yt.svg";

const Card = ({
  title,
  rating,
  poster,
  release,
  type,
  imdbId,
  trailer,
  overview,
}) => {
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
              <div className=" bg-[#1F2937] rounded p-1 leading-none text-white  opa/assetscity-90 ">
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
          <div className=" toolTipTarget relative mt-2 ">{release}</div>
          <Tippy
            className="bg-[#1F2937] text-sm text-white rounded p-2 border-[1px] border-solid border-slate-400"
            content={overview}
          >
            <div className=" relative bottom-[50px]  mx-auto ">
              <img src={info} height="30px" width="30px"></img>
            </div>
          </Tippy>
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

export default Card;
