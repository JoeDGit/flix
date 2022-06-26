import React, { useState, useEffect } from "react";
import { callApi } from "../utils/callApi";
import { callId } from "../utils/callId";

export default function UseRandomise({ mediaType, sliderValue }) {
  const [searchResult, setSearchResult] = useState({});
  const [resultHistory, setResultHistory] = useState([]);
  const [collectedProps, setCollectedProps] = useState();
  const [page, setpage] = useState("1");

  const pickRandomItem = (length) => Math.floor(Math.random() * length);

  useEffect(() => {
    //call api to check total number of page+s
    const fetchResult = async () => {
      const checkPages = callApi(
        mediaType,

        "discover",
        "&language=en-US&include_adult=false&include_video=false",
        "&page=1&",
        `vote_count.gte=1000&vote_average.gte=${sliderValue}`
      ).then((result) => {
        //choose a random page
        const pageCheck = pickRandomItem(result.total_pages);
        // ensure pagecheck doesn't return 0
        const pageAboveZero = pageCheck < 1 ? 1 : pageCheck;

        setpage(pageAboveZero);
      });
      //call api at the above random page, with specified rating and format.
      const callPage = await callApi(
        mediaType,
        "discover",

        "&language=en-US=false",
        `&page=${page}&`,
        `vote_count.gte=1000&vote_average.gte=${sliderValue}`
      ).then((response) => {
        //map over the result collecting an array of id's, then choose one at random
        const arrayOfIds = response.results.map((result) => result.id);
        const randomChoice = pickRandomItem(arrayOfIds.length);
        const selectedId = arrayOfIds[randomChoice];

        //add the id to history
        setResultHistory((prevstate) => [...prevstate, selectedId]);

        //call api endpoint at specific id

        const finalApiCall = callId(selectedId, mediaType);
        setSearchResult(finalApiCall);
      });
    };
    fetchResult();
  }, []);
  return searchResult;
}
