import React, { useEffect, useState } from "react";
import Nav from "../Home/Nav";
import Blurb from "./Blurb";
import Title from "../Home/Title";
import SearchButton from "./SearchButton";
import PosterContainer from "./PosterContainer";
import RatingSlider from "./RatingSlider";
import MediaTypeComponent from "./MediaTypeComponent";
import { callApi } from "../utils/callApi";
import { callId } from "../utils/callId";
import UseRandomise from "./UseRandomise";

import notFound from "../assets/notFound.jpg";

export const Randomiser = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [sliderValue, setSliderValue] = useState("6.8");
  const [searchResult, setSearchResult] = useState({});
  const [resultHistory, setResultHistory] = useState([]);
  const shallowHistoryState = Array.from(resultHistory).map((x) => x);

  const pickRandomItem = (length) => Math.floor(Math.random() * length);

  const value = UseRandomise({ mediaType, sliderValue, randomise: true });

  const handleSlideChange = (e) => {
    const rating = e.target.value;
    setSliderValue(rating);
  };

  const handleClick = (e) => {
    return value;
  };

  return (
    <div>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className=" flex ">
        <div className="pl-16 pr-16 pb-5 pt-4 shadow-2xl  max-w-25 flex flex-col rounded-lg h-full mx-auto">
          <div className="md:hidden text-white relative top-[30px] right-[40px]">
            <a href="/">Home</a>
          </div>

          <h3 className="text-2xl mb-2 font-mono text-white mx-auto">
            The Randomiser
          </h3>
          <MediaTypeComponent setMediaType={setMediaType} />

          <RatingSlider
            handleSlideChange={handleSlideChange}
            mediaType={mediaType}
            sliderValue={sliderValue}
            search={handleClick}
          />

          <PosterContainer
            searchResult={searchResult}
            resultHistory={resultHistory}
          />
          <SearchButton
            search={handleClick}
            mediaType={mediaType}
            sliderValue={sliderValue}
            searchResult={searchResult}
            resultHistory={resultHistory}
            setResultHistory={setResultHistory}
            setSearchResult={setSearchResult}
            callId={callId}
            shallowHistoryState={shallowHistoryState}
          />
          <Title searchResult={searchResult} />
          <Blurb searchResult={searchResult} />
        </div>
      </div>
    </div>
  );
};

export default Randomiser;
