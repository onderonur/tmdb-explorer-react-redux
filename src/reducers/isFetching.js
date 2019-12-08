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
    action => get(action, ["payload", "movieId"]),
    createIsFetching(actions.fetchMovieVideos)
  ),
  movieCreditsByMovieId: createByKey(
    action => get(action, ["payload", "movieId"]),
    createIsFetching(actions.fetchMovieCredits)
  ),
  movieRecommendationsByMovieId: createByKey(
    action => get(action, ["payload", "movieId"]),
    createIsFetching(actions.fetchRecommendations)
  ),
  movieImagesByMovieId: createByKey(
    action => get(action, ["payload", "movieId"]),
    createIsFetching(actions.fetchMovieImages)
  ),
  personImagesByPersonId: createByKey(
    action => get(action, ["payload", "personId"]),
    createIsFetching(actions.fetchPersonImages)
  ),
  personCreditsByPersonId: createByKey(
    action => get(action, ["payload", "personId"]),
    createIsFetching(actions.fetchPersonCredits)
  ),
  popularMovies: createIsFetching(actions.fetchPopularMovies),
  popularPeople: createIsFetching(actions.fetchPopularPeople),
  search: createIsFetching(actionTypes.FETCH_SEARCH),
  movieSearchResultsByQuery: createIsFetching(actions.fetchMovieSearch),
  personSearchResultsByQuery: createIsFetching(actions.fetchPersonSearch)
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
