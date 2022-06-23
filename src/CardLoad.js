import React, { useState, useEffect } from "react";
import { callApi } from "./utils/callApi";
import Card from "./Card";

export default function CardLoad() {
  const [fetchCards, setFetchCards] = useState({});
  const stateCopy = { ...fetchCards };
  // const stateCopySorted = stateCopy.sort((x, y) => {
  //   return y.popularity - x.popularity;
  // });

  const callMovies = callApi("movie", "popular");
  console.log(callMovies);

  return (
    <React.Fragment>
      {stateCopy.map((props, index) => {
        return (
          <Card
            key={`Card-${index + 1}`}
            title={props.title}
            rating={props.rating}
            poster={props.poster}
            release={props.releaseDate.substr(0, 4)}
            type={props.type}
            imdbId={props.imdb_id}
            trailer={props.trailer}
          />
        );
      })}
    </React.Fragment>
  );
}
