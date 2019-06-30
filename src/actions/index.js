import * as actionTypes from "constants/actionTypes";
import * as schemas from "schemas";
import { get } from "utils";
import {
  selectMovie,
  selectMovieRecommendations,
  selectMovieCredits,
  selectPerson,
  selectPersonCredits,
  selectMovieVideos,
  selectIsFetchingPopularMovies,
  selectIsFetchingMovie,
  selectIsFetchingMovieRecommendations,
  selectIsFetchingGenres,
  selectIsFetchingMovieCredits,
  selectIsFetchingPerson,
  selectIsFetchingPersonCredits,
  selectIsFetchingPopularPeople,
  selectIsFetchingMovieVideos,
  selectIsFetchingMovieSearchResults,
  selectIsFetchingPersonSearchResults
} from "reducers";

export function toggleDrawer() {
  return { type: actionTypes.TOGGLE_DRAWER };
}

// With callAPIMiddleware
// This is an "async action creator"
export function fetchPopularMovies(pageId) {
  return {
    types: [
      actionTypes.FETCH_POPULAR_MOVIES_REQUEST,
      actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
      actionTypes.FETCH_POPULAR_MOVIES_ERROR
    ],
    isFetching: state => selectIsFetchingPopularMovies(state),
    callAPI: () =>
      get("/movie/popular", {
        page: pageId
      }),
    payload: { pageId },
    schema: { results: [schemas.movieSchema] }
  };
}

export function fetchMovie(movieId, requiredFields) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_REQUEST,
      actionTypes.FETCH_MOVIE_SUCCESS,
      actionTypes.FETCH_MOVIE_ERROR
    ],
    isFetching: state => selectIsFetchingMovie(state, movieId),
    selectCachedData: state => selectMovie(state, movieId),
    requiredFields,
    callAPI: () => get(`/movie/${movieId}`),
    schema: schemas.movieSchema,
    payload: { movieId }
  };
}

export function fetchRecommendations(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ],
    isFetching: state => selectIsFetchingMovieRecommendations(state, movieId),
    selectCachedData: state => selectMovieRecommendations(state, movieId),
    callAPI: () => get(`/movie/${movieId}/recommendations`),
    processResponse: data => ({ ...data, movieId }),
    schema: schemas.movieRecommendationSchema,
    payload: { movieId }
  };
}

export function fetchGenres() {
  return {
    types: [
      actionTypes.FETCH_GENRES_REQUEST,
      actionTypes.FETCH_GENRES_SUCCESS,
      actionTypes.FETCH_GENRES_ERROR
    ],
    isFetching: state => selectIsFetchingGenres(state),
    callAPI: () => get("/genre/movie/list"),
    schema: { genres: [schemas.genreSchema] }
  };
}

export function fetchMovieCredits(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_MOVIE_CREDITS_ERROR
    ],
    isFetching: state => selectIsFetchingMovieCredits(state, movieId),
    selectCachedData: state => selectMovieCredits(state, movieId),
    callAPI: () => get(`/movie/${movieId}/credits`),
    schema: schemas.movieCreditSchema,
    payload: { movieId }
  };
}

export function fetchPerson(personId, requiredFields) {
  return {
    types: [
      actionTypes.FETCH_PERSON_REQUEST,
      actionTypes.FETCH_PERSON_SUCCESS,
      actionTypes.FETCH_PERSON_ERROR
    ],
    isFetching: state => selectIsFetchingPerson(state, personId),
    selectCachedData: state => selectPerson(state, personId),
    requiredFields,
    callAPI: () => get(`/person/${personId}`),
    schema: schemas.personSchema,
    payload: { personId }
  };
}

export function fetchPersonCredits(personId) {
  return {
    types: [
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_ERROR
    ],
    isFetching: state => selectIsFetchingPersonCredits(state, personId),
    selectCachedData: state => selectPersonCredits(state, personId),
    callAPI: () => get(`/person/${personId}/movie_credits`),
    schema: schemas.personCreditSchema,
    payload: { personId }
  };
}

export function fetchPopularPeople(pageId) {
  return {
    types: [
      actionTypes.FETCH_POPULAR_PEOPLE_REQUEST,
      actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS,
      actionTypes.FETCH_POPULAR_PEOPLE_ERROR
    ],
    isFetching: state => selectIsFetchingPopularPeople(state),
    callAPI: () =>
      get("/person/popular", {
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { pageId }
  };
}

export function fetchMovieVideos(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_VIDEOS_REQUEST,
      actionTypes.FETCH_MOVIE_VIDEOS_SUCCESS,
      actionTypes.FETCH_MOVIE_VIDEOS_ERROR
    ],
    isFetching: state => selectIsFetchingMovieVideos(state, movieId),
    selectCachedData: state => selectMovieVideos(state, movieId),
    callAPI: () => get(`/movie/${movieId}/videos`),
    schema: schemas.movieVideosSchema,
    payload: { movieId }
  };
}

export function fetchMovieSearch(query, pageId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_SEARCH_REQUEST,
      actionTypes.FETCH_MOVIE_SEARCH_SUCCESS,
      actionTypes.FETCH_MOVIE_SEARCH_ERROR
    ],
    isFetching: state => selectIsFetchingMovieSearchResults(state, query),
    callAPI: () =>
      get("/search/movie", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.movieSchema] },
    payload: { query }
  };
}

export function fetchPersonSearch(query, pageId) {
  return {
    types: [
      actionTypes.FETCH_PERSON_SEARCH_REQUEST,
      actionTypes.FETCH_PERSON_SEARCH_SUCCESS,
      actionTypes.FETCH_PERSON_SEARCH_ERROR
    ],
    isFetching: state => selectIsFetchingPersonSearchResults(state, query),
    callAPI: () =>
      get("/search/person", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { query }
  };
}
