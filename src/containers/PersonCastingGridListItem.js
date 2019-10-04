import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { selectCastCredits } from "reducers";

function PersonCastingGridListItem({ castCreditId }) {
  const cast = useSelector(state => selectCastCredits(state, castCreditId));

  return (
    <li>
      <MovieCard movieId={cast.movie} subheader={cast.character} />
    </li>
  );
}

export default PersonCastingGridListItem;
