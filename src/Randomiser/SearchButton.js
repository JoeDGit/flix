import React from "react";

export default function SearchButton(props) {
  const handlePrevious = async () => {
    const previousSearchResult =
      props.resultHistory[props.resultHistory.length - 2];

    const prevApiCall = await props.callId(
      previousSearchResult,
      props.mediaType
    );

    props.setSearchResult(prevApiCall);
    props.shallowHistoryState.pop();
    props.setResultHistory(props.shallowHistoryState);
  };

  return (
    <div className="flex gap-3 justify-center ">
      <button
        className="order-2 basis-[40%] text-white p-2 rounded-lg bg-[#374151]  hover:animate-pulse border-box hover:ring-1 transition-all ring-white md:w-48   mt-3 duration-75 "
        onClick={() => props.search(props.mediaType, props.sliderValue)}
      >
        {props.searchResult.title ? "Next!" : "Find Me Something to Watch!"}
      </button>
      {props.resultHistory.length > 1 && (
        <button
          onClick={() => handlePrevious()}
          className=" text-white p-2 basis-[40%] rounded-lg bg-[#374151]  hover:animate-pulse border-box hover:ring-1 transition-all ring-white md:w-48 mt-3 duration-75"
        >
          Previous
        </button>
      )}
    </div>
  );
}
