import React from "react";
import { useSelector } from "react-redux";
import { selectMovieVideos, selectVideo } from "reducers";
import useQueryString from "hooks/useQueryString";
import MediaGalleryModal from "components/MediaGalleryModal";

function MovieVideoPlayerModal({ movieId }) {
  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];
  const movieVideos = useSelector(state =>
    movieVideoIds.map(movieVideoId => selectVideo(state, movieVideoId))
  );
  const videoKeys = movieVideos.map(video => video.key);

  const { watch } = useQueryString();
  const videoToWatch = movieVideos.find(video => video.key === watch);

  return (
    <MediaGalleryModal
      title={videoToWatch ? videoToWatch.name : ""}
      dataSource={videoKeys}
      queryParamName="watch"
      isVideoPlayer={true}
    />
  );
}

export default MovieVideoPlayerModal;
