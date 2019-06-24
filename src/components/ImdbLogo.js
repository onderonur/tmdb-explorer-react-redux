import React from "react";
import imdbLogo from "assets/imdbLogo.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  logo: {
    width: 70,
    display: "block"
  }
}));

function ImdbLogo() {
  const classes = useStyles();

  return <img className={classes.logo} src={imdbLogo} alt="IMDB Logo" />;
}

export default ImdbLogo;
