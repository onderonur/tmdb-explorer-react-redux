import React from "react";
import { Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectGenre } from "reducers";

function MovieGenreChip({ className, genreId }) {
  const genre = useSelector(state => selectGenre(state, genreId));

  return <Chip className={className} label={genre.name} />;
}

export default MovieGenreChip;
