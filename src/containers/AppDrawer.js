import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, makeStyles, List } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { toggleDrawer } from 'actions';
import MovieIcon from '@material-ui/icons/LocalMovies';
import PersonIcon from '@material-ui/icons/RecentActors';
import { selectIsDrawerOpen } from 'reducers';
import AppDrawerItem from 'components/AppDrawerItem';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 240
  }
}));

function AppDrawer({ location }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => selectIsDrawerOpen(state));
  const prevLocation = useRef();

  useEffect(() => {
    if (location !== prevLocation.current && isOpen) {
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
        <AppDrawerItem
          to="/movie/popular"
          icon={<MovieIcon />}
          title="Popular Movies"
        />
        <AppDrawerItem
          to="/person/popular"
          icon={<PersonIcon />}
          title="Popular People"
        />
      </List>
    </Drawer>
  );
}

export default withRouter(AppDrawer);
