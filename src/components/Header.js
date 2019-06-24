import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles,
  Box
} from "@material-ui/core";
import RouterLink from "./RouteLink";
import MovieAutoSearch from "containers/MovieAutoSearch";

const useStyles = makeStyles(theme => ({
  titleLink: {
    "&:hover": {
      textDecoration: "none"
    }
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar color="default">
      <Toolbar>
        <Link
          className={classes.titleLink}
          to="/movie/popular"
          color="inherit"
          component={RouterLink}
        >
          <Typography variant="h6">TMDB</Typography>
        </Link>
        <Box display="flex" justifyContent="center" width="100%">
          <Box mx={2} flex={1} maxWidth={680}>
            <MovieAutoSearch />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
