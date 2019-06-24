import {
  selectMovieById,
  selectMovieCreditsByMovieId,
  selectCreditsOfPerson,
  selectPersonById,
  selectMovieVideos,
  selectMovieRecommendations
} from "reducers/entities";
import * as schemas from "schemas";
import { get } from "utils";

// TODO: image url'i function'la filan oku. Copy-paste'leri düzelt.
export const BASE_IMG_API = "//image.tmdb.org/t/p";

export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER };
}

export const FETCH_POPULAR_MOVIES_REQUEST = "FETCH_POPULAR_MOVIES_REQUEST";
export const FETCH_POPULAR_MOVIES_SUCCESS = "FETCH_POPULAR_MOVIES_SUCCESS";
export const FETCH_POPULAR_MOVIES_ERROR = "FETCH_POPULAR_MOVIES_ERROR";

// Without callAPIMiddleware
// function fetchPopularMoviesRequest() {
//   return {
//     type: FETCH_POPULAR_MOVIES_REQUEST
//   };
// }

// function fetchPopularMoviesSuccess(movies) {
//   return {
//     type: FETCH_POPULAR_MOVIES_SUCCESS,
//     movies
//   };
// }

// function fetchPopularMoviesError(error) {
//   return {
//     type: FETCH_POPULAR_MOVIES_ERROR,
//     error
//   };
// }

// This is an "async action creator"
// export function fetchPopularMovies(page) {
//   return function(dispatch, getState) {
//     const state = getState();
//     if (selectPopularMoviesByPage(page)(state)) {
//       // There is cached data! Don't do anything.
//       return;
//     }

//     dispatch(fetchPopularMoviesRequest());

//     axios
//       .get(`${BASE_API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
//       .then(response => {
//         const movies = response.data;
//         dispatch(fetchPopularMoviesSuccess(movies));
//       })
//       .catch(error => {
//         dispatch(fetchPopularMoviesError(error));
//       });
//   };
// }

// With callAPIMiddleware
// This is an "async action creator"
export function fetchPopularMovies(pageId) {
  return {
    types: [
      FETCH_POPULAR_MOVIES_REQUEST,
      FETCH_POPULAR_MOVIES_SUCCESS,
      FETCH_POPULAR_MOVIES_ERROR
    ],
    callAPI: () =>
      get("/movie/popular", {
        page: pageId
      }),
    payload: { pageId },
    schema: { results: [schemas.movieSchema] }
  };
}

// Checking cached data to see if it has all the required fields
function checkRequiredFields(cachedData, requiredFields) {
  return requiredFields.every(key => cachedData.hasOwnProperty(key));
}

export const FETCH_MOVIE_REQUEST = "FETCH_MOVIE_REQUEST";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_MOVIE_ERROR = "FETCH_MOVIE_ERROR";

export function fetchMovie(movieId, requiredFields = []) {
  return {
    types: [FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR],
    shouldCallAPI: state => {
      const movie = selectMovieById(state, movieId);
      return !movie || !checkRequiredFields(movie, requiredFields);
    },
    callAPI: () => get(`/movie/${movieId}`),
    schema: schemas.movieSchema,
    payload: { movieId }
  };
}

export const FETCH_MOVIE_RECOMMENDATIONS_REQUEST =
  "FETCH_MOVIE_RECOMMENDATIONS_REQUEST";
export const FETCH_MOVIE_RECOMMENDATIONS_SUCCESS =
  "FETCH_MOVIE_RECOMMENDATIONS_SUCCESS";
export const FETCH_MOVIE_RECOMMENDATIONS_ERROR =
  "FETCH_MOVIE_RECOMMENDATIONS_ERROR";

export function fetchRecommendations(movieId) {
  return {
    types: [
      FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ],
    shouldCallAPI: state => !selectMovieRecommendations(state, movieId),
    callAPI: () => get(`/movie/${movieId}/recommendations`),
    processResponse: data => ({ ...data, movieId }),
    schema: schemas.movieRecommendationSchema,
    payload: { movieId }
  };
}

export const FETCH_GENRES_REQUEST = "FETCH_GENRES_REQUEST";
export const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
export const FETCH_GENRES_ERROR = "FETCH_GENRES_ERROR";

export function fetchGenres() {
  return {
    types: [FETCH_GENRES_REQUEST, FETCH_GENRES_SUCCESS, FETCH_GENRES_ERROR],
    callAPI: () => get("/genre/movie/list"),
    schema: { genres: [schemas.genreSchema] }
  };
}

export const FETCH_MOVIE_CREDITS_REQUEST = "FETCH_MOVIE_CREDITS_REQUEST";
export const FETCH_MOVIE_CREDITS_SUCCESS = "FETCH_MOVIE_CREDITS_SUCCESS";
export const FETCH_MOVIE_CREDITS_ERROR = "FETCH_MOVIE_CREDITS_ERROR";

export function fetchMovieCredits(movieId) {
  return {
    types: [
      FETCH_MOVIE_CREDITS_REQUEST,
      FETCH_MOVIE_CREDITS_SUCCESS,
      FETCH_MOVIE_CREDITS_ERROR
    ],
    shouldCallAPI: state => !selectMovieCreditsByMovieId(state, movieId),
    callAPI: () => get(`/movie/${movieId}/credits`),
    schema: schemas.movieCreditSchema,
    payload: { movieId }
  };
}

