import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieVideos } from 'actions';
import { selectMovieVideos } from 'reducers';
import { List } from '@material-ui/core';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from './MovieVideoPlayerModal';
import LoadingIndicator from 'components/LoadingIndicator';
import { selectIsFetchingMovieVideos } from 'reducers';

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
      <List>
        {movieVideoIds.map(videoId => (
          <MovieVideoListItem key={videoId} videoId={videoId} />
        ))}
      </List>
      <MovieVideoPlayerModal movieId={movieId} />
    </LoadingIndicator>
  );
}

export default MovieVideoList;
