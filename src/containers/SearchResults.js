import React, { useEffect } from "react";
import MovieSearchResults from "./MovieSearchResults";
import useQueryString from "hooks/useQueryString";
import PersonSearchResults from "./PersonSearchResults";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  selectMovieSearchTotalCount,
  selectPersonSearchTotalCount
} from "reducers/pagination";
import { useDispatch } from "react-redux";
import { fetchMovieSearch, fetchPersonSearch } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/paginate";

function SearchResults({
  location,
  history,
  match: {
    params: { searchType }
  }
}) {
  const { query } = useQueryString({ location });
  const dispatch = useDispatch();
  const totalMovieCount = useSelector(state =>
    selectMovieSearchTotalCount(state, query)
  );
  const totalPersonCount = useSelector(state =>
    selectPersonSearchTotalCount(state, query)
  );

  function handleChange(event, newValue) {
    history.push(`/search/${newValue}${location.search}`);
  }

  useEffect(() => {
    // We are fetching movies and people to show total counts on tab labels.
    dispatch(fetchMovieSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchPersonSearch(query, DEFAULT_FIRST_PAGE));
  }, [dispatch, query]);

  return (
    <>
      <Tabs value={searchType} onChange={handleChange}>
        <Tab value="movie" label={`Movies (${totalMovieCount})`} />
        <Tab value="person" label={`People (${totalPersonCount})`} />
      </Tabs>
      <Box marginTop={2}>
        {searchType === "movie" && <MovieSearchResults query={query} />}
        {searchType === "person" && <PersonSearchResults query={query} />}
      </Box>
    </>
  );
}

export default SearchResults;
