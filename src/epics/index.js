import * as actionTypes from "constants/actionTypes";
import * as schemas from "schemas";
import { selectors } from "reducers";
import { ofType, combineEpics } from "redux-observable";
import {
  map,
  catchError,
  filter,
  withLatestFrom,
  mergeMap,
  exhaustMap,
  groupBy,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  concatMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { BASE_API_URL } from "constants/urls";
import { normalize } from "normalizr";
import { of, forkJoin } from "rxjs";
import queryString from "query-string";

// Checking cached data to see if it exists and has all the required fields
export const verifyCachedData = (cachedData, requiredFields = []) => {
  if (!cachedData) {
    return false;
  }

  return requiredFields.every(key => cachedData.hasOwnProperty(key));
};

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

const getRequest = ({ action, endpoint, params, processResponse, schema }) => {
  const fetchType = action.type;
  const requestType = `${fetchType}_REQUEST`;
  const successType = `${fetchType}_SUCCESS`;
  const errorType = `${fetchType}_ERROR`;

  const url = createUrl(endpoint(action), params ? params(action) : undefined);

  return ajax.getJSON(url).pipe(
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
    startWith({ ...action, type: requestType })
  );
};

/**
 * This is a generic epic for grouped data fetching.
 * Instead of repeat things like checking the cached data in Redux store, or grouping streams, we simply use this generic epic.
 * If one of the currently running streams (which are grouped by a function) hits again, it is ignored and the currently running stream
 * continues (thanks to exhaustMap).
 */
const groupedFetchRequest = ({
  type,
  groupActionsBy,
  selectCachedData,
  endpoint,
  params,
  processResponse,
  schema
}) => (action$, state$) =>
  action$.pipe(
    ofType(type),
    // If there is cachedData, we filter the stream.
    filterByCachedData(state$, selectCachedData),
    // Grouping the actions by a function.
    groupBy(action => groupActionsBy(action)),
    mergeMap(groupedAction$ =>
      groupedAction$.pipe(
        // exhaustMap: Only the currently running stream will continue.
        // Next ones will be ignored until it is finished.
        exhaustMap(action =>
          getRequest({
            action,
            endpoint,
            params,
            processResponse,
            schema
          })
        )
      )
    )
  );

const fetchPopularMoviesEpic = groupedFetchRequest({
  type: actionTypes.FETCH_POPULAR_MOVIES,
  groupActionsBy: ({ pageId }) => pageId,
  endpoint: () => "/movie/popular",
  params: ({ pageId }) => ({ page: pageId }),
  schema: {
    results: [schemas.movieSchema]
  }
});

const fetchMovieEpic = groupedFetchRequest({
  type: actionTypes.FETCH_MOVIE,
  groupActionsBy: action => action.movieId,
  selectCachedData: (state, action) =>
    selectors.selectMovie(state, action.movieId),
  endpoint: action => `/movie/${action.movieId}`,
  schema: schemas.movieSchema
});

const fetchPersonEpic = groupedFetchRequest({
  type: actionTypes.FETCH_PERSON,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPerson(state, personId),
  endpoint: action => `/person/${action.personId}`,
  schema: schemas.personSchema
});

const fetchRecommendationsEpic = groupedFetchRequest({
  type: actionTypes.FETCH_MOVIE_RECOMMENDATIONS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieRecommendations(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/recommendations`,
  processResponse: (response, { movieId }) => ({ ...response, movieId }),
  schema: schemas.movieRecommendationSchema
});

const fetchGenresEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_GENRES),
    switchMap(action =>
      getRequest({
        action,
        endpoint: () => "/genre/movie/list",
        schema: { genres: [schemas.genreSchema] }
      })
    )
  );

const fetchMovieCreditsEpic = groupedFetchRequest({
  type: actionTypes.FETCH_MOVIE_CREDITS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieCredits(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/credits`,
  schema: schemas.movieCreditSchema
});

const fetchPersonCreditsEpic = groupedFetchRequest({
  type: actionTypes.FETCH_PERSON_MOVIE_CREDITS,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPersonCredits(state, personId),
  endpoint: ({ personId }) => `/person/${personId}/movie_credits`,
  schema: schemas.personCreditSchema
});

const fetchPopularPeopleEpic = groupedFetchRequest({
  type: actionTypes.FETCH_POPULAR_PEOPLE,
  groupActionsBy: ({ pageId }) => pageId,
  endpoint: () => "/person/popular",
  params: ({ pageId }) => ({ page: pageId }),
  schema: { results: [schemas.personSchema] }
});

const fetchMovieVideosEpic = groupedFetchRequest({
  type: actionTypes.FETCH_MOVIE_VIDEOS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieVideos(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/videos`,
  schema: schemas.movieVideosSchema
});

const fetchMovieImagesEpic = groupedFetchRequest({
  type: actionTypes.FETCH_MOVIE_IMAGES,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieImages(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/images`,
  schema: schemas.movieImageSchema
});

const fetchPersonImagesEpic = groupedFetchRequest({
  type: actionTypes.FETCH_PERSON_IMAGES,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPersonImages(state, personId),
  endpoint: ({ personId }) => `/person/${personId}/images`,
  schema: schemas.personImageSchema
});

// We don't select "cachedData" to force a new request on every search.
const fetchMovieSearchEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_MOVIE_SEARCH),
    switchMap(action =>
      getRequest({
        action,
        endpoint: () => "/search/movie",
        params: ({ query, pageId }) => ({ query, page: pageId }),
        schema: { results: [schemas.movieSchema] }
      })
    )
  );

// We don't select "cachedData" to force a new request on every search.
const fetchPersonSearchEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_PERSON_SEARCH),
    switchMap(action =>
      getRequest({
        action,
        endpoint: () => "/search/person",
        params: ({ query, pageId }) => ({ query, page: pageId }),
        schema: { results: [schemas.personSchema] }
      })
    )
  );

// We don't select "cachedData" to force a new request on every search.
const fetchSearchEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.FETCH_SEARCH),
    debounceTime(600),
    filter(action => action.query),
    distinctUntilChanged(),
    switchMap(action => {
      const { pageId, query } = action;
      const params = {
        query,
        page: pageId
      };
      const fetchType = action.type;
      const requestType = `${fetchType}_REQUEST`;
      const successType = `${fetchType}_SUCCESS`;
      const errorType = `${fetchType}_ERROR`;
      return forkJoin(
        ajax.getJSON(createUrl("/search/movie", params)),
        ajax.getJSON(createUrl("/search/person", params))
      ).pipe(
        map(([movies, people]) => /*TODO: NORMALIZE*/ ""),
        startWith({ ...action, type: requestType })
      );
    })
  );

const rootEpic = combineEpics(
  fetchPopularMoviesEpic,
  fetchMovieEpic,
  fetchPersonEpic,
  fetchRecommendationsEpic,
  fetchGenresEpic,
  fetchMovieCreditsEpic,
  fetchPersonCreditsEpic,
  fetchPopularPeopleEpic,
  fetchMovieVideosEpic,
  fetchMovieImagesEpic,
  fetchPersonImagesEpic,
  fetchMovieSearchEpic,
  fetchPersonSearchEpic,
  fetchSearchEpic
);

export default rootEpic;
