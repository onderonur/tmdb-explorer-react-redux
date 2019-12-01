import { put, take, fork, all, call, select } from "redux-saga/effects";
import { getFetchTypes, verifyCachedData } from "utils";
import * as schemas from "schemas";
import * as actions from "actions";
import { BASE_API_URL } from "constants/urls";
import queryString from "query-string";
import { normalize } from "normalizr";
import { selectors } from "reducers";

const api_key = process.env.REACT_APP_API_KEY;

const createUrl = (endpoint, params = {}) =>
  `${BASE_API_URL}${endpoint}?${queryString.stringify({
    ...params,
    api_key
  })}`;

function* fetcherSaga({
  action,
  endpoint,
  params,
  schema,
  processResponse,
  cachedData: { selector, args } = {}
}) {
  const baseType = action.type;
  const payload = action.payload || {};
  const { requestType, successType, errorType } = getFetchTypes(baseType);
  try {
    // TODO: Check "isFetching" or group actions like streams in epics.
    const cachedData = selector ? yield select(selector, args) : null;
    const verified = yield call(
      verifyCachedData,
      cachedData,
      payload.requiredFields
    );
    // If there is a "verified" cached data, we don't fetch it again.
    if (!verified) {
      yield put({ type: requestType, payload });
      const url = yield call(createUrl, endpoint, params);
      // TODO: May use "axios" etc instead.
      const response = yield call(fetch, url);
      let json = yield call([response, "json"]);
      // Process the response if any additional info is required for reducers or normalization.
      json = processResponse ? processResponse(json) : json;
      // Normalize the response, if a schema is given.
      json = schema ? normalize(json, schema) : json;
      // Dispatch success action.
      yield put({
        type: successType,
        payload: { ...payload, response: json }
      });
    }
  } catch (error) {
    // Dispatch error action.
    yield put({ type: errorType, payload: { ...payload, error } });
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchGenres() {
  const action = yield take(actions.fetchGenres);
  yield fork(fetcherSaga, {
    action,
    endpoint: "/genre/movie/list",
    schema: { genres: [schemas.genreSchema] }
  });
}

function* watchFetchPopularMovies() {
  while (true) {
    const action = yield take(actions.fetchPopularMovies);
    const { pageId } = action.payload;
    yield fork(fetcherSaga, {
      action,
      endpoint: "/movie/popular",
      params: { page: pageId },
      schema: { results: [schemas.movieSchema] }
    });
  }
}

function* watchFetchPopularPeople() {
  while (true) {
    const action = yield take(actions.fetchPopularPeople);
    const { pageId } = action.payload;
    yield fork(fetcherSaga, {
      action,
      endpoint: "/person/popular",
      params: { page: pageId },
      schema: { results: [schemas.personSchema] }
    });
  }
}

function* watchFetchMovie() {
  while (true) {
    const action = yield take(actions.fetchMovie);
    const { movieId } = action.payload;
    yield fork(fetcherSaga, {
      action,
      endpoint: `/movie/${movieId}`,
      schema: schemas.movieSchema,
      cachedData: {
        selector: selectors.selectMovie,
        args: movieId
      }
    });
  }
}

function* watchFetchPerson() {
  while (true) {
    const action = yield take(actions.fetchPerson);
    const { personId } = action.payload;
    yield fork(fetcherSaga, {
      action,
      endpoint: `/person/${personId}`,
      schema: schemas.personSchema,
      cachedData: {
        selector: selectors.selectPerson,
        args: personId
      }
    });
  }
}

function* watchFetchRecommendations() {
  while (true) {
    const action = yield take(actions.fetchRecommendations);
    const { movieId } = action.payload;
    yield fork(fetcherSaga, {
      action,
      endpoint: `/movie/${movieId}/recommendations`,
      processResponse: response => ({ ...response, movieId }),
      schema: schemas.movieRecommendationSchema,
      cachedData: {
        selector: selectors.selectMovieRecommendations,
        args: movieId
      }
    });
  }
}

export default function* root() {
  yield all([
    fork(watchFetchGenres),
    fork(watchFetchPopularMovies),
    fork(watchFetchPopularPeople),
    fork(watchFetchMovie),
    fork(watchFetchPerson),
    fork(watchFetchRecommendations)
  ]);
}
