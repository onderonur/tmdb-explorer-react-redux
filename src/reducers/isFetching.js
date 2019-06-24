import { combineReducers } from "redux";
import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_ERROR,
  FETCH_PERSON_REQUEST,
  FETCH_PERSON_SUCCESS,
  FETCH_PERSON_ERROR,
  FETCH_GENRES_REQUEST,
  FETCH_GENRES_SUCCESS,
  FETCH_GENRES_ERROR,
  FETCH_MOVIE_VIDEOS_REQUEST,
  FETCH_MOVIE_VIDEOS_SUCCESS,
  FETCH_MOVIE_VIDEOS_ERROR,
  FETCH_MOVIE_CREDITS_REQUEST,
  FETCH_MOVIE_CREDITS_SUCCESS,
  FETCH_MOVIE_CREDITS_ERROR,
  FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
  FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
  FETCH_MOVIE_RECOMMENDATIONS_ERROR
} from "actions";
import fetching from "./fetching";

export const isFetching = combineReducers({
  moviesById: fetching({
    mapActionToKey: action => action.movieId,
    types: [FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_ERROR]
  }),
  peopleById: fetching({
    mapActionToKey: action => action.personId,
    types: [FETCH_PERSON_REQUEST, FETCH_PERSON_SUCCESS, FETCH_PERSON_ERROR]
  }),
  genres: fetching({
    types: [FETCH_GENRES_REQUEST, FETCH_GENRES_SUCCESS, FETCH_GENRES_ERROR]
  }),
  movieVideosByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      FETCH_MOVIE_VIDEOS_REQUEST,
      FETCH_MOVIE_VIDEOS_SUCCESS,
      FETCH_MOVIE_VIDEOS_ERROR
    ]
  }),
  movieCreditsByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      FETCH_MOVIE_CREDITS_REQUEST,
      FETCH_MOVIE_CREDITS_SUCCESS,
      FETCH_MOVIE_CREDITS_ERROR
    ]
  }),
  movieRecommendationsByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ]
  })
});

export function selectMovieIsFetching(state, movieId) {
  return state.isFetching.moviesById[movieId];
}

export function selectPersonIsFetching(state, personId) {
  return state.isFetching.peopleById[personId];
}

export function selectGenresIsFetching(state) {
  return state.isFetching.genres;
}

export function selectMovieVideosIsFetching(state, movieId) {
  return state.isFetching.movieVideosByMovieId[movieId];
}

export function selectMovieCreditsIsFetching(state, movieId) {
  return state.isFetching.movieCreditsByMovieId[movieId];
}

export function selectMovieRecommendationsIsFetching(state, movieId) {
  return state.isFetching.movieRecommendationsByMovieId[movieId];
}
