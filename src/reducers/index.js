import { combineReducers } from "redux";
import entities, * as fromEntities from "./entities";
import pagination, * as fromPagination from "./pagination";
import isFetching, * as fromIsFetching from "./isFetching";
import drawer, * as fromDrawer from "./drawer";

const rootReducer = combineReducers({
  entities,
  pagination,
  isFetching,
  drawer
});

// Default export is the "reducer".
export default rootReducer;

// Selectors

// We will use these selectors in out components.
// So, we won't need to update every single of those selector calls if the state shape changes in the future.
// By this usage, the "state" parameter of selectors in the reducer files will be the state slice of the same reducer in that file.
// Because of we are using the same selector name in the reducer file, we can't use same name again.
// Thus, we used "namespace import syntax" (i.e. "* as fromEntities").

// Entities Selectors
export const selectMovie = (state, id) =>
  fromEntities.selectMovie(state.entities, id);

export const selectMovies = (state, movieIds) =>
  fromEntities.selectMovies(state.entities, movieIds);

export const selectGenre = (state, id) =>
  fromEntities.selectGenre(state.entities, id);

export const selectMovieCredits = (state, movieId) =>
  fromEntities.selectMovieCredits(state.entities, movieId);

export const selectCastCredits = (state, castCreditId) =>
  fromEntities.selectCastCredits(state.entities, castCreditId);

export const selectPerson = (state, id) =>
  fromEntities.selectPerson(state.entities, id);

export const selectPeople = (state, personIds) =>
  fromEntities.selectPeople(state.entities, personIds);

export const selectPersonCredits = (state, personId) =>
  fromEntities.selectPersonCredits(state.entities, personId);

export const selectVideo = (state, videoId) =>
  fromEntities.selectVideo(state.entities, videoId);

export const selectMovieVideos = (state, movieId) =>
  fromEntities.selectMovieVideos(state.entities, movieId);

export const selectMovieRecommendations = (state, movieId) =>
  fromEntities.selectMovieRecommendations(state.entities, movieId);

export const selectMovieImages = (state, movieId) =>
  fromEntities.selectMovieImages(state.entities, movieId);

export const selectPersonImages = (state, personId) =>
  fromEntities.selectPersonImages(state.entities, personId);

// Drawer selectors
export const selectIsDrawerOpen = state =>
  fromDrawer.selectIsDrawerOpen(state.drawer);

// IsFetching Selectors
export const selectIsFetchingGenres = state =>
  fromIsFetching.selectIsFetchingGenres(state.isFetching);

export const selectIsFetchingMovie = (state, movieId) =>
  fromIsFetching.selectIsFetchingMovie(state.isFetching, movieId);

export const selectIsFetchingPerson = (state, personId) =>
  fromIsFetching.selectIsFetchingPerson(state.isFetching, personId);

export const selectIsFetchingPopularMovies = state =>
  fromIsFetching.selectIsFetchingPopularMovies(state.isFetching);

export const selectIsFetchingPopularPeople = state =>
  fromIsFetching.selectIsFetchingPopularPeople(state.isFetching);

export const selectIsFetchingMovieCredits = (state, movieId) =>
  fromIsFetching.selectIsFetchingMovieCredits(state.isFetching, movieId);

export const selectIsFetchingMovieVideos = (state, movieId) =>
  fromIsFetching.selectIsFetchingMovieVideos(state.isFetching, movieId);

export const selectIsFetchingMovieImages = (state, movieId) =>
  fromIsFetching.selectIsFetchingMovieImages(state.isFetching, movieId);

export const selectIsFetchingPersonImages = (state, personId) =>
  fromIsFetching.selectIsFetchingPersonImages(state.isFetching, personId);

export const selectIsFetchingMovieRecommendations = (state, movieId) =>
  fromIsFetching.selectIsFetchingMovieRecommendations(
    state.isFetching,
    movieId
  );

export const selectIsFetchingPersonCredits = (state, personId) =>
  fromIsFetching.selectIsFetchingPersonCredits(state.isFetching, personId);

export const selectIsFetchingMovieSearchResults = (state, query) =>
  fromIsFetching.selectIsFetchingMovieSearchResults(state.isFetching);

export const selectIsFetchingPersonSearchResults = (state, query) =>
  fromIsFetching.selectIsFetchingPersonSearchResults(state.isFetching, query);

// Pagination Selectors
export const selectPopularMovieIds = state =>
  fromPagination.selectPopularMovieIds(state.pagination);
export const selectPopularMoviesNextPage = state =>
  fromPagination.selectPopularMoviesNextPage(state.pagination);

export const selectPopularPeopleIds = state =>
  fromPagination.selectPopularPeopleIds(state.pagination);
export const selectPopularPeopleNextPage = state =>
  fromPagination.selectPopularPeopleNextPage(state.pagination);

export const selectMovieSearchResultIds = (state, query) =>
  fromPagination.selectMovieSearchResultIds(state.pagination, query);
export const selectMovieSearchResultsNextPage = (state, query) =>
  fromPagination.selectMovieSearchResultsNextPage(state.pagination, query);
export const selectMovieSearchResultsTotalCount = (state, query) =>
  fromPagination.selectMovieSearchResultsTotalCount(state.pagination, query);

export const selectPersonSearchResultIds = (state, query) =>
  fromPagination.selectPersonSearchResultIds(state.pagination, query);
export const selectPersonSearchResultsNextPage = (state, query) =>
  fromPagination.selectPersonSearchResultsNextPage(state.pagination, query);
export const selectPersonSearchResultsTotalCount = (state, query) =>
  fromPagination.selectPersonSearchResultsTotalCount(state.pagination, query);
