import produce from "immer";
import merge from "lodash/merge";

const initialState = {
  movies: {},
  genres: {},
  movieCredits: {},
  castCredits: {},
  people: {},
  personCredits: {},
  videos: {},
  movieVideos: {},
  movieRecommendations: {},
  images: {},
  movieImages: {},
  personImages: {}
};

function entities(state = initialState, action) {
  return produce(state, draft => {
    if (action.response && action.response.entities) {
      draft = merge(draft, action.response.entities);
    }
  });
}

// Default export is the "reducer".
export default entities;

// All the named exports are "selectors" of this state slice.
// The "state" parameter here is the same state slice as the "entities" reducer itself.
// No need to use it like "state.entities...".
export const selectMovie = (state, id) => state.movies[id];

export const selectMovies = (state, movieIds) =>
  movieIds.map(movieId => selectMovie(state, movieId));

export const selectGenre = (state, id) => state.genres[id];

export const selectMovieCredits = (state, movieId) =>
  state.movieCredits[movieId];

export const selectCastCredits = (state, castCreditId) =>
  state.castCredits[castCreditId];

export const selectPerson = (state, id) => state.people[id];

export const selectPeople = (state, personIds) =>
  personIds.map(personId => selectPerson(state, personId));

export const selectPersonCredits = (state, personId) =>
  state.personCredits[personId];

export const selectVideo = (state, videoId) => state.videos[videoId];

export const selectMovieVideos = (state, movieId) =>
  state.movieVideos[movieId] ? state.movieVideos[movieId].videos : undefined;

export const selectMovieRecommendations = (state, movieId) => {
  const recommendations = state.movieRecommendations[movieId];
  return recommendations ? recommendations.movies : undefined;
};

export const selectMovieImages = (state, movieId) => {
  const movieImages = state.movieImages[movieId];
  return movieImages ? movieImages.backdrops : undefined;
};

export const selectPersonImages = (state, personId) => {
  const personImages = state.personImages[personId];
  return personImages ? personImages.profiles : undefined;
};
