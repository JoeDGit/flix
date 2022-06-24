import { generateImdbId } from "./generateImdbId";
import { generateTrailer } from "./generateTrailer";
const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

// const type = ["movie", "tv"]
// query = [popular, now_playing, latest, top_rated]
// const language = "&language=en-US";
// const region = "&region=GB";
// const page = "&page=x"
// const sortBy = ["rating", "popularity", ]

export const callApi = async (
  type,
  query,
  language = "",
  page = "",
  region = "",
  sortBy
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${query}?api_key=${api_key}${language}${page}${region}`
  ).then((response) => response.json());
  const mappedResponse = await Promise.all(
    response.results.map(async (result) => {
      return {
        title: result.title ? result.title : result.name,
        rating: result.vote_average,
        overview: result.overview,
        poster: result.poster_path,
        popularity: result.popularity,
        imdb_id: result.imdb_id
          ? result.imdb_id
          : await generateImdbId(result.id, type),
        releaseDate: result.release_date
          ? result.release_date
          : result.first_air_date,
        type: type,
        trailer: await generateTrailer(result.id, type),
      };
    })
  ).catch((error) => console.log(error));

  if (mappedResponse && sortBy) {
    let checkSort = () => {
      switch (sortBy) {
        case "popularity":
          let popSorted = resultCopy.sort((x, y) => {
            return y.popularity - x.popularity;
          });
          setResults(popSorted);
          break;
        case "rating":
          let ratingSorted = resultCopy.sort((x, y) => {
            return y.rating - x.rating;
          });
          setResults(ratingSorted);
          break;
      }
    };
    checkSort();
  } else {
    return mappedResponse;
  }
};
