import React from "react";
import Card from "./Card";

export default function CardLoad(props) {
  return (
    <React.Fragment>
      {props.cardLoad.map((props, index) => {
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
