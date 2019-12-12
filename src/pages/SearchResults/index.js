import React, { useEffect } from "react";
import useQueryString from "hooks/useQueryString";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMovieSearch, fetchPersonSearch } from "actions";
import { DEFAULT_FIRST_PAGE } from "reducers/higherOrderReducers/createPagination";
import { selectors } from "reducers";
import useHistoryPush from "hooks/useHistoryPush";
import { useParams, useLocation } from "react-router-dom";
import SearchResultsHeader from "./SearchResultsHeader";
import MovieSearchResults from "./MovieSearchResults";
import PersonSearchResults from "./PersonSearchResults";

function SearchResults() {
  const { query } = useQueryString();
  const { search } = useLocation();
  const { searchType } = useParams();
  const historyPush = useHistoryPush();
  const dispatch = useDispatch();
  const totalMovieCount = useSelector(state =>
    selectors.selectMovieSearchResultsTotalCount(state, query)
  );
  const totalPersonCount = useSelector(state =>
    selectors.selectPersonSearchResultsTotalCount(state, query)
  );

  function handleChange(event, newValue) {
    historyPush(`/search/${newValue}${search}`);
  }

  useEffect(() => {
    // We are fetching movies and people to show total counts on tab labels.
    dispatch(fetchMovieSearch(query, DEFAULT_FIRST_PAGE));
    dispatch(fetchPersonSearch(query, DEFAULT_FIRST_PAGE));
  }, [dispatch, query]);

  const totalResults = {
    movie: totalMovieCount,
    person: totalPersonCount
  };

  return (
    <>
      <Tabs value={searchType} onChange={handleChange}>
        <Tab value="movie" label={`Movies (${totalMovieCount})`} />
        <Tab value="person" label={`People (${totalPersonCount})`} />
      </Tabs>
      <Box marginTop={2}>
        <SearchResultsHeader
          query={query}
          totalResults={totalResults[searchType]}
        />
        {searchType === "movie" && <MovieSearchResults query={query} />}
        {searchType === "person" && <PersonSearchResults query={query} />}
      </Box>
    </>
  );
}

export default SearchResults;
