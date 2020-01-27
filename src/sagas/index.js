import {
  put,
  delay,
  fork,
  all,
  call,
  select,
  takeEvery,
  takeLatest,
  cancelled
} from "redux-saga/effects";
import { getFetchTypes, verifyCachedData, createUrl } from "utils";
import * as schemas from "schemas";
import * as actions from "actions";
import { normalize } from "normalizr";
import { selectors } from "reducers";
import axios from "axios";

const CancelToken = axios.CancelToken;

// GET request with cancellation
function* callAPI(endpoint, params, schema, processData, config = {}) {
  const source = CancelToken.source();
  const cancelToken = source.token;
  try {
    const url = yield call(createUrl, endpoint, params);
    const response = yield call([axios, "get"], url, {
      ...config,
      cancelToken
    });
    let { data } = response;
    // Process the data if any additional info is required for reducers or normalization.
    data = processData ? processData(data) : data;
    // Normalize the data, if a schema is given.
    data = schema ? normalize(data, schema) : data;
    return data;
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

function* fetcherSaga({
  action,
  endpoint,
  params,
  schema,
  processData,
  cachedData
}) {
  const { type, payload = {} } = action;
  const { requestType, successType, errorType } = getFetchTypes(type);
  try {
    // TODO: Check "isFetching" or group actions like streams in epics. (takeLeadingPerKey etc)
    const verified = yield call(
      verifyCachedData,
      cachedData,
      payload.requiredFields
    );
    // If there is a "verified" cached data, we don't fetch it again.
    if (!verified) {
      yield put({ type: requestType, payload });
      let data = yield call(callAPI, endpoint, params, schema, processData);
      // Dispatch success action.
      yield put({
        type: successType,
        payload: { ...payload, response: data }
      });
    }
  } catch (error) {
    // Dispatch error action.
    yield put({ type: errorType, payload: { ...payload, error } });
  }
}

function* fetchGenresSaga(action) {
  yield call(fetcherSaga, {
    action,
    endpoint: "/genre/movie/list",
    schema: { genres: [schemas.genreSchema] }
  });
}

function* fetchPopularMoviesSaga(action) {
  const { page } = action.payload;
  yield call(fetcherSaga, {
    action: action,
    endpoint: "/movie/popular",
    params: { page },
    schema: { results: [schemas.movieSchema] }
  });
}

function* fetchPopularPeopleSaga(action) {
  const { page } = action.payload;
  yield call(fetcherSaga, {
    action,
    endpoint: "/person/popular",
    params: { page },
    schema: { results: [schemas.personSchema] }
  });
}

function* fetchMovieSaga(action) {
  const { movieId } = action.payload;
  const movie = yield select(selectors.selectMovie, movieId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/movie/${movieId}`,
    schema: schemas.movieSchema,
    cachedData: movie
  });
}

function* fetchPersonSaga(action) {
  const { personId } = action.payload;
  const person = yield select(selectors.selectPerson, personId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/person/${personId}`,
    schema: schemas.personSchema,
    cachedData: person
  });
}

function* fetchRecommendationsSaga(action) {
  const { movieId } = action.payload;
  const recommendations = yield select(
    selectors.selectMovieRecommendations,
    movieId
  );
  yield call(fetcherSaga, {
    action,
    endpoint: `/movie/${movieId}/recommendations`,
    processData: response => ({ ...response, movieId }),
    schema: schemas.movieRecommendationSchema,
    cachedData: recommendations
  });
}

function* fetchMovieCreditsSaga(action) {
  const { movieId } = action.payload;
  const movieCredits = yield select(selectors.selectMovieCredits, movieId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/movie/${movieId}/credits`,
    schema: schemas.movieCreditSchema,
    cachedData: movieCredits
  });
}

function* fetchMovieVideosSaga(action) {
  const { movieId } = action.payload;
  const movieVideos = yield select(selectors.selectMovieVideos, movieId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/movie/${movieId}/videos`,
    schema: schemas.movieVideoSchema,
    cachedData: movieVideos
  });
}

