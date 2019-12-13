import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors } from "reducers";
import { fetchPersonCredits } from "actions";
import BaseGridList from "components/BaseGridList";
import PersonCastingGridListItem from "./PersonCastingGridListItem";

function renderItem(castingId) {
  return <PersonCastingGridListItem castCreditId={castingId} />;
}

function PersonCastingGridList({ personId }) {
  const dispatch = useDispatch();
  const personCredits = useSelector(state =>
    selectors.selectPersonCredits(state, personId)
  );
  const castingIds = personCredits?.castings || [];
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingPersonCredits(state, personId)
  );

  useEffect(() => {
    dispatch(fetchPersonCredits(personId));
  }, [personId, dispatch]);

  return (
    <BaseGridList
      items={castingIds}
      loading={isFetching}
      renderItem={renderItem}
      listEmptyMessage="No casting has been found"
    />
  );
}

export default PersonCastingGridList;
