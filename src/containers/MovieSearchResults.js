import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieSearch } from "actions";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import MovieCard from "./MovieCard";
import { Typography } from "@material-ui/core";
import {
  selectMovieSearchResultIds,
  selectIsFetchingMovieSearchResults,
  selectMovieSearchResultsNextPage,
  selectMovieSearchResultsTotalCount
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
  const totalResults = useSelector(state =>
    selectMovieSearchResultsTotalCount(state, query)
  );

  function handleLoadMore() {
    dispatch(fetchMovieSearch(query, nextPage));
  }

  return (
    <>
      <Typography variant="h6">Search Results For: {query}</Typography>
      <Typography color="textSecondary">
        Total {totalResults} Results
      </Typography>
      <InfiniteGridFeed
        items={movieIds}
        loading={isFetching}
        hasNextPage={!!nextPage}
        onLoadMore={handleLoadMore}
        renderItem={movieId => <MovieCard key={movieId} movieId={movieId} />}
      />
    </>
  );
}

export default MovieSearchResults;
