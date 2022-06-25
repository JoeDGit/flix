import React from "react";

export default function MoviesCard(props) {
  const movies = props.movies.results
    ? props.movies.results.map((result) => {
        return {
          title: result.title,
          rating: result.vote_average,
          overview: result.overview,
          poster: result.poster_path,
          popularity: result.popularity,
        };
      })
    : null;

  return (
    <React.Fragment>
      {movies
        ? movies.map((result) => {
            <div
              className="container flex bg-contain bg-no-repeat mx-2 my-2 shrink-0
        shadow-2xl bg-[#9CA3AF] border-solid border-slate-400 rounded border-2
        md:mx-10 md:my-4"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w154${result.poster})`,
                height: "252px",
                width: "150px",
              }}
            >
              <div className="truncate justify-center self-end min-w-full font-medium">
                {result.title}
              </div>
              <div className="relative right-[140px] top-[10px] z-10 h-[25px] w-[50px] rounded  text-white font-medium text-sm px-1 bg-slate-400">
                <div className="relative top-[2.5px]">{result.rating}</div>
              </div>
            </div>;
          })
        : null}
    </React.Fragment>
  );
}
