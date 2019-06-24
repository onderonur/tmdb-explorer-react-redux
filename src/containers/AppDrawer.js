import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import RouterLink from "components/RouteLink";
import { withRouter } from "react-router-dom";
import { toggleDrawer } from "actions";
import MovieIcon from "@material-ui/icons/LocalMovies";
import PersonIcon from "@material-ui/icons/RecentActors";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240
  }
}));

function AppDrawer({ location }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.drawer.isOpen);
  const prevLocation = useRef();

  useEffect(() => {
    if (isOpen && location !== prevLocation.current) {
      dispatch(toggleDrawer());
    }
  }, [location, isOpen, dispatch]);

  useEffect(() => {
    prevLocation.current = location;
  });

  function handleClose() {
    dispatch(toggleDrawer());
  }

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      classes={{ paper: classes.drawerPaper }}
      onClose={handleClose}
    >
      <List>
        <ListItem to="/movies/popular" button component={RouterLink}>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Popular Movies" />
        </ListItem>
        <ListItem to="/person/popular" button component={RouterLink}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Popular People" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default withRouter(AppDrawer);
