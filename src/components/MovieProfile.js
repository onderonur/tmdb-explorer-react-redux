import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import Recommendations from "containers/Recommendations";
import MovieIntroduction from "containers/MovieIntroduction";
import MovieCredits from "containers/MovieCredits";
import { useDispatch } from "react-redux";
import { fetchMovie } from "actions";
import MovieVideoList from "containers/MovieVideoList";

function MovieProfile({
  match: {
    params: { movieId }
  }
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovie(movieId, ["tagline"]));
  }, [movieId, dispatch]);

  return (
    <>
      <MovieIntroduction movieId={movieId} />
      <Box my={1}>
        <Box display="flex" flexWrap="wrap">
          <Box flex={10} flexBasis={500} marginRight={1}>
            <Typography variant="h6" gutterBottom>
              Cast
            </Typography>
            <MovieCredits movieId={movieId} />
            <Typography variant="h6" gutterBottom>
              Videos
            </Typography>
            <MovieVideoList movieId={movieId} />
          </Box>
          <Box flex={1} flexBasis={180}>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            <Recommendations movieId={movieId} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MovieProfile;
