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
  const classes = useStyles();
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingGenres(state)
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  // TODO: isFetching'den dolayı tüm app flicker yapıyor.
  // O duruma genel bir çözüm bul.
  // Alttaki tüm useEffect'ler 2 kez çalışıyor vs.

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
