import * as actionTypes from "constants/actionTypes";
import * as schemas from "schemas";
import { get } from "utils";
import * as selectors from "reducers";
import { ofType } from "redux-observable";
import {
  map,
  catchError,
  switchMap,
  takeUntil,
  filter,
  withLatestFrom,
  mergeMap,
  exhaustMap,
  groupBy
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { BASE_API_URL } from "constants/urls";
import { normalize } from "normalizr";
import { of } from "rxjs";
import { verifyCachedData } from "middlewares/callAPIMiddleware";

export function toggleDrawer() {
  return { type: actionTypes.TOGGLE_DRAWER };
}

export const fetchPopularMoviesRequest = pageId => ({
  type: actionTypes.FETCH_POPULAR_MOVIES_REQUEST,
  pageId
});
const fetchPopularMoviesSuccess = (pageId, response) => ({
  type: actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
  pageId,
  response
});
const fetchPopularMoviesError = () => ({
  type: actionTypes.FETCH_POPULAR_MOVIES_ERROR
});

export const fetchMovieRequest = (movieId, requiredFields) => ({
  type: actionTypes.FETCH_MOVIE_REQUEST,
  movieId,
  requiredFields
});

export const fetchPersonRequest = (personId, requiredFields) => ({
  type: actionTypes.FETCH_PERSON_REQUEST,
  personId,
  requiredFields
});

const api_key = process.env.REACT_APP_API_KEY;

export const fetchPopularMoviesEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_POPULAR_MOVIES_REQUEST),
    map(action => action.pageId),
    switchMap(pageId =>
      ajax
        .getJSON(
          `${BASE_API_URL}/movie/popular?page=${pageId}&api_key=${api_key}`
        )
        .pipe(
          map(response => {
            const normalizedData = normalize(response, {
              results: [schemas.movieSchema]
            });
            return fetchPopularMoviesSuccess(pageId, normalizedData);
          }),
          catchError(error => of(fetchPopularMoviesError()))
        )
    )
  );

/**
 * This is a generic epic for data fetching.
 * Instead of repeat thing like checking the cached data in Redux store, or grouping streams,
 * we simply use this epic.
 * TODO: It may be splitted into custom operators to make it more readable and much more reusable for different cases.
 */
const dataFetchEpic = ({
  types: [requestType, successType, errorType, cancelType],
  groupActionsBy,
  selectCachedData,
  callAPI,
  payload,
  schema,
  cancelFilter
}) => (action$, state$) =>
  action$.pipe(
    ofType(requestType),
    withLatestFrom(state$),
    // If there is a cachedDate, we filter the stream.
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
    map(([action, state]) => action),
    // Grouping the actions by a function.
    groupBy(action => groupActionsBy(action)),
    mergeMap(groupedAction$ =>
      groupedAction$.pipe(
        // exhaustMap: Only the currently running stream will continue.
        // Next ones will be ignored until it is finished.
        exhaustMap(action =>
          ajax.getJSON(`${BASE_API_URL}${callAPI(action)}`).pipe(
            // If there is a schema, we normalize the response.
            map(response => (schema ? normalize(response, schema) : response)),
            // Fetching is completed. Dispatching the response and the extra payload to reducers.
            map(response => ({
              type: successType,
              ...payload(action),
              response
            })),
            // An error occured. Dispatching the extra payload to reducers.
            // If we want to show some error messages etc, this is the place to pass them to reducers.
            catchError(() => of({ type: errorType, ...payload(action) })),
            // Cancellation
            takeUntil(
              action$.pipe(
                ofType(cancelType),
                filter(cancelAction =>
                  cancelFilter ? cancelFilter(action, cancelAction) : true
                )
              )
            )
          )
        )
      )
    )
  );

export const fetchMovieEpic = dataFetchEpic({
  types: [
    actionTypes.FETCH_MOVIE_REQUEST,
    actionTypes.FETCH_MOVIE_SUCCESS,
    actionTypes.FETCH_MOVIE_ERROR
  ],
  groupActionsBy: action => action.movieId,
  selectCachedData: (state, action) =>
    selectors.selectMovie(state, action.movieId),
  callAPI: action => `/movie/${action.movieId}?api_key=${api_key}`,
  payload: action => ({
    movieId: action.movieId
  }),
  schema: schemas.movieSchema
});

export const fetchPersonEpic = dataFetchEpic({
  types: [
    actionTypes.FETCH_PERSON_REQUEST,
    actionTypes.FETCH_PERSON_SUCCESS,
    actionTypes.FETCH_PERSON_ERROR
  ],
  groupActionsBy: action => action.personId,
  selectCachedData: (state, action) =>
    selectors.selectPerson(state, action.personId),
  callAPI: action => `/person/${action.personId}?api_key=${api_key}`,
  payload: action => ({
    personId: action.personId
  }),
  schema: schemas.personSchema
});

export function fetchRecommendations(movieId) {
  return {
    types: [
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
      actionTypes.FETCH_MOVIE_RECOMMENDATIONS_ERROR
    ],
    isFetching: state =>
      selectors.selectIsFetchingMovieRecommendations(state, movieId),
    selectCachedData: state =>
      selectors.selectMovieRecommendations(state, movieId),
    callAPI: () => get(`/movie/${movieId}/recommendations`),
    processResponse: data => ({ ...data, movieId }),
    schema: schemas.movieRecommendationSchema,
    payload: { movieId }
  };
}

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
    selectCachedData: state => selectors.selectMovieBackdrops(state, movieId),
    callAPI: () => get(`/movie/${movieId}/images`),
    schema: schemas.movieBackdropSchema,
    payload: { movieId }
  };
}
