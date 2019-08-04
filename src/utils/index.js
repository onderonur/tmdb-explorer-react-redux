import axios from "axios";
import placeholderPng from "assets/placeholder.png";
import { BASE_API_URL, BASE_IMG_API_URL } from "constants/urls";

const api_key = process.env.REACT_APP_API_KEY;

function addApiKeyToQueryParams(params = {}) {
  return {
    ...params,
    api_key
  };
}

export function get(endpoint, params) {
  return axios.get(`${BASE_API_URL}${endpoint}`, {
    params: addApiKeyToQueryParams(params)
  });
}

export function getMovieReleaseYear(movie) {
  return new Date(movie.release_date).getFullYear();
}

export function getImageUrl(path) {
  if (!path) {
    return placeholderPng;
  }

  return `${BASE_IMG_API_URL}/w500${path}`;
}

export function getImdbProfileUrl(imdbId) {
  return `https://www.imdb.com/title/${imdbId}`;
}

export function addStateToLocation(to, state) {
  let toObject;

  if (typeof to === "string") {
    const { pathname, search } = splitPathnameAndQueryString(to);
    toObject = {
      pathname,
      search
    };
  } else {
    toObject = to;
  }

  return {
    ...toObject,
    state: { ...toObject.state, state }
  };
}

export function splitPathnameAndQueryString(path) {
  const [pathname, search] = path.split("?");
  return {
    pathname,
    search: search ? `?${search}` : ""
  };
}
