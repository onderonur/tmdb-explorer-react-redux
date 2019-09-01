import React from "react";
import { useSelector } from "react-redux";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import RouterLink from "components/RouterLink";
import { getImageUrl } from "utils";
import { selectMovie } from "reducers";

function MovieListItem({ movieId, button }) {
  const movie = useSelector(state => selectMovie(state, movieId));

  return (
    <ListItem
      button={button}
      alignItems="flex-start"
      to={`/movie/${movie.id}`}
      component={RouterLink}
    >
      <ListItemAvatar>
        <Avatar src={getImageUrl(movie.poster_path)} alt={movie.title} />
      </ListItemAvatar>
      <ListItemText primary={movie.title} />
    </ListItem>
  );
}

export default MovieListItem;
