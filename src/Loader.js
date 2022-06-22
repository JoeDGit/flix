import React from "react";

export default function Loader() {
  let circleCommonClasses = "flex bg-[#6B7280] h-[14px] w-[14px] rounded-full ";

  return (
    <div className="child:mt-[9rem] basis h-[20rem] flex w-100">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}
