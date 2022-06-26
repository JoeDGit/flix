import { useEffect, useState } from "react";

const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const generateTrailer = async (id, type = "movie") => {
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    let trailerFetch = fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}`
    ).then((response) => response.json());
    let trailerFetchJson = trailerFetch.json();
    let trailerResults = trailerFetchJson.results;

    let trailerId = trailerResults
      .filter((result) => {
        if (result.site == "YouTube") {
          return result.key;
        }
      })
      .map((x) => x.key);
    setTrailer(`https://www.youtube.com/watch?v=${trailerId[0]}`);
  }, [trailer]);

  return trailer;
};
