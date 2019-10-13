import * as actionTypes from "constants/actionTypes";
import * as schemas from "schemas";
import { get } from "utils";
import * as selectors from "reducers";
import { ofType } from "redux-observable";
import {
  map,
  catchError,
  filter,
  withLatestFrom,
  mergeMap,
  exhaustMap,
  groupBy,
  startWith
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { BASE_API_URL } from "constants/urls";
import { normalize } from "normalizr";
import { of } from "rxjs";
import { verifyCachedData } from "middlewares/callAPIMiddleware";
import queryString from "query-string";

export const toggleDrawer = () => ({
  type: actionTypes.TOGGLE_DRAWER
});

export const fetchPopularMovies = pageId => ({
  type: actionTypes.FETCH_POPULAR_MOVIES,
  pageId
});

export const fetchMovie = (movieId, requiredFields) => ({
  type: actionTypes.FETCH_MOVIE,
  movieId,
  requiredFields
});

export const fetchPerson = (personId, requiredFields) => ({
  type: actionTypes.FETCH_PERSON,
  personId,
  requiredFields
});

export const fetchRecommendations = movieId => ({
  type: actionTypes.FETCH_MOVIE_RECOMMENDATIONS,
  movieId
});

const filterByCachedData = (state$, selectCachedData) => action$ =>
  action$.pipe(
    withLatestFrom(state$),
    filter(([action, state]) => {
      if (!selectCachedData) {
        return true;
      }

      const cachedData = selectCachedData(state, action);
      return !verifyCachedData(
        cachedData,
        // If the action has a "requiredFields" payload, we check if it is fulfilled.
        action.requiredFields
      );
    }),
    map(([action, state]) => action)
  );

const api_key = process.env.REACT_APP_API_KEY;

const createUrl = (endpoint, params = {}) =>
  `${BASE_API_URL}${endpoint}?${queryString.stringify({
    ...params,
    api_key
  })}`;

/**
 * This is a generic epic for data fetching.
 * Instead of repeat thing like checking the cached data in Redux store, or grouping streams,
 * we simply use this epic.
 * TODO: It may be splitted into custom operators to make it more readable and much more reusable for different cases.
 */
const createFetchEpic = ({
  type,
  groupActionsBy,
  selectCachedData,
  endpoint,
  params,
  processResponse,
  schema
}) => (action$, state$) => {
  const requestType = `${type}_REQUEST`;
  const successType = `${type}_SUCCESS`;
  const errorType = `${type}_ERROR`;

  return action$.pipe(
    ofType(type),
    // If there is a cachedData, we filter the stream.
    filterByCachedData(state$, selectCachedData),
    // Grouping the actions by a function.
    groupBy(action => groupActionsBy(action)),
    mergeMap(groupedAction$ =>
      groupedAction$.pipe(
        // exhaustMap: Only the currently running stream will continue.
        // Next ones will be ignored until it is finished.
        exhaustMap(action => {
          const url = createUrl(endpoint(action), params);
          return ajax.getJSON(url, params ? params(action) : undefined).pipe(
            map(response =>
              processResponse ? processResponse(response, action) : response
            ),
            // If there is a schema, we normalize the response.
            map(response => (schema ? normalize(response, schema) : response)),
            // Fetching is completed. Dispatching the response and the extra payload to reducers.
            map(response => ({
              ...action,
              type: successType,
              response
            })),
            // An error occured. Dispatching the extra payload to reducers.
            // If we want to show some error messages etc, this is the place to pass them to reducers.
            catchError(() =>
              of({
                ...action,
                type: errorType
              })
            ),
            startWith({ type: requestType, ...action })
          );
        })
      )
    )
  );
};

export const fetchPopularMoviesEpic = createFetchEpic({
  type: actionTypes.FETCH_POPULAR_MOVIES,
  groupActionsBy: ({ pageId }) => pageId,
  endpoint: () => "/movie/popular",
  params: ({ pageId }) => ({ page: pageId }),
  schema: {
    results: [schemas.movieSchema]
  }
});

export const fetchMovieEpic = createFetchEpic({
  type: actionTypes.FETCH_MOVIE,
  groupActionsBy: action => action.movieId,
  selectCachedData: (state, action) =>
    selectors.selectMovie(state, action.movieId),
  endpoint: action => `/movie/${action.movieId}`,
  schema: schemas.movieSchema
});

export const fetchPersonEpic = createFetchEpic({
  type: actionTypes.FETCH_PERSON,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPerson(state, personId),
  endpoint: action => `/person/${action.personId}`,
  schema: schemas.personSchema
});

export const fetchRecommendationsEpic = createFetchEpic({
  type: actionTypes.FETCH_MOVIE_RECOMMENDATIONS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieRecommendations(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/recommendations`,
  processResponse: (response, { movieId }) => ({ ...response, movieId }),
  schema: schemas.movieRecommendationSchema
});

export function fetchGenres() {
  return {
    types: [
      actionTypes.FETCH_GENRES_REQUEST,
      actionTypes.FETCH_GENRES_SUCCESS,
      actionTypes.FETCH_GENRES_ERROR
    ],
    isFetching: state => selectors.selectIsFetchingGenres(state),
    callAPI: () => get("/genre/movie/list"),
    schema: { genres: [schemas.genreSchema] }
  };
}

export function fetchMovieCredits(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_MOVIE_CREDITS_ERROR
    ],
    isFetching: state => selectors.selectIsFetchingMovieCredits(state, movieId),
    selectCachedData: state => selectors.selectMovieCredits(state, movieId),
    callAPI: () => get(`/movie/${movieId}/credits`),
    schema: schemas.movieCreditSchema,
    payload: { movieId }
  };
}

export function fetchPersonCredits(personId) {
  return {
    types: [
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_REQUEST,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_SUCCESS,
      actionTypes.FETCH_PERSON_MOVIE_CREDITS_ERROR
    ],
    isFetching: state =>
      selectors.selectIsFetchingPersonCredits(state, personId),
    selectCachedData: state => selectors.selectPersonCredits(state, personId),
    callAPI: () => get(`/person/${personId}/movie_credits`),
    schema: schemas.personCreditSchema,
    payload: { personId }
  };
}

export function fetchPopularPeople(pageId) {
  return {
    types: [
      actionTypes.FETCH_POPULAR_PEOPLE_REQUEST,
      actionTypes.FETCH_POPULAR_PEOPLE_SUCCESS,
      actionTypes.FETCH_POPULAR_PEOPLE_ERROR
    ],
    isFetching: state => selectors.selectIsFetchingPopularPeople(state),
    callAPI: () =>
      get("/person/popular", {
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { pageId }
  };
}

export function fetchMovieVideos(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_VIDEOS_REQUEST,
      actionTypes.FETCH_MOVIE_VIDEOS_SUCCESS,
      actionTypes.FETCH_MOVIE_VIDEOS_ERROR
    ],
    isFetching: state => selectors.selectIsFetchingMovieVideos(state, movieId),
    selectCachedData: state => selectors.selectMovieVideos(state, movieId),
    callAPI: () => get(`/movie/${movieId}/videos`),
    schema: schemas.movieVideosSchema,
    payload: { movieId }
  };
}

export function fetchMovieSearch(query, pageId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_SEARCH_REQUEST,
      actionTypes.FETCH_MOVIE_SEARCH_SUCCESS,
      actionTypes.FETCH_MOVIE_SEARCH_ERROR
    ],
    isFetching: state =>
      selectors.selectIsFetchingMovieSearchResults(state, query),
    // We don't select "cachedData" to force a new request on every search.
    callAPI: () =>
      get("/search/movie", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.movieSchema] },
    payload: { query }
  };
}

export function fetchPersonSearch(query, pageId) {
  return {
    types: [
      actionTypes.FETCH_PERSON_SEARCH_REQUEST,
      actionTypes.FETCH_PERSON_SEARCH_SUCCESS,
      actionTypes.FETCH_PERSON_SEARCH_ERROR
    ],
    isFetching: state =>
      selectors.selectIsFetchingPersonSearchResults(state, query),
    // We don't select "cachedData" to force a new request on every search.
    callAPI: () =>
      get("/search/person", {
        query,
        page: pageId
      }),
    schema: { results: [schemas.personSchema] },
    payload: { query }
  };
}

export function fetchMovieImages(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_IMAGES_REQUEST,
      actionTypes.FETCH_MOVIE_IMAGES_SUCCESS,
      actionTypes.FETCH_MOVIE_IMAGES_ERROR
    ],
    isFetching: state => selectors.selectIsFetchingMovieImages(state, movieId),
    selectCachedData: state => selectors.selectMovieImages(state, movieId),
    callAPI: () => get(`/movie/${movieId}/images`),
    schema: schemas.movieImageSchema,
    payload: { movieId }
  };
}

export function fetchPersonImages(personId) {
  return {
    types: [
      actionTypes.FETCH_PERSON_IMAGES_REQUEST,
      actionTypes.FETCH_PERSON_IMAGES_SUCCESS,
      actionTypes.FETCH_PERSON_IMAGES_ERROR
    ],
    isFetching: state =>
      selectors.selectIsFetchingPersonImages(state, personId),
    selectCachedData: state => selectors.selectPersonImages(state, personId),
    callAPI: () => get(`/person/${personId}/images`),
    schema: schemas.personImageSchema,
    payload: { personId }
  };
}
