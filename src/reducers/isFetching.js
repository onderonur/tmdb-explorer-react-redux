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

export const selectors = {
  selectIsFetchingGenres: state => state.genres,
  selectIsFetchingMovie: (state, movieId) => state.moviesById[movieId],
  selectIsFetchingPerson: (state, personId) => state.peopleById[personId],
  selectIsFetchingPopularMovies: state => state.popularMovies,
  selectIsFetchingPopularPeople: state => state.popularPeople,
  selectIsFetchingMovieCredits: (state, movieId) =>
    state.movieCreditsByMovieId[movieId],
  selectIsFetchingMovieVideos: (state, movieId) =>
    state.movieVideosByMovieId[movieId],
  selectIsFetchingMovieRecommendations: (state, movieId) =>
    state.movieRecommendationsByMovieId[movieId],
  selectIsFetchingMovieImages: (state, movieId) =>
    state.movieImagesByMovieId[movieId],
  selectIsFetchingPersonImages: (state, personId) =>
    state.personImagesByPersonId[personId],
  selectIsFetchingPersonCredits: (state, personId) =>
    state.personCreditsByPersonId[personId],
  selectIsFetchingMovieSearchResults: state => state.movieSearchResultsByQuery,
  selectIsFetchingPersonSearchResults: state => state.personSearchResultsByQuery
};
