import React, { useState, useEffect } from "react";
import Carousel, { CarouselItem } from "./Carousel";
import Card from "../Card/Card";
import UseCardLoad from "../Card/UseCardLoad";
import { UseFetchCarousel } from "./UseFetchCarousel";
import star from "!file-loader!./star.svg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homeSort, setHomeSort] = useState("rating");
  const callCarousel = UseFetchCarousel();
  const callCards = UseCardLoad("rating");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, [loading]);

  return (
    <div className="Home">
      <Carousel>
        {callCarousel.map((item, index) => {
          return (
            <CarouselItem key={`Carousel-item-${index + 1}`}>
              <img
                className="object-cover"
                key={`img${index}`}
                style={{
                  width: `100%`,
                  height: "100%",
                  objectPosition: "center 15%",
                }}
                src={`http://image.tmdb.org/t/p/original${item.backdrop}`}
              ></img>
              <div className=" absolute flex flex-col  align-left   text-white bottom-7 w-1/2 xl:w-[639px] h-[8.5rem] bg-[#1f2937] border-solid border border-slate-200  rounded-lg opacity-80 px-2 pt-2 ">
                <div className=" basis-1/5 h-[1.5rem] truncate">
                  {item.title} ({item.releaseDate.slice(0, 4)})
                </div>
                <div className="basis-1/5 h-[1.5rem]">
                  Rating: {item.rating}
                  <img
                    className=" inline h-[12px] w-[12px] ml-1 mb-1 md:h-[15px] md:w-[15px] "
                    src={star}
                    alt="star"
                  ></img>
                </div>
                <div className=" truncate basis-3/5 max-h-[50px] text-[12px]  whitespace-normal ">
                  {item.overview}
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </Carousel>

      <div className="text-center text-2xl text-slate-200 mt-6 ">
        Popular Releases
      </div>

      <div className="container  flex flex-wrap justify-center min-w-full text-center mt-5 p-2">
        {callCards.map((result, index) => {
          return (
            <Card
              key={`Card-${index + 1}`}
              title={result.title}
              rating={result.rating}
              poster={result.poster}
              release={result.releaseDate.substr(0, 4)}
              type={result.type}
              imdbId={result.imdb_id}
              trailer={result.trailer}
              overview={result.overview}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
