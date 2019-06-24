import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "actions";
import PersonCard from "./PersonCard";
import InfiniteGridFeed from "components/InfiniteGridFeed";
import {
  selectPopularPeopleIsFetching,
  selectPopularPeopleNextPage,
  selectPopularPeopleIds
} from "reducers/pagination";

function PopularPeople() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectPopularPeopleIsFetching(state));
  const nextPage = useSelector(state => selectPopularPeopleNextPage(state));
  const personIds = useSelector(state => selectPopularPeopleIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularPeople(nextPage));
  }

  return (
    <InfiniteGridFeed
      items={personIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      renderItem={personId => <PersonCard key={personId} personId={personId} />}
    />
  );
}

export default PopularPeople;
