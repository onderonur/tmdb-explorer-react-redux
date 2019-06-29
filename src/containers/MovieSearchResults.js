import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieSearch } from "actions";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import MovieCard from "./MovieCard";
import {
  selectMovieSearchResultIds,
  selectIsFetchingMovieSearchResults,
  selectMovieSearchResultsNextPage,
} from "reducers";

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
    <InfiniteGridFeed
      items={movieIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={movieId => <MovieCard key={movieId} movieId={movieId} />}
    />
  );
}

export default MovieSearchResults;
