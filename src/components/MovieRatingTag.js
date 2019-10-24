import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "reducers";
import { Typography, Box, useTheme } from "@material-ui/core";

function MovieRatingTag({ movieId }) {
  const movie = useSelector(state => selectors.selectMovie(state, movieId));
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.secondary.main} paddingY={0.25} paddingX={0.5}>
      <Typography variant="caption">{movie.vote_average} / 10</Typography>
    </Box>
  );
}

export default MovieRatingTag;
