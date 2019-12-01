import * as actionTypes from "constants/actionTypes";
import { DEFAULT_FIRST_PAGE } from "reducers/higherOrderReducers/createPagination";
import { createAction } from "@reduxjs/toolkit";

export const toggleDrawer = createAction("drawer/toggle");

export const fetchPopularMovies = createAction(
  "movie/fetchPopular",
  pageId => ({ payload: { pageId } })
);

export const fetchMovie = createAction(
  "movie/fetch",
  (movieId, requiredFields) => ({
    payload: { movieId, requiredFields }
  })
);

export const fetchPerson = createAction(
  "person/fetch",
  (personId, requiredFields) => ({
    payload: {
      personId,
      requiredFields
    }
  })
);

export const fetchRecommendations = createAction(
  "movie/fetchRecommendations",
  movieId => ({ payload: { movieId } })
);

export const fetchGenres = createAction("genres/fetch");

export const fetchMovieCredits = movieId => ({
  type: actionTypes.FETCH_MOVIE_CREDITS,
  movieId
});

export const fetchPersonCredits = personId => ({
  type: actionTypes.FETCH_PERSON_MOVIE_CREDITS,
  personId
});

export const fetchPopularPeople = createAction(
  "person/fetchPopular",
  pageId => ({ payload: { pageId } })
);

export const fetchMovieVideos = movieId => ({
  type: actionTypes.FETCH_MOVIE_VIDEOS,
  movieId
});

export const fetchMovieImages = movieId => ({
  type: actionTypes.FETCH_MOVIE_IMAGES,
  movieId
});

export const fetchPersonImages = personId => ({
  type: actionTypes.FETCH_PERSON_IMAGES,
  personId
});

export const fetchSearch = query => ({
  type: actionTypes.FETCH_SEARCH,
  query,
  pageId: DEFAULT_FIRST_PAGE
});

export const fetchMovieSearch = (query, pageId) => ({
  type: actionTypes.FETCH_MOVIE_SEARCH,
  query,
  pageId
});

export const fetchPersonSearch = (query, pageId) => ({
  type: actionTypes.FETCH_PERSON_SEARCH,
  query,
  pageId
});
