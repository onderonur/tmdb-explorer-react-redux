import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "actions";
import MovieCard from "./MovieCard";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import {
  selectPopularMovieIds,
  selectPopularMoviesIsFetching,
  selectPopularMoviesNextPage
} from "reducers/pagination";

function PopularMovies() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectPopularMoviesIsFetching(state));
  const nextPage = useSelector(state => selectPopularMoviesNextPage(state));
  const movieIds = useSelector(state => selectPopularMovieIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularMovies(nextPage));
  }

  return (
    <InfiniteGridFeed
      items={movieIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={movieId => <MovieCard key={movieId} movieId={movieId} />}
    />
  );
}

export default PopularMovies;