function* fetchMovieImagesSaga(action) {
  const { movieId } = action.payload;
  const movieImages = yield select(selectors.selectMovieImages, movieId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/movie/${movieId}/images`,
    schema: schemas.movieImageSchema,
    cachedData: movieImages
  });
}

function* fetchPersonCreditsSaga(action) {
  const { personId } = action.payload;
  const personCredits = yield select(selectors.selectPersonCredits, personId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/person/${personId}/movie_credits`,
    schema: schemas.personCreditSchema,
    cachedData: personCredits
  });
}

function* fetchPersonImagesSaga(action) {
  const { personId } = action.payload;
  const personImages = yield select(selectors.selectPersonImages, personId);
  yield call(fetcherSaga, {
    action,
    endpoint: `/person/${personId}/images`,
    schema: schemas.personImageSchema,
    cachedData: personImages
  });
}

function* fetchMovieSearchSaga(action) {
  const { query, page } = action.payload;
  yield call(fetcherSaga, {
    action,
    endpoint: `/search/movie`,
    params: { query, page },
    schema: { results: [schemas.movieSchema] }
  });
}

function* fetchPersonSearchSaga(action) {
  const { query, page } = action.payload;
  yield call(fetcherSaga, {
    action,
    endpoint: `/search/person`,
    params: { query, page },
    schema: { results: [schemas.personSchema] }
  });
}

function* fetchSearchSaga(action) {
  const { type, payload } = action;
  const { requestType, successType, errorType, cancelType } = getFetchTypes(
    type
  );
  const { query } = payload;
  if (query) {
    yield put({ type: requestType });
    yield delay(800);
    try {
      yield all([
        call(fetchMovieSearchSaga, {
          ...action,
          type: actions.fetchMovieSearch
        }),
        call(fetchPersonSearchSaga, {
          ...action,
          type: actions.fetchPersonSearch
        })
      ]);
      yield put({ type: successType });
    } catch (error) {
      yield put({ type: errorType, error });
    }
  } else {
    yield put({ type: cancelType });
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchGenres() {
  yield takeEvery(actions.fetchGenres, fetchGenresSaga);
}

function* watchFetchPopularMovies() {
  yield takeEvery(actions.fetchPopularMovies, fetchPopularMoviesSaga);
}

function* watchFetchPopularPeople() {
  yield takeEvery(actions.fetchPopularPeople, fetchPopularPeopleSaga);
}

function* watchFetchMovie() {
  yield takeEvery(actions.fetchMovie, fetchMovieSaga);
}

function* watchFetchPerson() {
  yield takeEvery(actions.fetchPerson, fetchPersonSaga);
}

function* watchFetchRecommendations() {
  yield takeEvery(actions.fetchRecommendations, fetchRecommendationsSaga);
}

function* watchFetchMovieCredits() {
  yield takeEvery(actions.fetchMovieCredits, fetchMovieCreditsSaga);
}

function* watchFetchMovieVideos() {
  yield takeEvery(actions.fetchMovieVideos, fetchMovieVideosSaga);
}

function* watchFetchMovieImages() {
  yield takeEvery(actions.fetchMovieImages, fetchMovieImagesSaga);
}

function* watchFetchPersonCredits() {
  yield takeEvery(actions.fetchPersonCredits, fetchPersonCreditsSaga);
}

function* watchFetchPersonImages() {
  yield takeEvery(actions.fetchPersonImages, fetchPersonImagesSaga);
}

function* watchFetchMovieSearch() {
  yield takeEvery(actions.fetchMovieSearch, fetchMovieSearchSaga);
}

function* watchFetchPersonSearch() {
  yield takeEvery(actions.fetchPersonSearch, fetchPersonSearchSaga);
}

function* watchFetchSearch() {
  yield takeLatest(actions.fetchSearch, fetchSearchSaga);
}

export default function* root() {
  yield all([
    fork(watchFetchGenres),
    fork(watchFetchPopularMovies),
    fork(watchFetchPopularPeople),
    fork(watchFetchMovie),
    fork(watchFetchPerson),
    fork(watchFetchRecommendations),
    fork(watchFetchMovieCredits),
    fork(watchFetchMovieVideos),
    fork(watchFetchPersonCredits),
    fork(watchFetchMovieImages),
    fork(watchFetchPersonImages),
    fork(watchFetchMovieSearch),
    fork(watchFetchPersonSearch),
    fork(watchFetchSearch)
  ]);
}
