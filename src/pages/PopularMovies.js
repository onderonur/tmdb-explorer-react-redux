import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMoviesRequest } from "actions";
import MovieCard from "containers/MovieCard";
import InfiniteGridList from "components/InfiniteGridList";
import {
  selectIsFetchingPopularMovies,
  selectPopularMoviesNextPage,
  selectPopularMovieIds
} from "reducers";

function renderItem(movieId) {
  return (
    <li>
      <MovieCard movieId={movieId} />
    </li>
  );
}

function PopularMovies() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectIsFetchingPopularMovies(state));
  const nextPage = useSelector(state => selectPopularMoviesNextPage(state));
  const movieIds = useSelector(state => selectPopularMovieIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularMoviesRequest(nextPage));
  }

  return (
    <InfiniteGridList
      items={movieIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={renderItem}
    />
  );
}

export default PopularMovies;
