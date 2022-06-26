//generates IMDb id from TMDb id using TMDb endpoint
import { generateImdbId } from "./generateImdbId";
const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const callId = async (id, mediaType) => {
  let {
    title,
    name,
    vote_average,
    overview,
    poster_path,
    release_date,
    first_air_date,
    imdb_id,
  } = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${api_key}&language=en-US`
  ).then((pageResponse) => pageResponse.json());
  return {
    title: title ? title : name,
    rating: vote_average,
    overview,
    poster: `http://image.tmdb.org/t/p/w300${poster_path}`,
    releaseDate: release_date ? release_date : first_air_date,
    imdb_id: imdb_id ? imdb_id : await generateImdbId(id, mediaType),
  };
};
