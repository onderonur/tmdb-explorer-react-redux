import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieVideos } from "actions";
import { selectMovieVideos, selectIsFetchingMovieVideos } from "reducers";
import MovieVideoListItem from "./MovieVideoListItem";
import MovieVideoPlayerModal from "./MovieVideoPlayerModal";
import LoadingIndicator from "components/LoadingIndicator";
import BaseList from "components/BaseList";

function MovieVideoList({ movieId }) {
  const dispatch = useDispatch();
  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];
  const isFetching = useSelector(state =>
    selectIsFetchingMovieVideos(state, movieId)
  );

  useEffect(() => {
    dispatch(fetchMovieVideos(movieId));
  }, [dispatch, movieId]);

  return (
    <LoadingIndicator loading={isFetching}>
      <BaseList
        data={movieVideoIds}
        renderItem={videoId => (
          <MovieVideoListItem key={videoId} videoId={videoId} />
        )}
        listEmptyMesage="No video has been found"
      />
      <MovieVideoPlayerModal movieId={movieId} />
    </LoadingIndicator>
  );
}

export default MovieVideoList;
