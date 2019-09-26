import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMovieVideos, selectVideo } from "reducers";
import { MobileStepper, Button, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import YouTubePlayer from "components/YouTubePlayer";
import useQueryString from "hooks/useQueryString";
import BaseDialog from "components/BaseDialog";
import { useTheme } from "@material-ui/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import useHistoryPush from "hooks/useHistoryPush";

function MovieVideoPlayerModal({ movieId }) {
  const theme = useTheme();
  const location = useLocation();
  const historyPush = useHistoryPush();
  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];
  const { watch } = useQueryString();
  const videoToWatch = useSelector(state => selectVideo(state, watch));
  const [isVisible, setIsVisible] = useState(!!videoToWatch);

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

  function handleClose() {
    setIsVisible(false);
  }

  function handleExited() {
    historyPush(location.pathname, { keepScrollState: true });
  }

  useEffect(() => {
    setIsVisible(!!videoToWatch);
  }, [videoToWatch]);

  return (
    <BaseDialog
      title={
        videoToWatch ? (
          <Typography variant="h6" noWrap>
            {videoToWatch.name}
          </Typography>
        ) : (
          ""
        )
      }
      open={isVisible}
      onClose={handleClose}
      onExited={handleExited}
      zeroPaddingContent
    >
      <YouTubePlayer youTubeId={videoToWatch ? videoToWatch.key : ""} />
      <MobileStepper
        steps={videoCount}
        position="static"
        variant="text"
        activeStep={orderOfVideoToWatch}
        nextButton={
          <Button
            size="small"
            disabled={isLastVideo}
            onClick={() =>
              historyPush(`${location.pathname}?watch=${nextVideoIdToWatch}`, {
                keepScrollState: true
              })
            }
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            disabled={isFirstVideo}
            onClick={() =>
              historyPush(
                `${location.pathname}?watch=${previousVideoIdToWatch}`,
                {
                  keepScrollState: true
                }
              )
            }
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </BaseDialog>
  );
}

export default MovieVideoPlayerModal;
