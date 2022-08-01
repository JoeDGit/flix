import { useEffect, useState } from "react";

const api_key = process.env.REACT_APP_API_KEY;

export const generateTrailer = async (id, type = "movie") => {
  let trailerFetch = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}`
  );

  let trailerFetchJson = await trailerFetch.json();
  let trailerResults = trailerFetchJson.results;

  let trailerId = await trailerResults
    .filter((result) => {
      if (result.site == "YouTube") {
        return result.key;
      }
    })
    .map((x) => x.key);
  let trailer = `https://www.youtube.com/watch?v=${trailerId[0]}`;

  return trailer;
};
