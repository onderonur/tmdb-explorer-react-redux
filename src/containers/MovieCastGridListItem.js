import React from "react";
import { useSelector } from "react-redux";
import { selectCastCredits } from "reducers";
import PersonListItem from "./PersonListItem";
import RouterLink from "components/RouterLink";

function MovieCastGridListItem({ castCreditId }) {
  const cast = useSelector(state => selectCastCredits(state, castCreditId));

  const personId = cast.person;

  return (
    <PersonListItem
      personId={personId}
      secondaryText={cast.character}
      button
      to={`/person/${personId}`}
      component={RouterLink}
    />
  );
}

export default MovieCastGridListItem;
