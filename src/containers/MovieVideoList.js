import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieVideos } from "actions";
import { selectMovieVideos } from "reducers/entities";
import { List } from "@material-ui/core";
import MovieVideoListItem from "./MovieVideoListItem";
import MovieVideoPlayerModal from "./MovieVideoPlayerModal";
import { selectMovieVideosIsFetching } from "reducers/isFetching";
import LoadingIndicator from "components/LoadingIndicator";

function MovieVideoList({ movieId }) {
  const dispatch = useDispatch();
  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];
  const isFetching = useSelector(state =>
    selectMovieVideosIsFetching(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieVideos(movieId));
  }, [dispatch, movieId]);

  return isFetching ? (
    <LoadingIndicator />
  ) : (
    <>
      <List>
        {movieVideoIds.map(videoId => (
          <MovieVideoListItem key={videoId} videoId={videoId} />
        ))}
      </List>
      <MovieVideoPlayerModal movieId={movieId} />
    </>
  );
}

export default MovieVideoList;
