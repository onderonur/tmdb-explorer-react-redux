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
  takeUntil,
  concatMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { BASE_API_URL } from "constants/urls";
import { normalize } from "normalizr";
import { of, forkJoin, merge } from "rxjs";
import queryString from "query-string";
import { getFetchTypes } from "utils";

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

const getRequest = (endpoint, params) =>
  ajax.getJSON(createUrl(endpoint, params), { "Cache-Control": "no-cache" });

const getRequestWithNormalization = ({
  action,
  endpoint,
  params = () => undefined,
  processResponse,
  schema
}) => {
  const { type: fetchType } = action;
  const { requestType, successType, errorType } = getFetchTypes(fetchType);

  return getRequest(endpoint(action), params(action)).pipe(
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
const groupedGetRequest = ({
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
          getRequestWithNormalization({
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

const fetchPopularMoviesEpic = groupedGetRequest({
  type: actionTypes.FETCH_POPULAR_MOVIES,
  groupActionsBy: ({ pageId }) => pageId,
  endpoint: () => "/movie/popular",
  params: ({ pageId }) => ({ page: pageId }),
  schema: {
    results: [schemas.movieSchema]
  }
});

const fetchMovieEpic = groupedGetRequest({
  type: actionTypes.FETCH_MOVIE,
  groupActionsBy: action => action.movieId,
  selectCachedData: (state, action) =>
    selectors.selectMovie(state, action.movieId),
  endpoint: action => `/movie/${action.movieId}`,
  schema: schemas.movieSchema
});

const fetchPersonEpic = groupedGetRequest({
  type: actionTypes.FETCH_PERSON,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPerson(state, personId),
  endpoint: action => `/person/${action.personId}`,
  schema: schemas.personSchema
});

const fetchRecommendationsEpic = groupedGetRequest({
  type: actionTypes.FETCH_MOVIE_RECOMMENDATIONS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieRecommendations(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/recommendations`,
  processResponse: (response, { movieId }) => ({ ...response, movieId }),
  schema: schemas.movieRecommendationSchema
});

const fetchMovieCreditsEpic = groupedGetRequest({
  type: actionTypes.FETCH_MOVIE_CREDITS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieCredits(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/credits`,
  schema: schemas.movieCreditSchema
});

const fetchPersonCreditsEpic = groupedGetRequest({
  type: actionTypes.FETCH_PERSON_MOVIE_CREDITS,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPersonCredits(state, personId),
  endpoint: ({ personId }) => `/person/${personId}/movie_credits`,
  schema: schemas.personCreditSchema
});

const fetchPopularPeopleEpic = groupedGetRequest({
  type: actionTypes.FETCH_POPULAR_PEOPLE,
  groupActionsBy: ({ pageId }) => pageId,
  endpoint: () => "/person/popular",
  params: ({ pageId }) => ({ page: pageId }),
  schema: { results: [schemas.personSchema] }
});

const fetchMovieVideosEpic = groupedGetRequest({
  type: actionTypes.FETCH_MOVIE_VIDEOS,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieVideos(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/videos`,
  schema: schemas.movieVideosSchema
});

const fetchMovieImagesEpic = groupedGetRequest({
  type: actionTypes.FETCH_MOVIE_IMAGES,
  groupActionsBy: ({ movieId }) => movieId,
  selectCachedData: (state, { movieId }) =>
    selectors.selectMovieImages(state, movieId),
  endpoint: ({ movieId }) => `/movie/${movieId}/images`,
  schema: schemas.movieImageSchema
});

const fetchPersonImagesEpic = groupedGetRequest({
  type: actionTypes.FETCH_PERSON_IMAGES,
  groupActionsBy: ({ personId }) => personId,
  selectCachedData: (state, { personId }) =>
    selectors.selectPersonImages(state, personId),
  endpoint: ({ personId }) => `/person/${personId}/images`,
  schema: schemas.personImageSchema
});

const fetchGenresEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_GENRES),
    switchMap(action =>
      getRequestWithNormalization({
        action,
        endpoint: () => "/genre/movie/list",
        schema: { genres: [schemas.genreSchema] }
      })
    )
  );

// We don't select "cachedData" to force a new request on every search.
const fetchMovieSearchEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.FETCH_MOVIE_SEARCH),
    switchMap(action =>
      getRequestWithNormalization({
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
      getRequestWithNormalization({
        action,
        endpoint: () => "/search/person",
        params: ({ query, pageId }) => ({ query, page: pageId }),
        schema: { results: [schemas.personSchema] }
      })
    )
  );

// We don't select "cachedData" to force a new request on every search.
const fetchSearchEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(actionTypes.FETCH_SEARCH),
      map(action => {
        const { type: fetchType, query } = action;
        const { requestType, cancelType } = getFetchTypes(fetchType);
        return { type: query ? requestType : cancelType };
      })
    ),
    action$.pipe(
      ofType(actionTypes.FETCH_SEARCH),
      debounceTime(500),
      distinctUntilChanged(),
      filter(action => action.query),
      switchMap(action => {
        const { type: fetchType } = action;
        const { successType, errorType } = getFetchTypes(fetchType);

        const { pageId, query } = action;

        const params = {
          query,
          page: pageId
        };

        return forkJoin(
          getRequest("/search/movie", params),
          getRequest("/search/person", params)
        ).pipe(
          map(responses => {
            const [movies, people] = responses;
            const normalizedMovies = normalize(movies, {
              results: [schemas.movieSchema]
            });
            const normalizedPeople = normalize(people, {
              results: [schemas.personSchema]
            });

            const { successType: movieSearchSuccessType } = getFetchTypes(
              actionTypes.FETCH_MOVIE_SEARCH
            );
            const { successType: personSearchSuccessType } = getFetchTypes(
              actionTypes.FETCH_PERSON_SEARCH
            );

            const actions = [
              {
                ...action,
                type: movieSearchSuccessType,
                response: normalizedMovies
              },
              {
                ...action,
                type: personSearchSuccessType,
                response: normalizedPeople
              },
              {
                type: successType
              }
            ];

            return actions;
          }),
          // TODO: mergeMap ile de bi dene. Ne işe yarıyor öğren. console.log'la filan da bak
          concatMap(actions => actions),
          // Cancel the requests when a new "FETCH_SEARCH" action comes in.
          takeUntil(action$.pipe(ofType(actionTypes.FETCH_SEARCH))),
          catchError(() => of({ type: errorType }))
        );
      })
    )
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
