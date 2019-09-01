import React, { useEffect } from "react";
import MovieSearchResults from "containers/MovieSearchResults";
import useQueryString from "hooks/useQueryString";
import PersonSearchResults from "containers/PersonSearchResults";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMovieSearch, fetchPersonSearch } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/createPagination";
import {
  selectMovieSearchResultsTotalCount,
  selectPersonSearchResultsTotalCount
} from "reducers";
import SearchResultsHeader from "components/SearchResultsHeader";

function SearchResults({
  location,
  history,
  match: {
    params: { searchType }
  }
}) {
  const { query } = useQueryString(location);
  const dispatch = useDispatch();
  const totalMovieCount = useSelector(state =>
    selectMovieSearchResultsTotalCount(state, query)
  );
  const totalPersonCount = useSelector(state =>
    selectPersonSearchResultsTotalCount(state, query)
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
        <SearchResultsHeader
          query={query}
          totalResults={
            searchType === "movie"
              ? totalMovieCount
              : searchType === "person"
              ? totalPersonCount
              : ""
          }
        />
        {searchType === "movie" && <MovieSearchResults query={query} />}
        {searchType === "person" && <PersonSearchResults query={query} />}
      </Box>
    </>
  );
}

export default SearchResults;
