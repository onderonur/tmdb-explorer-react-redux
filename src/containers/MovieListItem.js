import React from "react";
import { useSelector } from "react-redux";
import { selectMovieById } from "reducers";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { getMovieReleaseYear, getImageUrl } from "utils";

// TODO: List, GridList, ListItem, GridListItem isimlerini filan düzelt.
// TODO: Container ve component'lar bi kontrol et hatalı olan var mı diye.
function MovieListItem({ movieId }) {
  const movie = useSelector(state => selectMovieById(state, movieId));

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={getImageUrl(movie.poster_path)} alt={movie.title} />
      </ListItemAvatar>
      <ListItemText
        primary={`${movie.title} (${getMovieReleaseYear(movie)})`}
      />
    </ListItem>
  );
}

export default MovieListItem;
