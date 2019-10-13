import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "actions";
import MovieCard from "containers/MovieCard";
import InfiniteGridList from "components/InfiniteGridList";
import { selectors } from "reducers";

function renderItem(movieId) {
  return (
    <li>
      <MovieCard movieId={movieId} />
    </li>
  );
}

function PopularMovies() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPopularMovies(state)
  );
  const nextPage = useSelector(state =>
    selectors.selectPopularMoviesNextPage(state)
  );
  const movieIds = useSelector(state => selectors.selectPopularMovieIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularMovies(nextPage));
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
