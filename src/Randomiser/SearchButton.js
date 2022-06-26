import React from "react";
import UseRandomise from "./UseRandomise";

export default function SearchButton(props) {
  const handlePrevious = async () => {
    const previousSearchResult =
      props.resultHistory[props.resultHistory.length - 2];
    const prevApiCall = await props.callId(previousSearchResult);
    props.setSearchResult(prevApiCall);
    props.shallowHistoryState.pop();
    props.setResultHistory(props.shallowHistoryState);
  };

  return (
    <div className="flex mw-6">
      <button
        className="order-2 text-white p-2 rounded-lg bg-[#374151] hover:animate-pulse border-box hover:ring-1 transition-all ring-white w-48 mx-auto mt-3 duration-75"
        onClick={() => props.search()}
      >
        {props.searchResult.title ? "Next!" : "Find Me Something to Watch!"}
      </button>
      {props.resultHistory.length > 1 && (
        <button
          onClick={() => handlePrevious()}
          className=" text-white p-2 rounded-lg bg-[#374151] hover:animate-pulse border-box hover:ring-1 transition-all ring-white w-48 mx-auto mt-3 duration-75"
        >
          Previous
        </button>
      )}
    </div>
  );
}
