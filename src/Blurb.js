import React, { useState, useEffect } from "react";

export default function Blurb(props) {
  const [finalBlurb, setFinalBlurb] = useState("");

  useEffect(() => {
    if (props.searchResult) {
      if (
        props.searchResult.overview &&
        props.searchResult.overview.length > 247
      ) {
        setFinalBlurb(props.searchResult.overview.slice(0, 250) + "...");
      } else if (props.searchResult.overview) {
        setFinalBlurb(props.searchResult.overview);
      }
    }
  }, [props.searchResult]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100px",
        maxHeight: "120px",
        minWidth: "200px",
        maxWidth: "400px",
        fontSize: "0.94rem",
        color: "white",
      }}
    >
      {finalBlurb}
    </div>
  );
}
