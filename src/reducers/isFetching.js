import { combineReducers } from "redux";
import * as actionTypes from "constants/actionTypes";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import createByKey from "./higherOrderReducers/createByKey";

const isFetching = combineReducers({
  genres: createIsFetching(actionTypes.FETCH_GENRES),
  moviesById: createByKey(
    action => action.movieId,
    createIsFetching(actionTypes.FETCH_MOVIE)
  ),
  peopleById: createByKey(
    action => action.personId,
    createIsFetching(actionTypes.FETCH_PERSON)
  ),
  movieVideosByMovieId: createByKey(
    action => action.movieId,
    createIsFetching(actionTypes.FETCH_MOVIE_VIDEOS)
  ),
  movieCreditsByMovieId: createByKey(
    action => action.movieId,
    createIsFetching(actionTypes.FETCH_MOVIE_CREDITS)
  ),
  movieRecommendationsByMovieId: createByKey(
    action => action.movieId,
    createIsFetching(actionTypes.FETCH_MOVIE_RECOMMENDATIONS)
  ),
  movieImagesByMovieId: createByKey(
    action => action.movieId,
    createIsFetching(actionTypes.FETCH_MOVIE_IMAGES)
  ),
  personImagesByPersonId: createByKey(
    action => action.personId,
    createIsFetching(actionTypes.FETCH_PERSON_IMAGES)
  ),
  personCreditsByPersonId: createByKey(
    action => action.personId,
    createIsFetching(actionTypes.FETCH_PERSON_MOVIE_CREDITS)
  ),
  popularMovies: createIsFetching(actionTypes.FETCH_POPULAR_MOVIES),
  popularPeople: createIsFetching(actionTypes.FETCH_POPULAR_PEOPLE),
  movieSearchResultsByQuery: createIsFetching(actionTypes.FETCH_MOVIE_SEARCH),
  personSearchResultsByQuery: createIsFetching(actionTypes.FETCH_PERSON_SEARCH)
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

export const selectIsFetchingMovieSearchResults = state =>
  state.movieSearchResultsByQuery;

export const selectIsFetchingPersonSearchResults = state =>
  state.personSearchResultsByQuery;
