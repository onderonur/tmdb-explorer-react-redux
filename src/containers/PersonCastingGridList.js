import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPersonCredits, selectIsFetchingPersonCredits } from "reducers";
import { fetchPersonCredits } from "actions";
import PersonCastingGridListItem from "./PersonCastingGridListItem";
import GridList from "components/GridList";

function renderItem(castingId) {
  return <PersonCastingGridListItem castCreditId={castingId} />;
}

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
    <GridList
      items={castingIds}
      loading={isFetching}
      spacing={2}
      renderItem={renderItem}
      listEmptyMessage="No casting has been found"
    />
  );
}

export default PersonCastingGridList;
