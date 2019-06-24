import React, { useEffect } from "react";
import { CssBaseline, Container } from "@material-ui/core";
import Routes from "Routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "actions";
import LoadingIndicator from "components/LoadingIndicator";
import Header from "components/Header";
import { makeStyles } from "@material-ui/styles";
import { selectGenresIsFetching } from "reducers/isFetching";
import AppDrawer from "containers/AppDrawer";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  main: {
    padding: theme.spacing(2)
  }
}));

function App() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectGenresIsFetching(state));
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
        <LoadingIndicator loading={isFetching}>
          <Routes />
        </LoadingIndicator>
      </Container>
    </>
  );
}

export default App;
