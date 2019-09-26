import React from "react";
import { useSelector } from "react-redux";
import { selectVideo } from "reducers";
import { ListItem, ListItemText } from "@material-ui/core";
import RouterLink from "components/RouterLink";
import { useLocation } from "react-router-dom";

function MovieVideoListItem({ videoId }) {
  const { pathname } = useLocation();
  const video = useSelector(state => selectVideo(state, videoId));

  return (
    <ListItem
      to={`${pathname}?watch=${videoId}`}
      keepScroll
      button
      component={RouterLink}
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default MovieVideoListItem;
