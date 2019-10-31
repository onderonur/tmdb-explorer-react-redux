import React, { useState, useEffect } from "react";
import { IconButton, Box, makeStyles } from "@material-ui/core";
import BaseDialog from "components/BaseDialog";
import useHistoryPush from "hooks/useHistoryPush";
import useQueryString from "hooks/useQueryString";
import { useLocation } from "react-router-dom";
import YouTubePlayer from "./YouTubePlayer";
import MediaGalleryModalStepper from "./MediaGalleryModalStepper";
import MediaGalleryModalImageViewer from "./MediaGalleryModalImageViewer";
import FullScreen from "react-full-screen";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import { HotKeys } from "react-hotkeys";

const keyMap = {
  NEXT: ["right", "d"],
  PREVIOUS: ["left", "a"]
};

const useStyles = makeStyles(theme => ({
  fullScreenButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1)
  }
}));

function MediaGalleryModal({
  title,
  dataSource = [],
  queryParamName,
  isVideoPlayer = false
}) {
  const classes = useStyles();
  const location = useLocation();
  const historyPush = useHistoryPush();

  const activeStep = useQueryString()[queryParamName];
  const activeStepIndex = dataSource.indexOf(activeStep);

  const [isVisible, setIsVisible] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setIsVisible(!!activeStep);
  }, [activeStep]);

  function handleClose() {
    setIsVisible(false);
  }

  function handleExited() {
    historyPush(location.pathname, { keepScrollState: true });
  }

  const nextPath =
    activeStepIndex + 1 !== dataSource.length
      ? `${location.pathname}?${queryParamName}=${
          dataSource[activeStepIndex + 1]
        }`
      : null;

  const previousPath =
    activeStepIndex - 1 !== -1
      ? `${location.pathname}?${queryParamName}=${
          dataSource[activeStepIndex - 1]
        }`
      : null;

  function goToNextPath() {
    if (nextPath) {
      historyPush(nextPath, { keepScrollState: true });
    }
  }

  function goToPreviousPath() {
    if (previousPath) {
      historyPush(previousPath, { keepScrollState: true });
    }
  }

  const keyHandlers = {
    NEXT: goToNextPath,
    PREVIOUS: goToPreviousPath
  };

  return (
    <BaseDialog
      title={title}
      open={!!isVisible}
      onClose={handleClose}
      onExited={handleExited}
      zeroPaddingContent
    >
      <FullScreen
        enabled={!isVideoPlayer && isFullScreen}
        onChange={enabled => setIsFullScreen(enabled)}
      >
        <HotKeys keyMap={keyMap} handlers={keyHandlers} allowChanges={true}>
          <Box position="relative">
            {isVideoPlayer ? (
              <YouTubePlayer youTubeId={dataSource[activeStepIndex]} />
            ) : (
              <MediaGalleryModalImageViewer
                filePath={dataSource[activeStepIndex]}
              />
            )}
            <MediaGalleryModalStepper
              onClickPrevious={previousPath ? goToPreviousPath : null}
              onClickNext={nextPath ? goToNextPath : null}
            />
            {!isVideoPlayer && (
              <IconButton
                className={classes.fullScreenButton}
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            )}
          </Box>
        </HotKeys>
      </FullScreen>
    </BaseDialog>
  );
}

export default MediaGalleryModal;
