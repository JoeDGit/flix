import React, { useEffect, useState } from "react";
import Blurb from "./Blurb";
import Title from "./Title";
import SearchButton from "./SearchButton";
import PosterContainer from "./PosterContainer";
import RatingSlider from "./RatingSlider";
import MediaTypeComponent from "./MediaTypeComponent";
import { callId } from "../utils/callId";

const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const Randomiser = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [sliderValue, setSliderValue] = useState("6.8");
  const [searchResult, setSearchResult] = useState({});
  const [resultHistory, setResultHistory] = useState([]);
  const shallowHistoryState = Array.from(resultHistory).map((x) => x);

  //generates IMDb id from TMDb id using TMDb endpoint

  const handleSlideChange = (e) => {
    const rating = e.target.value;
    setSliderValue(rating);
  };

  const search = (type, rating) => {
    const pickRandomItem = (length) => Math.floor(Math.random() * length);

    const fetchData = async () => {
      //call api to check total number of pages
      const checkPages = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=en-US&vote_count.gte=1000&vote_average.gte=${rating}`
      ).then((pageResponse) => pageResponse.json());
      //choose a random page
      const pageCheck = pickRandomItem(checkPages.total_pages);
      // ensure pagecheck doesn't return 0
      const page = pageCheck < 1 ? 1 : pageCheck;
      //call api at the above random page, with specified rating and format.
      const callPage = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=en-US&page=${page}&vote_average.gte=${rating}`
      ).then((pageResponse) => pageResponse.json());
      //map over the result collecting an array of id's, then choose one at random
      const arrayOfIds = callPage.results.map((result) => result.id);
      const randomChoice = pickRandomItem(arrayOfIds.length);
      const selectedId = arrayOfIds[randomChoice];

      //add the id to history
      setResultHistory((prevstate) => [...prevstate, selectedId]);

      //call api endpoint at specific id

      const finalApiCall = await callId(selectedId, mediaType);

      setSearchResult(finalApiCall);
    };
    fetchData();
  };

  return (
    <div>
      <div className="flex max-w-screen">
        <div className=" md:pt-4 flex flex-col rounded-lg   mx-auto">
          <h3 className="hidden sm:block text-2xl mb-2 font-mono text-white mx-auto">
            The Randomiser
          </h3>
          <MediaTypeComponent setMediaType={setMediaType} />

          <RatingSlider
            handleSlideChange={handleSlideChange}
            mediaType={mediaType}
            sliderValue={sliderValue}
            search={search}
          />

          <PosterContainer
            searchResult={searchResult}
            resultHistory={resultHistory}
          />
          <SearchButton
            search={search}
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
