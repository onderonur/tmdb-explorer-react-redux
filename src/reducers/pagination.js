import { combineReducers } from "redux";
import createPagination, {
  selectors as paginationSelectors
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

export const selectors = {
  // Popular Movies
  selectPopularMovieIds: state =>
    paginationSelectors.selectPageItems(state.popularMovies),
  selectPopularMoviesNextPage: state =>
    paginationSelectors.selectNextPage(state.popularMovies),

  // Popular People
  selectPopularPeopleIds: state =>
    paginationSelectors.selectPageItems(state.popularPeople),
  selectPopularPeopleNextPage: state =>
    paginationSelectors.selectNextPage(state.popularPeople),

  // MovieSearchResultsByQuery
  selectMovieSearchResultIds: (state, query) =>
    paginationSelectors.selectPageItems(state.movieSearchResultsByQuery[query]),
  selectMovieSearchResultsNextPage: (state, query) =>
    paginationSelectors.selectNextPage(state.movieSearchResultsByQuery[query]),
  selectMovieSearchResultsTotalCount: (state, query) =>
    paginationSelectors.selectTotalCount(
      state.movieSearchResultsByQuery[query]
    ),

  // PersonSearchResultsByQuery
  selectPersonSearchResultIds: (state, query) =>
    paginationSelectors.selectPageItems(
      state.personSearchResultsByQuery[query]
    ),
  selectPersonSearchResultsNextPage: (state, query) =>
    paginationSelectors.selectNextPage(state.personSearchResultsByQuery[query]),
  selectPersonSearchResultsTotalCount: (state, query) =>
    paginationSelectors.selectTotalCount(
      state.personSearchResultsByQuery[query]
    )
};
