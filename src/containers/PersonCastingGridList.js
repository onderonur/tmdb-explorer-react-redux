import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPersonCredits, selectIsFetchingPersonCredits } from "reducers";
import { fetchPersonCredits } from "actions";
import PersonCastingGridListItem from "./PersonCastingGridListItem";
import FlexGridList from "components/FlexGridList";

function PersonCastingGridList({ personId }) {
  const dispatch = useDispatch();
  const personCredits = useSelector(state =>
    selectPersonCredits(state, personId)
  );
  const castingIds = personCredits ? personCredits.castings : [];
  const isFetching = useSelector(state =>
    selectIsFetchingPersonCredits(state, personId)
  );

  useEffect(() => {
    dispatch(fetchPersonCredits(personId));
  }, [personId, dispatch]);

  return (
    <FlexGridList
      items={castingIds}
      loading={isFetching}
      spacing={2}
      keyExtractor={castingId => castingId}
      itemWrapWidth={200}
      renderItem={castingId => (
        <PersonCastingGridListItem key={castingId} castCreditId={castingId} />
      )}
    />
  );
}

export default PersonCastingGridList;
