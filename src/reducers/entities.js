import produce from "immer";
import merge from "lodash/merge";

const initialState = {
  movies: {},
  genres: {},
  movieCredits: {},
  castCredits: {},
  people: {},
  creditsOfPeople: {},
  videos: {},
  movieVideos: {},
  movieRecommendations: {}
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
export function selectMovieById(state, id) {
  return state.movies[id];
}

export function selectGenreById(state, id) {
  return state.genres[id];
}

export function selectMovieCreditsByMovieId(state, movieId) {
  return state.movieCredits[movieId];
}

// TODO: Genel olarak "cast" ve "creditCast" vs kullanımlarına bak. Basitleştir.
export function selectCastCreditById(state, castCreditId) {
  return state.castCredits[castCreditId];
}

export function selectPersonById(state, id) {
  return state.people[id];
}

export function selectCreditsOfPerson(state, personId) {
  return state.creditsOfPeople[personId];
}

export function selectVideo(state, videoId) {
  return state.videos[videoId];
}

export function selectMovieVideos(state, movieId) {
  return state.movieVideos[movieId]
    ? state.movieVideos[movieId].videos
    : undefined;
}

export function selectMovieRecommendations(state, movieId) {
  const recommendations = state.movieRecommendations[movieId];
  return recommendations ? recommendations.movies : undefined;
}
