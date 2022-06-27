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
    <div className="flex  text-center md:text-left min-h-[100px] min-w-[200px] max-w-[400px]  text-white text-sm">
      {finalBlurb}
    </div>
  );
}
