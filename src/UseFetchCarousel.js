import { useState, useEffect } from "react";
import { callApi } from "./utils/callApi";

export const UseFetchCarousel = () => {
  const [fetchCarousel, setFetchCarousel] = useState([]);
  useEffect(() => {
    callApi("movie", "now_playing").then(
      (result) => {
        const slicedResult = result.slice(0, 8);

        setFetchCarousel(slicedResult);
      },
      [fetchCarousel]
    );
  }, []);
  return fetchCarousel;
};
