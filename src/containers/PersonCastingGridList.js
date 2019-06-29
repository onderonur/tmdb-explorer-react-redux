import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPersonCredits } from "reducers";
import { fetchPersonCredits } from "actions";
import PersonCastingGridListItem from "./PersonCastingGridListItem";
import FlexGridList from "components/FlexGridList";

function PersonCastingGridList({ personId }) {
  const dispatch = useDispatch();
  const personCredits = useSelector(state =>
    selectPersonCredits(state, personId)
  );
  const castingIds = personCredits ? personCredits.castings : [];

  useEffect(() => {
    dispatch(fetchPersonCredits(personId));
  }, [personId, dispatch]);

  return (
    <FlexGridList
      items={castingIds}
      spacing={2}
      renderItem={castingId => (
        <PersonCastingGridListItem key={castingId} castCreditId={castingId} />
      )}
    />
  );
}

export default PersonCastingGridList;
