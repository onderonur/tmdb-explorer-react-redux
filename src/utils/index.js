import { BASE_API_URL } from "constants/urls";
import queryString from "query-string";

export function getMovieReleaseYear(movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

const api_key = process.env.REACT_APP_API_KEY;

export const createUrl = (endpoint, params = {}) =>
  `${BASE_API_URL}${endpoint}?${queryString.stringify({
    ...params,
    api_key
  })}`;

export function getImdbProfileUrl(imdbId) {
  return `https://www.imdb.com/title/${imdbId}`;
}

export function getFetchTypes(fetchType) {
  const requestType = `${fetchType}/requested`;
  const successType = `${fetchType}/succeeded`;
  const errorType = `${fetchType}/failed`;
  const cancelType = `${fetchType}/cancelled`;
  return { requestType, successType, errorType, cancelType };
}

// Checking cached data to see if it exists and has all the required fields
export const verifyCachedData = (cachedData, requiredFields = []) => {
  if (!cachedData) {
    return false;
  }

  return requiredFields.every(key => cachedData.hasOwnProperty(key));
};
