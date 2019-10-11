import { combineReducers } from "redux";
import * as actionTypes from "constants/actionTypes";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import createByKey from "./higherOrderReducers/createByKey";

const isFetching = combineReducers({
  genres: createIsFetching([
    actionTypes.FETCH_GENRES_REQUEST,
    actionTypes.FETCH_GENRES_SUCCESS,
    actionTypes.FETCH_GENRES_ERROR
  ]),
  moviesById: createByKey(
    action => action.movieId,
    createIsFetching([
      actionTypes.FETCH_MOVIE_REQUEST,
      actionTypes.FETCH_MOVIE_SUCCESS,
      actionTypes.FETCH_MOVIE_ERROR
    ])
  ),
  peopleById: createByKey(
    action => action.personId,
    createIsFetching([
      actionTypes.FETCH_PERSON_REQUEST,
      actionTypes.FETCH_PERSON_SUCCESS,
      actionTypes.FETCH_PERSON_ERROR
    ])
  ),
  movieVideosByMovieId: createByKey(
    action => action.movieId,
    createIsFetching([
      actionTypes.FETCH_MOVIE_VIDEOS_REQUEST,
      actionTypes.FETCH_MOVIE_VIDEOS_SUCCESS,
      actionTypes.FETCH_MOVIE_VIDEOS_ERROR
    ])
  ),
  movieCreditsByMovieId: createByKey(
    action => action.movieId,
    createIsFetching([
      actionTypes.FETCH_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_MOVIE_CREDITS_ERROR
    ])
  ),
  movieRecommendationsByMovieId: createByKey(
    action => action.movieId,
    createIsFetching([
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ])
  ),
  movieImagesByMovieId: createByKey(
    action => action.movieId,
    createIsFetching([
      actionTypes.FETCH_MOVIE_IMAGES_REQUEST,
      actionTypes.FETCH_MOVIE_IMAGES_SUCCESS,
      actionTypes.FETCH_MOVIE_IMAGES_ERROR
    ])
  ),
  personImagesByPersonId: createByKey(
    action => action.personId,
    createIsFetching([
      actionTypes.FETCH_PERSON_IMAGES_REQUEST,
      actionTypes.FETCH_PERSON_IMAGES_SUCCESS,
      actionTypes.FETCH_PERSON_IMAGES_ERROR
    ])
  ),
  personCreditsByPersonId: createByKey(
    action => action.personId,
    createIsFetching([
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_ERROR
    ])
  ),
  popularMovies: createIsFetching([
    actionTypes.FETCH_POPULAR_MOVIES_REQUEST,
    actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
    actionTypes.FETCH_POPULAR_MOVIES_ERROR
  ]),
  popularPeople: createIsFetching([
    actionTypes.FETCH_POPULAR_PEOPLE_REQUEST,
    actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS,
    actionTypes.FETCH_POPULAR_PEOPLE_ERROR
  ]),
  movieSearchResultsByQuery: createByKey(
    action => action.query,
    createIsFetching([
      actionTypes.FETCH_MOVIE_SEARCH_REQUEST,
      actionTypes.FETCH_MOVIE_SEARCH_SUCCESS,
      actionTypes.FETCH_MOVIE_SEARCH_ERROR
    ])
  ),
  personSearchResultsByQuery: createByKey(
    action => action.query,
    createIsFetching([
      actionTypes.FETCH_PERSON_SEARCH_REQUEST,
      actionTypes.FETCH_PERSON_SEARCH_SUCCESS,
      actionTypes.FETCH_PERSON_SEARCH_ERROR
    ])
  )
});

export default isFetching;

export const selectIsFetchingGenres = state => state.genres;

export const selectIsFetchingMovie = (state, movieId) =>
  state.moviesById[movieId];

export const selectIsFetchingPerson = (state, personId) =>
  state.peopleById[personId];

export const selectIsFetchingPopularMovies = state => state.popularMovies;

export const selectIsFetchingPopularPeople = state => state.popularPeople;

export const selectIsFetchingMovieCredits = (state, movieId) =>
  state.movieCreditsByMovieId[movieId];

export const selectIsFetchingMovieVideos = (state, movieId) =>
  state.movieVideosByMovieId[movieId];

export const selectIsFetchingMovieRecommendations = (state, movieId) =>
  state.movieRecommendationsByMovieId[movieId];

export const selectIsFetchingMovieImages = (state, movieId) =>
  state.movieImagesByMovieId[movieId];

export const selectIsFetchingPersonImages = (state, personId) =>
  state.personImagesByPersonId[personId];

export const selectIsFetchingPersonCredits = (state, personId) =>
  state.personCreditsByPersonId[personId];

export const selectIsFetchingMovieSearchResults = (state, query) =>
  state.movieSearchResultsByQuery[query];

export const selectIsFetchingPersonSearchResults = (state, query) =>
  state.personSearchResultsByQuery[query];
