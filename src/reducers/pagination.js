import { combineReducers } from "redux";
import createPagination, {
  selectPageItems,
  selectNextPage,
  selectTotalCount
} from "./higherOrderReducers/createPagination";
import * as actionTypes from "constants/actionTypes";
import createByKey from "./higherOrderReducers/createByKey";

const pagination = combineReducers({
  popularMovies: createPagination(actionTypes.FETCH_POPULAR_MOVIES_SUCCESS),
  popularPeople: createPagination(actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS),
  movieSearchResultsByQuery: createByKey(
    action => action.query,
    createPagination(actionTypes.FETCH_MOVIE_SEARCH_SUCCESS)
  ),
  personSearchResultsByQuery: createByKey(
    action => action.query,
    createPagination(actionTypes.FETCH_PERSON_SEARCH_SUCCESS)
  )
});

export default pagination;

// Popular Movies
export const selectPopularMovieIds = state =>
  selectPageItems(state.popularMovies);
export const selectPopularMoviesNextPage = state =>
  selectNextPage(state.popularMovies);

// Popular People
export const selectPopularPeopleIds = state =>
  selectPageItems(state.popularPeople);
export const selectPopularPeopleNextPage = state =>
  selectNextPage(state.popularPeople);

// MovieSearchResultsByQuery
export const selectMovieSearchResultIds = (state, query) =>
  selectPageItems(state.movieSearchResultsByQuery[query]);
export const selectMovieSearchResultsNextPage = (state, query) =>
  selectNextPage(state.movieSearchResultsByQuery[query]);
export const selectMovieSearchResultsTotalCount = (state, query) =>
  selectTotalCount(state.movieSearchResultsByQuery[query]);

// PersonSearchResultsByQuery
export const selectPersonSearchResultIds = (state, query) =>
  selectPageItems(state.personSearchResultsByQuery[query]);
export const selectPersonSearchResultsNextPage = (state, query) =>
  selectNextPage(state.personSearchResultsByQuery[query]);
export const selectPersonSearchResultsTotalCount = (state, query) =>
  selectTotalCount(state.personSearchResultsByQuery[query]);
