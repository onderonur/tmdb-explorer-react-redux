import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieVideos } from "actions";
import { selectors } from "reducers";
import BaseList from "components/BaseList";
import LoadingIndicator from "components/LoadingIndicator";
import MovieVideoListItem from "./MovieVideoListItem";
import MovieVideoPlayerModal from "./MovieVideoPlayerModal";

function MovieVideoList({ movieId }) {
  const dispatch = useDispatch();
  const movieVideoIds =
    useSelector(state => selectors.selectMovieVideos(state, movieId)) || [];
  const isFetching = useSelector(state =>
    selectors.selectIsFetchingMovieVideos(state, movieId)
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
