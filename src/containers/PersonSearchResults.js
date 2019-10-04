import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonSearch } from "actions";
import InfiniteGridList from "components/InfiniteGridList";
import PersonCard from "./PersonCard";
import {
  selectIsFetchingPersonSearchResults,
  selectPersonSearchResultsNextPage,
  selectPersonSearchResultIds
} from "reducers";

function renderItem(personId) {
  return (
    <li>
      <PersonCard personId={personId} />
    </li>
  );
}

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

  function handleLoadMore() {
    dispatch(fetchPersonSearch(query, nextPage));
  }

  return (
    <InfiniteGridList
      items={personIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={renderItem}
    />
  );
}

export default PersonSearchResults;
