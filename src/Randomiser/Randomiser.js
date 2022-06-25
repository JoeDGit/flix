import React, { useEffect, useState } from "react";
import Nav from "../Home/Nav";
import Blurb from "./Blurb";
import Title from "../Home/Title";
import SearchButton from "./SearchButton";
import PosterContainer from "./PosterContainer";
import RatingSlider from "./RatingSlider";
import MediaTypeComponent from "./MediaTypeComponent";
import { generateImdbId } from "../utils/generateImdbId";

import notFound from "../assets/notFound.jpg";

const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const Randomiser = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [sliderValue, setSliderValue] = useState("6.8");
  const [searchResult, setSearchResult] = useState({});
  const [resultHistory, setResultHistory] = useState([]);
  const shallowHistoryState = Array.from(resultHistory).map((x) => x);

  //generates IMDb id from TMDb id using TMDb endpoint

  const callId = async (id) => {
    let {
      title,
      name,
      vote_average,
      overview,
      poster_path,
      release_date,
      first_air_date,
      imdb_id,
    } = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${api_key}&language=en-US`
    ).then((pageResponse) => pageResponse.json());
    return {
      title: title ? title : name,
      rating: vote_average,
      overview,
      poster: `http://image.tmdb.org/t/p/w300${poster_path}`,
      releaseDate: release_date ? release_date : first_air_date,
      imdb_id: imdb_id ? imdb_id : await generateImdbId(id, mediaType),
    };
  };

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

      const finalApiCall = await callId(selectedId);

      setSearchResult(finalApiCall);
    };
    fetchData();
  };

  return (
    <div>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className=" flex ">
        <div className="pl-16 pr-16 pb-5 pt-4 shadow-2xl  max-w-25 flex flex-col rounded-lg h-full mx-auto">
          <h3 className="text-2xl mb-2 font-mono text-white mx-auto">
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
