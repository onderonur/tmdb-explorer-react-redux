import React, { useState, useEffect } from "react";
import { IconButton, Box } from "@material-ui/core";
import BaseDialog from "components/BaseDialog";
import useHistoryPush from "hooks/useHistoryPush";
import useQueryString from "hooks/useQueryString";
import { useLocation } from "react-router-dom";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import YouTubePlayer from "./YouTubePlayer";
import MediaGalleryModalStepper from "./MediaGalleryModalStepper";
import MediaGalleryModalImageViewer from "./MediaGalleryModalImageViewer";
import FullScreen from "react-full-screen";

function MediaGalleryModal({
  title,
  dataSource = [],
  queryParamName,
  isVideoPlayer = false
}) {
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

  return (
    <BaseDialog
      title={title}
      titleRight={
        <IconButton onClick={() => setIsFullScreen(true)}>
          <FullscreenIcon />
        </IconButton>
      }
      open={!!isVisible}
      onClose={handleClose}
      onExited={handleExited}
      zeroPaddingContent
    >
      <FullScreen
        enabled={isFullScreen}
        onChange={enabled => setIsFullScreen(enabled)}
      >
        <Box position="relative">
          {isVideoPlayer ? (
            // TODO: Video ve fullscreen modunu düzelt
            <YouTubePlayer youTubeId={dataSource[activeStepIndex]} />
          ) : (
            <MediaGalleryModalImageViewer
              filePath={dataSource[activeStepIndex]}
            />
          )}
          <MediaGalleryModalStepper
            dataSource={dataSource}
            queryParamName={queryParamName}
            activeStepIndex={activeStepIndex}
            isVideoPlayer={isVideoPlayer}
          />
        </Box>
      </FullScreen>
    </BaseDialog>
  );
}

export default MediaGalleryModal;
