import { DEFAULT_FIRST_PAGE } from "reducers/higherOrderReducers/createPagination";
import { createAction } from "@reduxjs/toolkit";

export const toggleDrawer = createAction("drawer/toggle");

export const fetchPopularMovies = createAction("movie/fetchPopular", page => ({
  payload: { page }
}));

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

export const fetchMovieCredits = createAction(
  "movies/fetchCredits",
  movieId => ({ payload: { movieId } })
);

export const fetchPersonCredits = createAction(
  "person/fetchCredits",
  personId => ({
    payload: { personId }
  })
);

export const fetchPopularPeople = createAction("person/fetchPopular", page => ({
  payload: { page }
}));

export const fetchMovieVideos = createAction("movie/fetchVideos", movieId => ({
  payload: { movieId }
}));

export const fetchMovieImages = createAction("movie/fetchImages", movieId => ({
  payload: { movieId }
}));

export const fetchPersonImages = createAction(
  "person/fetchImages",
  personId => ({
    payload: { personId }
  })
);

export const fetchSearch = createAction("search/fetch", query => ({
  payload: { query, page: DEFAULT_FIRST_PAGE }
}));

export const fetchMovieSearch = createAction("movie/search", (query, page) => ({
  payload: { query, page }
}));

export const fetchPersonSearch = createAction(
  "person/search",
  (query, page) => ({
    payload: { query, page }
  })
);
