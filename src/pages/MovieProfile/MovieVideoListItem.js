import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { ListItem, ListItemText } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import RouterLink from "components/RouterLink";

function MovieVideoListItem({ videoId }) {
  const { pathname } = useLocation();
  const video = useSelector(state => selectors.selectVideo(state, videoId));

  return (
    <ListItem
      to={`${pathname}?watch=${video.key}`}
      keepScroll
      button
      component={RouterLink}
      dense
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default MovieVideoListItem;
