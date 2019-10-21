import placeholderPng from "assets/placeholder.png";
import { BASE_IMG_API_URL } from "constants/urls";

export function getMovieReleaseYear(movie) {
  const { release_date } = movie || {};
  return release_date ? new Date(movie.release_date).getFullYear() : null;
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
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;
  const cancelType = `${fetchType}_CANCELLED`;
  return { requestType, successType, errorType, cancelType };
}
