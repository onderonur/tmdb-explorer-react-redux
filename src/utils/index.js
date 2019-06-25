import axios from "axios";

export const BASE_API_URL = "//api.themoviedb.org/3";
export const BASE_IMG_API = "//image.tmdb.org/t/p";

const api_key = process.env.REACT_APP_API_KEY;

function createQueryParams(params = {}) {
  return {
    ...params,
    api_key
  };
}

export function get(endpoint, params) {
  return axios.get(`${BASE_API_URL}${endpoint}`, {
    params: createQueryParams(params)
  });
}

export function getMovieReleaseYear(movie) {
  return new Date(movie.release_date).getFullYear();
}

export function getImageUrl(path) {
  if (!path) {
    // TODO: Fallback bir image döndürülebilir.
    return null;
  }

  return `${BASE_IMG_API}/w500${path}`;
}
