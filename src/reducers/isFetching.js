import { combineReducers } from "redux";
import * as actionTypes from "constants/actionTypes";
import * as actions from "actions";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import createByKey from "./higherOrderReducers/createByKey";
// TODO: Install only required lodash modules.
import get from "lodash/get";

const isFetching = combineReducers({
  genres: createIsFetching(actions.fetchGenres),
  moviesById: createByKey(
    action => get(action, ["payload", "movieId"]),
    createIsFetching(actions.fetchMovie)
  ),
  peopleById: createByKey(
    action => get(action, ["payload", "personId"]),
    createIsFetching(actions.fetchPerson)
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
    createIsFetching(actions.fetchRecommendations)
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
  popularMovies: createIsFetching(actions.fetchPopularMovies),
  popularPeople: createIsFetching(actions.fetchPopularPeople),
  search: createIsFetching(actionTypes.FETCH_SEARCH),
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
  selectIsFetchingSearch: state => state.search,
  selectIsFetchingMovieSearchResults: state => state.movieSearchResultsByQuery,
  selectIsFetchingPersonSearchResults: state => state.personSearchResultsByQuery
};
