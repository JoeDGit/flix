import React, { useState, useEffect } from "react";
import { callApi } from "./utils/callApi";
import Card from "./Card";
import { Result } from "postcss";

export default function UseCardLoad(props) {
  const [fetchCards, setFetchCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(props.value);

  useEffect(() => {
    Promise.all([callApi("movie", "popular"), callApi("tv", "popular")]).then(
      (result) => {
        const stateCopySorted = result.flat().sort(
          (x, y) => {
            return y[props] - x[props];
          },
          [props]
        );

        setFetchCards(stateCopySorted);
      }
    );
  });
  return fetchCards;
}
