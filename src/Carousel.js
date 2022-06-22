import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "./Carousel.css";
import { generateImdbId } from "./Randomiser";

const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const UseFetchCarousel = () => {
  const [fetchCarousel, setFetchCarousel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response =
        await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1&region=GB
  `).then((pageResponse) => pageResponse.json());

      const carouselMovies = await Promise.all(
        response.results
          .map(async (result) => {
            return {
              title: result.title,
              rating: result.vote_average,
              overview: result.overview,
              backdrop: result.backdrop_path,
              popularity: result.popularity,
              imdb_id: result.imdb_id
                ? result.imdb_id
                : await generateImdbId(result.id, "movie"),
              releaseDate: result.release_date
                ? result.release_date
                : result.first_air_date,
            };
          })
          .slice(0, 8)
      );
      setFetchCarousel(carouselMovies);
    };
    fetchData();
  }, []);
  return fetchCarousel;
};
export const CarouselItem = ({ children, width }) => {
  return (
    <div
      className="carousel-item inline-flex h-[300px] align-center justify-center shrink-0  "
      style={{ width: width, height: "100%" }}
    >
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 10000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div {...handlers} className="carousel">
      <div
        className="inner"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          height: "26rem",
        }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators mt-4">
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
