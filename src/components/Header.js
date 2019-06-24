import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  makeStyles
} from "@material-ui/core";
import RouterLink from "./RouteLink";

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
      </Toolbar>
    </AppBar>
  );
}

export default Header;
