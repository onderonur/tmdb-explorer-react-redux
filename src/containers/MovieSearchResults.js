import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieSearch } from "actions";
import useQueryString from "hooks/useQueryString";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import MovieCard from "./MovieCard";
import { Typography } from "@material-ui/core";
import {
  selectMovieSearchResultIds,
  selectMovieSearchIsFetching,
  selectMovieSearchNextPage,
  selectMovieSearchTotalCount
} from "reducers/pagination";

function MovieSearchResults({ location }) {
  const dispatch = useDispatch();
  const { query } = useQueryString({ location });
  const movieIds = useSelector(state =>
    selectMovieSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectMovieSearchIsFetching(state, query)
  );
  const nextPage = useSelector(state =>
    selectMovieSearchNextPage(state, query)
  );
  const totalResults = useSelector(state =>
    selectMovieSearchTotalCount(state, query)
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
