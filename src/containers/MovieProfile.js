import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import Recommendations from "containers/Recommendations";
import MovieIntroduction from "containers/MovieIntroduction";
import MovieCredits from "containers/MovieCredits";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "actions";
import MovieVideoList from "containers/MovieVideoList";
import LoadingIndicator from "components/LoadingIndicator";
import {
  selectIsFetchingMovie,
  selectIsFetchingMovieCredits,
  selectIsFetchingMovieVideos
} from "reducers";

function MovieProfile({
  match: {
    params: { movieId }
  }
}) {
  const dispatch = useDispatch();
  const isFetchingMovie = useSelector(state =>
    selectIsFetchingMovie(state, movieId)
  );
  const isFetchingCredits = useSelector(state =>
    selectIsFetchingMovieCredits(state, movieId)
  );
  const isFetchingVideos = useSelector(state =>
    selectIsFetchingMovieVideos(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovie(movieId, ["tagline"]));
  }, [movieId, dispatch]);

  return (
    <>
      <LoadingIndicator loading={isFetchingMovie}>
        <MovieIntroduction movieId={movieId} />
      </LoadingIndicator>
      <Box my={1}>
        <Box display="flex" flexWrap="wrap">
          <Box flex={10} flexBasis={500} marginRight={1}>
            <LoadingIndicator loading={isFetchingCredits}>
              <Typography variant="h6" gutterBottom>
                Cast
              </Typography>
              <MovieCredits movieId={movieId} />
            </LoadingIndicator>
            <LoadingIndicator loading={isFetchingVideos}>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              <MovieVideoList movieId={movieId} />
            </LoadingIndicator>
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
