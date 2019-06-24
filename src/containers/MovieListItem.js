import React from "react";
import { useSelector } from "react-redux";
import { selectMovieById } from "reducers/entities";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";
import { BASE_IMG_API } from "actions";
import { getMovieReleaseYear } from "utils";

// TODO: List, GridList, ListItem, GridListItem isimlerini filan düzelt.
// TODO: Container ve component'lar bi kontrol et hatalı olan var mı diye.
function MovieListItem({ movieId }) {
  const movie = useSelector(state => selectMovieById(state, movieId));

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={`${BASE_IMG_API}/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${movie.title} (${getMovieReleaseYear(movie)})`}
      />
    </ListItem>
  );
}

export default MovieListItem;
