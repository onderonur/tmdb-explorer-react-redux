import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import ListItemWithAvatar from "components/ListItemWithAvatar";
import { getMovieReleaseYear } from "utils";

function MovieListItem({ movieId }) {
  const movie = useSelector(state => selectors.selectMovie(state, movieId));

  const releaseYear = getMovieReleaseYear(movie);

  return (
    <ListItemWithAvatar
      avatarUrl={movie.poster_path}
      primaryText={movie.title}
      secondaryText={releaseYear}
    />
  );
}

export default MovieListItem;
