const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const generateImdbId = async (id, type = "movie") => {
  let imdbFetch = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${api_key}&language=en-US`
  );

  let imdbFetchJson = await imdbFetch.json();

  let imdbId = `https://www.imdb.com/title/${imdbFetchJson.imdb_id}`;

  return imdbId;
};
