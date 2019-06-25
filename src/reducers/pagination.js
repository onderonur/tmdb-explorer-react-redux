import { combineReducers } from "redux";
import { paginate, DEFAULT_FIRST_PAGE } from "./paginate";
import * as actionTypes from "constants/actionTypes";

export const pagination = combineReducers({
  popularMovies: paginate({
    types: [
      actionTypes.FETCH_POPULAR_MOVIES_REQUEST,
      actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
      actionTypes.FETCH_POPULAR_MOVIES_ERROR
    ]
  }),
  popularPeople: paginate({
    types: [
      actionTypes.FETCH_POPULAR_PEOPLE_REQUEST,
      actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS,
      actionTypes.FETCH_POPULAR_PEOPLE_ERROR
    ]
  }),
  movieSearchResultsByQuery: paginate({
    mapActionToKey: action => action.query,
    types: [
      actionTypes.FETCH_MOVIE_SEARCH_REQUEST,
      actionTypes.FETCH_MOVIE_SEARCH_SUCCESS,
      actionTypes.FETCH_MOVIE_SEARCH_ERROR
    ]
  }),
  personSearchResultsByQuery: paginate({
    mapActionToKey: action => action.query,
    types: [
      actionTypes.FETCH_PERSON_SEARCH_REQUEST,
      actionTypes.FETCH_PERSON_SEARCH_SUCCESS,
      actionTypes.FETCH_PERSON_SEARCH_ERROR
    ]
  })
});

// TODO: Bu selector'leri bi toparla

function selectPaginationByKey(state, paginationKey, key) {
  return state.pagination[paginationKey][key];
}

function selectPaginationIds(state, paginationKey, key) {
  const result = selectPaginationByKey(state, paginationKey, key);
  return result ? result.ids : undefined;
}

function selectIsFetching(state, paginationKey, key) {
  const result = selectPaginationByKey(state, paginationKey, key);
  return result ? result.isFetching : undefined;
}

function selectNextPage(state, paginationKey, key) {
  const result = selectPaginationByKey(state, paginationKey, key);
  return result ? result.nextPage : DEFAULT_FIRST_PAGE;
}

function selectTotalCount(state, paginationKey, key) {
  const result = selectPaginationByKey(state, paginationKey, key);
  return result ? result.totalCount : 0;
}

export function selectPopularMovieIds(state) {
  return state.pagination.popularMovies.ids;
}

export function selectPopularMoviesIsFetching(state) {
  return state.pagination.popularMovies.isFetching;
}

export function selectPopularMoviesNextPage(state) {
  return state.pagination.popularMovies.nextPage || DEFAULT_FIRST_PAGE;
}

export function selectPopularPeopleIds(state) {
  return state.pagination.popularPeople.ids;
}

export function selectPopularPeopleIsFetching(state) {
  return state.pagination.popularPeople.isFetching;
}

export function selectPopularPeopleNextPage(state) {
  return state.pagination.popularPeople.nextPage || DEFAULT_FIRST_PAGE;
}

export function selectMovieSearchResultIds(state, query) {
  return selectPaginationIds(state, "movieSearchResultsByQuery", query);
}

export function selectMovieSearchIsFetching(state, query) {
  return selectIsFetching(state, "movieSearchResultsByQuery", query);
}

export function selectMovieSearchNextPage(state, query) {
  return selectNextPage(state, "movieSearchResultsByQuery", query);
}

export function selectMovieSearchTotalCount(state, query) {
  return selectTotalCount(state, "movieSearchResultsByQuery", query);
}

export function selectPersonSearchResultIds(state, query) {
  return selectPaginationIds(state, "personSearchResultsByQuery", query);
}

export function selectPersonSearchIsFetching(state, query) {
  return selectIsFetching(state, "personSearchResultsByQuery", query);
}

export function selectPersonSearchNextPage(state, query) {
  return selectNextPage(state, "personSearchResultsByQuery", query);
}

export function selectPersonSearchTotalCount(state, query) {
  return selectTotalCount(state, "personSearchResultsByQuery", query);
}
