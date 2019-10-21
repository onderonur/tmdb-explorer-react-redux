import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "actions";
import { selectors } from "reducers";
import PersonCard from "components/PersonCard";
import InfiniteGridList from "components/InfiniteGridList";

function renderItem(personId) {
  return (
    <li>
      <PersonCard personId={personId} />
    </li>
  );
}

function PopularPeople() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPopularPeople(state)
  );
  const nextPage = useSelector(state =>
    selectors.selectPopularPeopleNextPage(state)
  );
  const personIds = useSelector(state =>
    selectors.selectPopularPeopleIds(state)
  );

  function handleLoadMore() {
    dispatch(fetchPopularPeople(nextPage));
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

export default PopularPeople;