export const FETCH_PERSON_REQUEST = "FETCH_PERSON_REQUEST";
export const FETCH_PERSON_SUCCESS = "FETCH_PERSON_SUCCESS";
export const FETCH_PERSON_ERROR = "FETCH_PERSON_ERROR";

export function fetchPerson(personId, requiredFields = []) {
  return {
    types: [FETCH_PERSON_REQUEST, FETCH_PERSON_SUCCESS, FETCH_PERSON_ERROR],
    shouldCallAPI: state => {
      const person = selectPersonById(state, personId);
      return !person || !checkRequiredFields(person, requiredFields);
    },
    callAPI: () => get(`/person/${personId}`),
    schema: schemas.personSchema,
    payload: { personId }
  };
}

export const FETCH_PERSON_MOVIE_CREDITS_REQUEST =
  "FETCH_PERSON_MOVIE_CREDITS_REQUEST";
export const FETCH_PERSON_MOVIE_CREDITS_SUCCESS =
  "FETCH_PERSON_MOVIE_CREDITS_SUCCESS";
export const FETCH_PERSON_MOVIE_CREDITS_ERROR =
  "FETCH_PERSON_MOVIE_CREDITS_ERROR";

export function fetchPersonMovieCredits(personId) {
  return {
    types: [
      FETCH_PERSON_MOVIE_CREDITS_REQUEST,
      FETCH_PERSON_MOVIE_CREDITS_SUCCESS,
      FETCH_PERSON_MOVIE_CREDITS_ERROR
    ],
    shouldCallAPI: state => !selectCreditsOfPerson(state, personId),
    callAPI: () => get(`/person/${personId}/movie_credits`),
    schema: schemas.creditsOfPersonSchema
  };
}

export const FETCH_POPULAR_PEOPLE_REQUEST = "FETCH_POPULAR_PEOPLE_REQUEST";
export const FETCH_POPULAR_PEOPLE_SUCCESS = "FETCH_POPULAR_PEOPLE_SUCCESS";
export const FETCH_POPULAR_PEOPLE_ERROR = "FETCH_POPULAR_PEOPLE_ERROR";

export function fetchPopularPeople(pageId) {
  return {
    types: [
      FETCH_POPULAR_PEOPLE_REQUEST,
      FETCH_POPULAR_PEOPLE_SUCCESS,
      FETCH_POPULAR_PEOPLE_ERROR
    ],
    shouldCallAPI: state => !selectCreditsOfPerson(state, pageId),
    callAPI: () =>
      get("/person/popular", {
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { pageId }
  };
}

export const FETCH_MOVIE_VIDEOS_REQUEST = "FETCH_MOVIE_VIDEOS_REQUEST";
export const FETCH_MOVIE_VIDEOS_SUCCESS = "FETCH_MOVIE_VIDEOS_SUCCESS";
export const FETCH_MOVIE_VIDEOS_ERROR = "FETCH_MOVIE_VIDEOS_ERROR";

export function fetchMovieVideos(movieId) {
  return {
    types: [
      FETCH_MOVIE_VIDEOS_REQUEST,
      FETCH_MOVIE_VIDEOS_SUCCESS,
      FETCH_MOVIE_VIDEOS_ERROR
    ],
    shouldCallAPI: state => !selectMovieVideos(state, movieId),
    callAPI: () => get(`/movie/${movieId}/videos`),
    schema: schemas.movieVideosSchema,
    payload: { movieId }
  };
}

export const FETCH_MOVIE_SEARCH_REQUEST = "FETCH_MOVIE_SEARCH_REQUEST";
export const FETCH_MOVIE_SEARCH_SUCCESS = "FETCH_MOVIE_SEARCH_SUCCESS";
export const FETCH_MOVIE_SEARCH_ERROR = "FETCH_MOVIE_SEARCH_ERROR";

export function fetchMovieSearch(query, pageId) {
  return {
    types: [
      FETCH_MOVIE_SEARCH_REQUEST,
      FETCH_MOVIE_SEARCH_SUCCESS,
      FETCH_MOVIE_SEARCH_ERROR
    ],
    callAPI: () =>
      get("/search/movie", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.movieSchema] },
    payload: { query }
  };
}

export const FETCH_PERSON_SEARCH_REQUEST = "FETCH_PERSON_SEARCH_REQUEST";
export const FETCH_PERSON_SEARCH_SUCCESS = "FETCH_PERSON_SEARCH_SUCCESS";
export const FETCH_PERSON_SEARCH_ERROR = "FETCH_PERSON_SEARCH_ERROR";

export function fetchPersonSearch(query, pageId) {
  return {
    types: [
      FETCH_PERSON_SEARCH_REQUEST,
      FETCH_PERSON_SEARCH_SUCCESS,
      FETCH_PERSON_SEARCH_ERROR
    ],
    callAPI: () =>
      get("/search/person", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { query }
  };
}
