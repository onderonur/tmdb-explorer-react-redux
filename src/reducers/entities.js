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

export function entities(state = initialState, action) {
  return produce(state, draft => {
    if (action.response && action.response.entities) {
      draft = merge(draft, action.response.entities);
    }
  });
}

export function selectMovieById(state, id) {
  return state.entities.movies[id];
}

export function selectGenreById(state, id) {
  return state.entities.genres[id];
}

export function selectMovieCreditsByMovieId(state, movieId) {
  return state.entities.movieCredits[movieId];
}

// TODO: Genel olarak "cast" ve "creditCast" vs kullanımlarına bak. Basitleştir.
export function selectCastCreditById(state, id) {
  return state.entities.castCredits[id];
}

export function selectPersonById(state, id) {
  return state.entities.people[id];
}

export function selectCreditsOfPerson(state, personId) {
  return state.entities.creditsOfPeople[personId];
}

export function selectVideo({ entities: { videos } }, videoId) {
  return videos[videoId];
}

export function selectMovieVideos({ entities: { movieVideos } }, movieId) {
  return movieVideos[movieId] ? movieVideos[movieId].videos : undefined;
}

export function selectMovieRecommendations(state, movieId) {
  const recommendations = state.entities.movieRecommendations[movieId];
  return recommendations ? recommendations.movies : undefined;
}
