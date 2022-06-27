import React from "react";

export default function MovieLoader() {
  let circleCommonClasses =
    "flex bg-white items-center h-[10px] w-[10px] rounded-full ";

  return (
    <div className="relative right-[57px] child:mt-[9rem] justify-center align-center basis h-full flex w-100">
      <div className="relative bottom-[50px] left-[75px] text-white text-3xl">
        Loading
      </div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}
