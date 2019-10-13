import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  tag: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(0.25, 0.5)
  }
}));

function MovieRatingTag({ movieId }) {
  const classes = useStyles();
  const movie = useSelector(state => selectors.selectMovie(state, movieId));

  return (
    <div className={classes.tag}>
      <Typography variant="caption">{movie.vote_average} / 10</Typography>
    </div>
  );
}

export default MovieRatingTag;
