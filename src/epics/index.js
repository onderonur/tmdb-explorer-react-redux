import * as actionTypes from "constants/actionTypes";
// import * as actions from "actions";
import * as schemas from "schemas";
import { ofType, combineEpics } from "redux-observable";
import {
  map,
  catchError,
  filter,
  mergeMap,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { BASE_API_URL } from "constants/urls";
import { normalize } from "normalizr";
import { of, forkJoin, merge } from "rxjs";
import queryString from "query-string";
import { getFetchTypes } from "utils";

const api_key = process.env.REACT_APP_API_KEY;

const createUrl = (endpoint, params = {}) =>
  `${BASE_API_URL}${endpoint}?${queryString.stringify({
    ...params,
    api_key
  })}`;

const getRequest = (endpoint, params) =>
  ajax.getJSON(createUrl(endpoint, params), { "Cache-Control": "no-cache" });

const mapWithFetchTypes = () =>
  map(action => {
    const fetchTypes = getFetchTypes(action.type);
    return [action, fetchTypes];
  });

// We don't select "cachedData" to force a new request on every search.
const fetchSearchEpic = (action$, state$) =>
  merge(
    action$.pipe(
      ofType(actionTypes.FETCH_SEARCH),
      mapWithFetchTypes(),
      map(([action, { requestType, cancelType }]) => ({
        type: action.query ? requestType : cancelType
      }))
    ),
    action$.pipe(
      ofType(actionTypes.FETCH_SEARCH),
      debounceTime(800),
      distinctUntilChanged(),
      filter(action => action.query),
      mapWithFetchTypes(),
      switchMap(([action, { successType, errorType }]) => {
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
              "FETCH_MOVIE_SEARCH"
            );
            const { successType: personSearchSuccessType } = getFetchTypes(
              "FETCH_PERSON_SEARCH"
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
          mergeMap(actions => actions),
          // Cancel the requests when a new "FETCH_SEARCH" action comes in.
          takeUntil(action$.pipe(ofType(actionTypes.FETCH_SEARCH))),
          catchError(() => of({ type: errorType }))
        );
      })
    )
  );

const rootEpic = combineEpics(fetchSearchEpic);

export default rootEpic;
