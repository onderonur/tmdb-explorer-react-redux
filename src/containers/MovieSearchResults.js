import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieSearch } from "actions";
import InfiniteGridList from "components/InfiniteGridList";
import MovieCard from "./MovieCard";
import {
  selectMovieSearchResultIds,
  selectIsFetchingMovieSearchResults,
  selectMovieSearchResultsNextPage
} from "reducers";

function renderItem(movieId) {
  return <MovieCard movieId={movieId} />;
}

function MovieSearchResults({ query }) {
  const dispatch = useDispatch();
  const movieIds = useSelector(state =>
    selectMovieSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectIsFetchingMovieSearchResults(state, query)
  );
  const nextPage = useSelector(state =>
    selectMovieSearchResultsNextPage(state, query)
  );

  function handleLoadMore() {
    dispatch(fetchMovieSearch(query, nextPage));
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

export default MovieSearchResults;
