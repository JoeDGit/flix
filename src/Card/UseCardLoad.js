import React, { useState, useEffect } from "react";
import { callApi } from "../utils/callApi";

export default function UseCardLoad(props) {
  const [fetchCards, setFetchCards] = useState([]);

  useEffect(() => {
    Promise.all([callApi("movie", "popular"), callApi("tv", "popular")]).then(
      (result) => {
        const sortedApiCall = result.flat().sort(
          (x, y) => {
            return y[props] - x[props];
          },
          [props]
        );

        setFetchCards(sortedApiCall);
      }
    );
  }, []);
  return fetchCards;
}
