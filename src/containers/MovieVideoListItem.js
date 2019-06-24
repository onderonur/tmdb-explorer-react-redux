import React from "react";
import { useSelector } from "react-redux";
import { selectVideo } from "reducers/entities";
import { ListItem, ListItemText } from "@material-ui/core";
import RouterLink from "components/RouteLink";
import { withRouter } from "react-router-dom";

function MovieVideoListItem({ videoId, location: { pathname } }) {
  const video = useSelector(state => selectVideo(state, videoId));

  return (
    <ListItem to={`${pathname}?watch=${videoId}`} button component={RouterLink}>
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default withRouter(MovieVideoListItem);
