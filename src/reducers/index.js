import { combineReducers } from "redux";
import entities, * as fromEntities from "./entities";
import { pagination } from "./pagination";
import isFetching, * as fromIsFetching from "./isFetching";
import drawer from "./drawer";

const rootReducer = combineReducers({
  entities,
  pagination,
  isFetching,
  drawer
});

// Default export is the "reducer".
export default rootReducer;

// Selectors
// Entities Selectors

// We will use this selector in out components.
// So, we won't need to update every single of those selector calls if the state shape changes in the future.
// Because of we are using the same selector name in the reducer file, we used namespace import syntax ("* as fromEntities").
// By this usage, the "state" parameter of selectors in the reducer files will be the state slice of the same reducer in that file.
// Named function example
export function selectMovieById(state, movieId) {
  return fromEntities.selectMovieById(state.entities, movieId);
}

// Arrow function example
export const selectGenreById = (state, genreId) =>
  fromEntities.selectGenreById(state.entities, genreId);

export const selectMovieCreditsByMovieId = (state, movieId) =>
  fromEntities.selectMovieCreditsByMovieId(state.entities, movieId);

export const selectCastCreditById = (state, castCreditId) =>
  fromEntities.selectCastCreditById(state.entities, castCreditId);

export const selectPersonById = (state, personId) =>
  fromEntities.selectPersonById(state.entities, personId);

export const selectCreditsOfPerson = (state, personId) =>
  fromEntities.selectCreditsOfPerson(state.entities, personId);

export const selectVideo = (state, videoId) =>
  fromEntities.selectVideo(state.entities, videoId);

export const selectMovieVideos = (state, movieId) =>
  fromEntities.selectMovieVideos(state.entities, movieId);

export const selectMovieRecommendations = (state, movieId) =>
  fromEntities.selectMovieRecommendations(state.entities, movieId);

// IsFetching Selectors

export const selectMovieIsFetching = (state, movieId) =>
  fromIsFetching.selectMovieIsFetching(state.isFetching, movieId);

export const selectPersonIsFetching = (state, personId) =>
  fromIsFetching.selectPersonIsFetching(state.isFetching, personId);

export const selectGenresIsFetching = state =>
  fromIsFetching.selectGenresIsFetching(state.isFetching);

export const selectMovieVideosIsFetching = (state, movieId) =>
  fromIsFetching.selectMovieVideosIsFetching(state.isFetching, movieId);

export const selectMovieCreditsIsFetching = (state, movieId) =>
  fromIsFetching.selectMovieCreditsIsFetching(state.isFetching, movieId);

export const selectMovieRecommendationsIsFetching = (state, movieId) =>
  fromIsFetching.selectMovieRecommendationsIsFetching(
    state.isFetching,
    movieId
  );
