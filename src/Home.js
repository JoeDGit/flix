import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Carousel, { CarouselItem, UseFetchCarousel } from "./Carousel";
import star from "!file-loader!./star.svg";
import Card from "./Card";
import Loader from "./Loader";
import CardLoad from "./CardLoad";
import InfoModal from "./InfoModal";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const callCarousel = UseFetchCarousel();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="Home">
      <Nav />
      <InfoModal />

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
              <div className=" absolute  text-white bottom-7 max-w-1/2 h-[8.5rem] bg-[#1f2937] border-solid border border-slate-200 rounded-lg opacity-80 px-2 py-2">
                <div className="flex flex-row ml-2 align-left flex-wrap">
                  <div className=" h-[1.5rem]">
                    {item.title} ({item.releaseDate.slice(0, 4)})
                    <div className="h-[1.5rem]">
                      Rating: {item.rating}
                      <img
                        className=" inline h-[12px] w-[12px] ml-1 mb-1 md:h-[15px] md:w-[15px] "
                        src={star}
                        alt="star"
                      ></img>
                    </div>
                    <p className="pb-2 truncate text-[12px] w-[38rem] whitespace-normal ">
                      {item.overview}
                    </p>
                  </div>
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
        {loading ? <Loader /> : <CardLoad />}
      </div>
    </div>
  );
};

export default Home;
