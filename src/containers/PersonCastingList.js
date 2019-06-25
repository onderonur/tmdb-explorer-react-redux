import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCreditsOfPerson } from "reducers";
import { fetchPersonMovieCredits } from "actions";
import PersonCastingListItem from "./PersonCastingListItem";
import ColGridList from "components/ColGridList";

function PersonCastingList({ personId }) {
  const dispatch = useDispatch();
  const creditsOfPerson = useSelector(state =>
    selectCreditsOfPerson(state, personId)
  );
  const castingIds = creditsOfPerson ? creditsOfPerson.castings : [];

  useEffect(() => {
    dispatch(fetchPersonMovieCredits(personId));
  }, [personId, dispatch]);

  return (
    <ColGridList
      items={castingIds}
      spacing={2}
      renderItem={castingId => (
        <PersonCastingListItem key={castingId} castCreditId={castingId} />
      )}
    />
  );
}

export default PersonCastingList;
