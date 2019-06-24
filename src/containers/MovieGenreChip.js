import React from "react";
import { Chip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectGenreById } from "reducers/entities";

function MovieGenreChip({ className, genreId }) {
  const genre = useSelector(state => selectGenreById(state, genreId));

  return <Chip className={className} label={genre.name} />;
}

export default MovieGenreChip;
