import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonSearch } from "actions";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import PersonCard from "./PersonCard";
import { Typography } from "@material-ui/core";
import {
  selectIsFetchingPersonSearchResults,
  selectPersonSearchResultsNextPage,
  selectPersonSearchResultsTotalCount,
  selectPersonSearchResultIds
} from "reducers";

function PersonSearchResults({ query }) {
  const dispatch = useDispatch();
  const personIds = useSelector(state =>
    selectPersonSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectIsFetchingPersonSearchResults(state, query)
  );
  const nextPage = useSelector(state =>
    selectPersonSearchResultsNextPage(state, query)
  );
  const totalResults = useSelector(state =>
    selectPersonSearchResultsTotalCount(state, query)
  );

  function handleLoadMore() {
    dispatch(fetchPersonSearch(query, nextPage));
  }

  return (
    <>
      <Typography variant="h6">Search Results For: {query}</Typography>
      <Typography color="textSecondary">
        Total {totalResults} Results
      </Typography>
      <InfiniteGridFeed
        items={personIds}
        loading={isFetching}
        hasNextPage={!!nextPage}
        onLoadMore={handleLoadMore}
        renderItem={personId => (
          <PersonCard key={personId} personId={personId} />
        )}
      />
    </>
  );
}

export default PersonSearchResults;
