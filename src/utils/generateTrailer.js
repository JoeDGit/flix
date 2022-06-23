const api_key = "fd4e5f51938f96d0f16bfb76bed86942";

export const generateTrailer = async (id, type) => {
  let trailerFetch = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${api_key}`
  );
  let trailerFetchJson = await trailerFetch.json();
  let trailerResults = trailerFetchJson.results;

  let trailerId = await trailerResults
    .filter((result) => {
      if (result.site == "YouTube") {
        return result.key;
      }
    })
    .map((x) => x.key);
  const trailerPath = `https://www.youtube.com/watch?v=${trailerId[0]}`;

  return trailerPath;
};
