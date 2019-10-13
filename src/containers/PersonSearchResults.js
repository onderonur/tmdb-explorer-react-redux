import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonSearch } from "actions";
import InfiniteGridList from "components/InfiniteGridList";
import PersonCard from "./PersonCard";
import { selectors } from "reducers";

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
    selectors.selectPersonSearchResultIds(state, query)
  );
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPersonSearchResults(state, query)
  );
  const nextPage = useSelector(state =>
    selectors.selectPersonSearchResultsNextPage(state, query)
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
