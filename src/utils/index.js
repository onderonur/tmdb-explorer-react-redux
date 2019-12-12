import placeholderPng from "assets/placeholder.png";
import { BASE_IMG_API_URL } from "constants/urls";

export function getMovieReleaseYear(movie) {
  const date = movie?.release_date;

  if (!date) {
    return null;
  }

  const year = new Date(movie.release_date).getFullYear();
  return year;
}

export function getImageUrl(path, { original } = {}) {
  if (!path) {
    return placeholderPng;
  }

  return `${BASE_IMG_API_URL}/${original ? "original" : "w500"}${path}`;
}

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
