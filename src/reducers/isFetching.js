import { combineReducers } from "redux";
import * as actionTypes from "constants/actionTypes";
import fetching from "./fetching";

const isFetching = combineReducers({
  moviesById: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      actionTypes.FETCH_MOVIE_REQUEST,
      actionTypes.FETCH_MOVIE_SUCCESS,
      actionTypes.FETCH_MOVIE_ERROR
    ]
  }),
  peopleById: fetching({
    mapActionToKey: action => action.personId,
    types: [
      actionTypes.FETCH_PERSON_REQUEST,
      actionTypes.FETCH_PERSON_SUCCESS,
      actionTypes.FETCH_PERSON_ERROR
    ]
  }),
  genres: fetching({
    types: [
      actionTypes.FETCH_GENRES_REQUEST,
      actionTypes.FETCH_GENRES_SUCCESS,
      actionTypes.FETCH_GENRES_ERROR
    ]
  }),
  movieVideosByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      actionTypes.FETCH_MOVIE_VIDEOS_REQUEST,
      actionTypes.FETCH_MOVIE_VIDEOS_SUCCESS,
      actionTypes.FETCH_MOVIE_VIDEOS_ERROR
    ]
  }),
  movieCreditsByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      actionTypes.FETCH_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_MOVIE_CREDITS_ERROR
    ]
  }),
  movieRecommendationsByMovieId: fetching({
    mapActionToKey: action => action.movieId,
    types: [
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ]
  })
});

export default isFetching;

export function selectMovieIsFetching(state, movieId) {
  return state.moviesById[movieId];
}

export function selectPersonIsFetching(state, personId) {
  return state.peopleById[personId];
}

export function selectGenresIsFetching(state) {
  return state.genres;
}

export function selectMovieVideosIsFetching(state, movieId) {
  return state.movieVideosByMovieId[movieId];
}

export function selectMovieCreditsIsFetching(state, movieId) {
  return state.movieCreditsByMovieId[movieId];
}

export function selectMovieRecommendationsIsFetching(state, movieId) {
  return state.movieRecommendationsByMovieId[movieId];
}
