import React from "react";
import { useSelector } from "react-redux";
import { selectMovieVideos, selectVideo } from "reducers";
import { useLocation } from "react-router-dom";
import YouTubePlayer from "components/YouTubePlayer";
import useQueryString from "hooks/useQueryString";
import PaginatedModal from "components/PaginatedModal";

function MovieVideoPlayerModal({ movieId }) {
  const location = useLocation();
  const { watch } = useQueryString();
  const videoToWatch = useSelector(state => selectVideo(state, watch));

  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];

  const videoCount = movieVideoIds.length;
  const orderOfVideoToWatch = movieVideoIds.indexOf(watch);
  const isFirstVideo = orderOfVideoToWatch === 0;
  const isLastVideo = orderOfVideoToWatch >= videoCount - 1;
  const previousVideoIdToWatch = !isFirstVideo
    ? movieVideoIds[orderOfVideoToWatch - 1]
    : null;
  const nextVideoIdToWatch = !isLastVideo
    ? movieVideoIds[orderOfVideoToWatch + 1]
    : null;

  return (
    <PaginatedModal
      title={videoToWatch ? videoToWatch.name : ""}
      isOpen={!!videoToWatch}
      steps={videoCount}
      activeStep={orderOfVideoToWatch}
      nextPath={
        nextVideoIdToWatch
          ? `${location.pathname}?watch=${nextVideoIdToWatch}`
          : null
      }
      previousPath={
        previousVideoIdToWatch
          ? `${location.pathname}?watch=${previousVideoIdToWatch}`
          : null
      }
      returnPath={location.pathname}
    >
      <YouTubePlayer youTubeId={videoToWatch ? videoToWatch.key : ""} />
    </PaginatedModal>
  );
}

export default MovieVideoPlayerModal;
