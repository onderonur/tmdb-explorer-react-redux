import React, { useEffect } from "react";
import { CssBaseline, Container } from "@material-ui/core";
import Routes from "components/Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "actions";
import LoadingIndicator from "components/LoadingIndicator";
import Header from "components/Header";
import { makeStyles } from "@material-ui/styles";
import { selectors } from "reducers";
import AppDrawer from "containers/AppDrawer";
import BackToTopButton from "components/BackToTopButton";
import HideOnScroll from "components/HideOnScroll";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2)
  }
}));

function App() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingGenres(state)
  );
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <Header />
      </HideOnScroll>
      <AppDrawer />
      <div className={classes.toolbar} />
      <Container className={classes.main} component="main">
        <LoadingIndicator loading={isFetching}>
          <Routes />
        </LoadingIndicator>
      </Container>
      <BackToTopButton />
    </>
  );
}

export default App;
