import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import Recommendations from "containers/Recommendations";
import MovieIntroduction from "containers/MovieIntroduction";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "actions";
import MovieVideoList from "containers/MovieVideoList";
import { selectIsFetchingMovie } from "reducers";
import MovieCastGridList from "./MovieCastGridList";
import Profile from "components/Profile";

function MovieProfile({
  match: {
    params: { movieId }
  }
}) {
  const dispatch = useDispatch();
  const isFetching = useSelector(state =>
    selectIsFetchingMovie(state, movieId)
  );

  useEffect(() => {
    const requiredFields = ["tagline"];
    dispatch(fetchMovie(movieId, requiredFields));
  }, [movieId, dispatch]);

  return (
    <Profile
      loading={isFetching}
      introduction={<MovieIntroduction movieId={movieId} />}
      mainSection={
        <>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <MovieCastGridList movieId={movieId} />
          <Typography variant="h6" gutterBottom>
            Videos
          </Typography>
          <MovieVideoList movieId={movieId} />
        </>
      }
      sideSection={
        <>
          <Typography variant="h6" gutterBottom>
            Recommendations
          </Typography>
          <Recommendations movieId={movieId} />
        </>
      }
    />
  );
}

export default MovieProfile;
