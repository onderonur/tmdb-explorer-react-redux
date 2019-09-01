import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "actions";
import MovieCard from "containers/MovieCard";
import InfiniteGridList from "components/InfiniteGridList";
import {
  selectIsFetchingPopularMovies,
  selectPopularMoviesNextPage,
  selectPopularMovieIds
} from "reducers";

function PopularMovies() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectIsFetchingPopularMovies(state));
  const nextPage = useSelector(state => selectPopularMoviesNextPage(state));
  const movieIds = useSelector(state => selectPopularMovieIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularMovies(nextPage));
  }

  return (
    <InfiniteGridList
      items={movieIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      keyExtractor={movieId => movieId}
      renderItem={movieId => <MovieCard key={movieId} movieId={movieId} />}
    />
  );
}

export default PopularMovies;
