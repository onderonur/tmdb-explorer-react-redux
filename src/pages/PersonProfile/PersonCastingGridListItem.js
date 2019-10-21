import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import MovieCard from "components/MovieCard";

function PersonCastingGridListItem({ castCreditId }) {
  const cast = useSelector(state =>
    selectors.selectCastCredits(state, castCreditId)
  );

  return (
    <li>
      <MovieCard movieId={cast.movie} subheader={cast.character} />
    </li>
  );
}

export default PersonCastingGridListItem;
