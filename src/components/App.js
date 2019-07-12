import React, { useEffect } from "react";
import { CssBaseline, Container } from "@material-ui/core";
import Routes from "components/Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "actions";
import LoadingIndicator from "components/LoadingIndicator";
import Header from "components/Header";
import { makeStyles } from "@material-ui/styles";
import { selectIsFetchingGenres } from "reducers";
import AppDrawer from "containers/AppDrawer";
import BackToTopButton from "components/BackToTopButton";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2)
  }
}));

function App() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectIsFetchingGenres(state));
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Header />
      <AppDrawer />
      <Container className={classes.main} component="main">
        <div className={classes.toolbar} />
        <BackToTopButton />
        <LoadingIndicator loading={isFetching}>
          <Routes />
        </LoadingIndicator>
      </Container>
    </>
  );
}

export default App;