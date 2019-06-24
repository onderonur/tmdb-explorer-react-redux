import React from "react";
import { useSelector } from "react-redux";
import { selectCastCreditById } from "reducers/entities";
import MovieCard from "./MovieCard";

function PersonCastingListItem({ castCreditId }) {
  const cast = useSelector(state => selectCastCreditById(state, castCreditId));

  return <MovieCard movieId={cast.movie} subheader={cast.character} />;
}

export default PersonCastingListItem;
