import React, { useEffect } from "react";
import { CssBaseline, Container } from "@material-ui/core";
import Routes from "components/Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "actions";
import LoadingIndicator from "components/LoadingIndicator";
import AppHeader from "components/AppHeader";
import { makeStyles } from "@material-ui/styles";
import { selectors } from "reducers";
import AppDrawer from "components/AppDrawer";
import BackToTopButton from "components/BackToTopButton";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2)
  }
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingGenres(state)
  );
  const genres = useSelector(state => selectors.selectGenres(state));
  const genresCount = Object.keys(genres).length;

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <AppHeader />
      <AppDrawer />
      <div className={classes.toolbar} />
      <Container className={classes.main} component="main">
        <LoadingIndicator loading={isFetching || !genresCount}>
          <Routes />
        </LoadingIndicator>
      </Container>
      <BackToTopButton />
    </>
  );
}

export default App;
