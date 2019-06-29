import React from "react";
import { useSelector } from "react-redux";
import { selectMovieVideos, selectVideo } from "reducers";
import {
  MobileStepper,
  Button,
  Typography,
  DialogTitle
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import YouTubePlayer from "components/YouTubePlayer";
import useQueryString from "hooks/useQueryString";
import BaseDialog from "components/BaseDialog";
import { useTheme } from "@material-ui/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

function MovieVideoPlayerModal({ movieId, location, history }) {
  const theme = useTheme();
  const movieVideoIds =
    useSelector(state => selectMovieVideos(state, movieId)) || [];
  const { watch } = useQueryString({ location });
  const videoToWatch = useSelector(state => selectVideo(state, watch));

  const videoCount = movieVideoIds.length;
  const orderOfVideoToWatch = movieVideoIds.indexOf(watch);
  const isFirstVideo = orderOfVideoToWatch === 0;
  const isLastVideo = orderOfVideoToWatch >= videoCount - 1;
  const previousVideoToWatch = !isFirstVideo
    ? movieVideoIds[orderOfVideoToWatch - 1]
    : null;
  const nextVideoIdToWatch = !isLastVideo
    ? movieVideoIds[orderOfVideoToWatch + 1]
    : null;

  function handleClose() {
    history.push(`${location.pathname}`);
  }

  return (
    <BaseDialog
      title={
        videoToWatch ? (
          <DialogTitle disableTypography>
            <Typography variant="h6" noWrap>
              {videoToWatch.name}
            </Typography>
          </DialogTitle>
        ) : (
          ""
        )
      }
      open={!!videoToWatch}
      onExited={handleClose}
    >
      <YouTubePlayer youtubeId={videoToWatch ? videoToWatch.key : ""} />
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
              history.push(`${location.pathname}?watch=${nextVideoIdToWatch}`)
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
              history.push(`${location.pathname}?watch=${previousVideoToWatch}`)
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

export default withRouter(MovieVideoPlayerModal);
