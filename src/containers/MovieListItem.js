import React from "react";
import { useSelector } from "react-redux";
import { selectMovie } from "reducers";
import ListItemWithAvatar from "components/ListItemWithAvatar";

function MovieListItem({ movieId }) {
  const movie = useSelector(state => selectMovie(state, movieId));

  return (
    <ListItemWithAvatar
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
    />
  );
}

export default MovieListItem;
