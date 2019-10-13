import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import ListItemWithAvatar from "components/ListItemWithAvatar";

function MovieListItem({ movieId }) {
  const movie = useSelector(state => selectors.selectMovie(state, movieId));

  return (
    <ListItemWithAvatar
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
    />
  );
}

export default MovieListItem;
