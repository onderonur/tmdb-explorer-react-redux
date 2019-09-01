import React from "react";
import { useSelector } from "react-redux";
import { selectCastCredits } from "reducers";
import PersonListItem from "./PersonListItem";

function MovieCastGridListItem({ castCreditId, button }) {
  const cast = useSelector(state => selectCastCredits(state, castCreditId));

  return (
    <PersonListItem
      button
      personId={cast.person}
      secondaryText={cast.character}
    />
  );
}

export default MovieCastGridListItem;
