import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { selectCastCredits } from "reducers";

function PersonCastingListItem({ castCreditId }) {
  const cast = useSelector(state => selectCastCredits(state, castCreditId));

  return <MovieCard movieId={cast.movie} subheader={cast.character} />;
}

export default PersonCastingListItem;
