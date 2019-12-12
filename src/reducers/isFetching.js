import { combineReducers } from "redux";
import * as actions from "actions";
import createIsFetching from "./higherOrderReducers/createIsFetching";
import createByKey from "./higherOrderReducers/createByKey";

const isFetching = combineReducers({
  genres: createIsFetching(actions.fetchGenres),
  moviesById: createByKey(
    action => action.payload?.movieId,
    createIsFetching(actions.fetchMovie)
  ),
  peopleById: createByKey(
    action => action.payload?.personId,
    createIsFetching(actions.fetchPerson)
  ),
  movieVideosByMovieId: createByKey(
    action => action.payload?.movieId,
    createIsFetching(actions.fetchMovieVideos)
  ),
  movieCreditsByMovieId: createByKey(
    action => action.payload?.movieId,
    createIsFetching(actions.fetchMovieCredits)
  ),
  movieRecommendationsByMovieId: createByKey(
    action => action.payload?.movieId,
    createIsFetching(actions.fetchRecommendations)
  ),
  movieImagesByMovieId: createByKey(
    action => action.payload?.movieId,
    createIsFetching(actions.fetchMovieImages)
  ),
  personImagesByPersonId: createByKey(
    action => action.payload?.personId,
    createIsFetching(actions.fetchPersonImages)
  ),
  personCreditsByPersonId: createByKey(
    action => action.payload?.personId,
    createIsFetching(actions.fetchPersonCredits)
  ),
  popularMovies: createIsFetching(actions.fetchPopularMovies),
  popularPeople: createIsFetching(actions.fetchPopularPeople),
  search: createIsFetching(actions.fetchSearch),
  movieSearchResults: createIsFetching(actions.fetchMovieSearch),
  personSearchResults: createIsFetching(actions.fetchPersonSearch)
});

export default isFetching;

export const selectors = {
  selectIsFetchingGenres: state => state.genres,
  selectIsFetchingMovie: (state, movieId) => state.moviesById[movieId],
  selectIsFetchingPerson: (state, personId) => state.peopleById[personId],
  selectIsFetchingPopularMovies: state => state.popularMovies,
  selectIsFetchingPopularPeople: state => state.popularPeople,
  selectIsFetchingMovieCredits: (state, movieId) =>
    state.movieCreditsByMovieId[movieId],
  selectIsFetchingMovieVideos: (state, movieId) =>
    state.movieVideosByMovieId[movieId],
  selectIsFetchingMovieRecommendations: (state, movieId) =>
    state.movieRecommendationsByMovieId[movieId],
  selectIsFetchingMovieImages: (state, movieId) =>
    state.movieImagesByMovieId[movieId],
  selectIsFetchingPersonImages: (state, personId) =>
    state.personImagesByPersonId[personId],
  selectIsFetchingPersonCredits: (state, personId) =>
    state.personCreditsByPersonId[personId],
  selectIsFetchingSearch: state => state.search,
  selectIsFetchingMovieSearchResults: state => state.movieSearchResults,
  selectIsFetchingPersonSearchResults: state => state.personSearchResults
};
